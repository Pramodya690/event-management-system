import os
os.environ['SDL_VIDEODRIVER'] = 'dummy'
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import matplotlib.patches as patches
from io import BytesIO
import time
from dotenv import load_dotenv
import psycopg2

from seat_arrangement.boquet    import compute_max_capacity as boquet_max, generate_image_buffer as boquet_img
from seat_arrangement.theatre   import compute_max_capacity as theater_max, render_to_png as theater_img
from seat_arrangement.ushape    import compute_max_capacity_ushape as ushape_max, render_png as ushape_img
from stall_allocation.floor import SmartFloorPlanEnv, DragDropApp
from emailGeneration import generate_vendor_email, send_email
from social_media import generate_caption, post_to_instagram, post_to_fb, share_to_whatsapp, IMG_PATH, INSTA_PASS, INSTA_USER
from agenda_generation import generate_event_agenda

# DATABASE_URL = os.getenv("DATABASE_URL")
# if not DATABASE_URL:
#     raise RuntimeError("DATABASE_URL environment variable is required")
FPS = 60

app = Flask(__name__)
CORS(app)

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")

def get_db_connection():
    """Establish a connection to the PostgreSQL database."""
    try:
        conn = psycopg2.connect(DATABASE_URL)
        return conn
    except Exception as e:
        print(f"Error connecting to database: {str(e)}")
        raise
# --- API endpoints for seat arrangement---

# --- API endpoints for boquet---
@app.route('/boquet-api/max_capacity', methods=['GET'])
def api_max_capacity():
    # Returns maximum seating capacity
    return jsonify({ 'max_capacity': boquet_max() })

@app.route('/boquet-api/layout', methods=['GET','POST'])
def api_layout():
    # Accept seats via query param or JSON body
    seats = None
    if request.method == 'GET':
        seats = request.args.get('seats', type=int)
    else:
        data = request.get_json(silent=True) or {}
        seats = data.get('seats')

    if seats is None:
        return jsonify({ 'error': "Missing 'seats' parameter" }), 400

    max_cap = boquet_max()
    seats = min(int(seats), max_cap)

    buf = boquet_img(seats)
    return send_file(buf, mimetype='image/png', download_name='layout.png')

# --- API Endpoints for theater shape---
@app.route('/theater-api/max_capacity', methods=['GET'])
def theater_max_capacity():
    return jsonify({ 'max_capacity': theater_max() })

@app.route('/theater-api/layout', methods=['GET'])
def theater_layout():
    seats = request.args.get('seats', type=int)
    if seats is None:
        return jsonify({ 'error': 'Missing seats parameter' }), 400
    max_cap = theater_max()
    seats = min(seats, max_cap)
    buf = theater_img(seats)
    return send_file(buf, mimetype='image/png', download_name='theater_layout.png')

# --- API Endpoints for U shape---
@app.route('/ushape-api/max_capacity', methods=['GET'])
def ushape_max_capacity():
    """Returns the maximum seating capacity for U-shape."""
    return jsonify({ 'max_capacity': ushape_max() })

@app.route('/ushape-api/layout', methods=['GET'])
def ushape_layout():
    """Returns a PNG image of the U-shape layout for a given number of seats."""
    seats = request.args.get('seats', type=int)
    if seats is None:
        return jsonify({ 'error': "Missing 'seats' parameter" }), 400
    max_cap = ushape_max()
    seats = min(seats, max_cap)
    buf = ushape_img(seats)
    return send_file(buf, mimetype='image/png', download_name='u_shape_layout.png')

@app.route('/save-seat-layout', methods=['POST'])
def save_layout():
    """Save a seating layout image to the database."""
    try:
        if 'image' not in request.files:
            return jsonify({"error": "No image file provided"}), 400
        
        data = request.form
        layout_preference = data.get('layout_preference')
        number_of_seats = data.get('number_of_seats')
        
        if not layout_preference or not number_of_seats:
            return jsonify({"error": "Missing layout_preference or number_of_seats"}), 400
        
        try:
            number_of_seats = int(number_of_seats)
        except ValueError:
            return jsonify({"error": "number_of_seats must be an integer"}), 400

        image_file = request.files['image']
        image_data = image_file.read()  # Read image as binary

        conn = get_db_connection()
        try:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    INSERT INTO event (seat_arrangement)
                    VALUES (%s) 
                    """,
                    (layout_preference, number_of_seats, image_data)
                )
                layout_id = cur.fetchone()[0]
                conn.commit()
            return jsonify({
                "message": "Layout saved successfully",
                "layout_id": layout_id
            }), 200
        finally:
            conn.close()
    except Exception as e:
        return jsonify({"error": f"Failed to save layout: {str(e)}"}), 500
    

# end points for stall allocation
def get_hall_dimensions():
    # """Fetch hall rows & cols from the PostgreSQL database, assumed table 'halls'."""
    # conn = psycopg2.connect(DATABASE_URL)
    # try:
    #     with conn.cursor() as cur:
    #         cur.execute("SELECT rows, cols FROM halls WHERE id = %s", (1,))
    #         result = cur.fetchone()
    #         if result:
    #             rows, cols = int(result[0]) // 30, int(result[1]) // 30
    #             # Ensure dimensions are at least 1
    #             return max(1, rows), max(1, cols)
    # finally:
    #     conn.close()
    # fallback defaults
    return 20, 20

@app.route('/floorplan-api/max_capacity', methods=['GET'])
def max_capacity():
    """
    Returns the maximum number of stalls that can fit.
    Optional query params: clearance, min_small_size
    """
    clearance = int(request.args.get('clearance', 1))
    min_small_size = int(request.args.get('min_small_size', 2))

    rows, cols = get_hall_dimensions()
    hall = np.zeros((rows, cols), dtype=np.uint8)
    hall[[0, -1], :] = 1
    hall[:, [0, -1]] = 1
    entry = (0, rows // 2)
    exit  = (cols - 1, rows // 2)

    env = SmartFloorPlanEnv(
        hall_layout=hall,
        total_stalls=None,
        entry=entry,
        exit=exit,
        clearance=clearance,
        min_small_size=min_small_size,
        render_mode="human"
    )
    return jsonify({'max_capacity': int(env.total_stalls)})

@app.route('/floorplan-api/layout', methods=['GET', 'POST'])
def layout_png():
    clearance      = int(request.args.get('clearance', 1))
    min_small_size = int(request.args.get('min_small_size', 2))

    # parse stalls count
    total_stalls = None
    if request.method == 'POST':
        data = request.get_json(silent=True) or {}
        total_stalls = data.get('stalls')
    else:
        s = request.args.get('stalls')
        total_stalls = int(s) if s is not None else None

    if not isinstance(total_stalls, int) or total_stalls < 1:
        return jsonify({'error': 'Missing or invalid "stalls" parameter'}), 400

    rows, cols = get_hall_dimensions()
    hall = np.zeros((rows, cols), dtype=np.uint8)
    hall[[0, -1], :] = 1
    hall[:, [0, -1]] = 1
    entry = (0, rows // 2)
    exit  = (cols - 1, rows // 2)

    env = SmartFloorPlanEnv(
        hall_layout=hall,
        total_stalls=total_stalls,
        entry=entry,
        exit=exit,
        clearance=clearance,
        min_small_size=min_small_size,
        render_mode="human"
    )
    env.reset()
    env.auto_place()
    fig = env.render()

    # Save initial generated image
    os.makedirs('images', exist_ok=True)
    initial_path = os.path.join('images', 'floorplan_initial.png')
    fig.savefig(initial_path, format='png', bbox_inches='tight')

    # Launch interactive Tk window for manual adjustments
    ui = DragDropApp(cols, rows, env.stall_rects, scale=30)

    # Ensure save on window close
    def on_close():
        ui.save_canvas_as_image()  # writes 'auto_floorplan_updated.png'
        ui.destroy()
    ui.protocol("WM_DELETE_WINDOW", on_close)

    ui.mainloop()

    # Determine which to send
    updated_path = 'auto_floorplan_updated.png'
    send_path = updated_path if os.path.exists(updated_path) else initial_path

    plt.close(fig)
    return send_file(send_path, mimetype='image/png', download_name='floorplan.png')


# -------- Endpoint to Display Generated Email --------
@app.route('/generate-email', methods=['POST'])
def handle_generate_email():
    data = request.get_json()
    event_description = data.get('event_description', '')
    company_name = data.get('company_name', 'EventShere')
    company_phone = data.get('company_phone', '+94 712345678')
    company_email = data.get('company_email', 'info@eventshere.com')
    company_website = data.get('company_website', 'www.EventShere.com')

    email_body = generate_vendor_email(
        event_description,
        company_name,
        company_phone,
        company_email,
        company_website
    )

    return jsonify({
        "message": "Email generated successfully",
        "email_body": email_body
    }), 200
# -------- Endpoint to Send Emails --------
@app.route('/send-emails', methods=['POST'])
def handle_send_emails():
    data = request.get_json(force=True) or {}

    # Normalize emails field to a list of strings
    emails_field = data.get('emails', [])
    if isinstance(emails_field, str):
        vendor_emails = [e.strip() for e in emails_field.split(',') if e.strip()]
    elif isinstance(emails_field, list):
        vendor_emails = [e.strip() for e in emails_field if isinstance(e, str) and e.strip()]
    else:
        return jsonify({'error': 'Invalid emails parameter; must be string or list'}), 400

    # Other optional inputs
    subject      = data.get('subject', "Service Request for Upcoming Event")
    campaignName = data.get('campaignName', None)
    event_description = data.get('event_description', '')
    company_name      = data.get('company_name', 'EventShere')
    company_phone     = data.get('company_phone', '+94 712345678')
    company_email     = data.get('company_email', 'info@eventshere.com')
    company_website   = data.get('company_website', 'www.eventshere.com')

    # Generate your email body
    email_body = generate_vendor_email(
        event_description,
        company_name,
        company_phone,
        company_email,
        company_website
    )

    # Send to each vendor and collect results
    results = []
    for vendor_email in vendor_emails:
        try:
            send_email(
                to_email=vendor_email,
                subject=subject,
                body=email_body,
                campaign_name=campaignName
            )
            results.append({'email': vendor_email, 'status': 'sent'})
        except Exception as e:
            results.append({'email': vendor_email, 'status': 'error', 'error': str(e)})

    return jsonify({
        "message": f"Email sending process completed ({len(vendor_emails)} recipients)",
        "results": results
    }), 200

# API Endpoints
@app.route('/generate-caption', methods=['POST'])
def generate_caption_endpoint():
    """Generate a social media caption based on event details."""
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No JSON data provided"}), 400

        required_fields = ["title", "description", "organizer", "phone", "event_time", "date", "location"]
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing required field: {field}"}), 400

        start_time = time.time()
        caption = generate_caption(
            data["title"],
            data["description"],
            data["organizer"],
            data["phone"],
            data["event_time"],
            data["date"],
            data["location"]
        )
        generation_time = time.time() - start_time

        return jsonify({
            "caption": caption,
            "generation_time": f"{generation_time:.2f} seconds"
        }), 200
    except Exception as e:
        return jsonify({"error": f"Failed to generate caption: {str(e)}"}), 500

@app.route('/post-social-media', methods=['POST'])
def post_social_media_endpoint():
    """Post the approved caption to Instagram, Facebook, and WhatsApp."""
    try:
        data = request.get_json()
        if not data or "caption" not in data:
            return jsonify({"error": "Caption is required"}), 400

        caption = data["caption"]
        image_url = data.get("image_url", IMG_PATH)  # Default to IMG_PATH if not provided
        platforms = data.get("platforms", ["instagram", "facebook", "whatsapp"])  # Default to all

        results = {}
        if "instagram" in platforms:
            if post_to_instagram(INSTA_USER, INSTA_PASS, caption, image_url):
                results["instagram"] = "Posted successfully"
            else:
                results["instagram"] = "Failed to post"
        
        # if "facebook" in platforms:
        #     if post_to_fb(PAGE_ID, caption, image_url, FB_TOKEN):
        #         results["facebook"] = "Posted successfully"
        #     else:
        #         results["facebook"] = "Failed to post"
        
        if "whatsapp" in platforms:
            whatsapp_url = share_to_whatsapp(caption)
            results["whatsapp"] = whatsapp_url if whatsapp_url else "Failed to generate URL"

        return jsonify({
            "message": "Posting completed",
            "results": results
        }), 200
    except Exception as e:
        return jsonify({"error": f"Failed to post: {str(e)}"}), 500

# API Endpoints
# @app.route('/generate-agenda', methods=['POST'])
# def generate_agenda_endpoint():
#     """Generate an event agenda based on the provided description."""
#     try:
#         data = request.get_json()
#         if not data or "description" not in data:
#             return jsonify({"error": "Event description is required"}), 400
        
#         description = data["description"].strip()
#         if not description:
#             return jsonify({"error": "Description cannot be empty"}), 400

#         global latest_agenda
#         latest_agenda = generate_event_agenda(description)
        
#         return jsonify({
#             "agenda": latest_agenda,
#             "message": "Agenda generated successfully. Retrieve it via /get-agenda or approve for further actions."
#         }), 200
#     except Exception as e:
#         return jsonify({"error": f"Failed to generate agenda: {str(e)}"}), 500

@app.route('/generate-agenda', methods=['POST'])
def generate_agenda_endpoint():
    """Generate an event agenda based on the provided description."""
    try:
        data = request.get_json()
        if not data or "description" not in data:
            return jsonify({"error": "Event description is required"}), 400

        description = data["description"].strip()
        if not description:
            return jsonify({"error": "Description cannot be empty"}), 400

        global latest_agenda
        latest_agenda = generate_event_agenda(description)

        return jsonify({
            "agenda": latest_agenda,
            "message": "Agenda generated successfully. Retrieve it via /get-agenda or approve for further actions."
        }), 200

    except Exception as e:
        return jsonify({"error": f"Failed to generate agenda: {str(e)}"}), 500

@app.route('/get-agenda', methods=['GET'])
def get_agenda_endpoint():
    """Retrieve the most recently generated agenda."""
    if latest_agenda is None:
        return jsonify({"error": "No agenda has been generated yet"}), 404
    return jsonify({
        "agenda": latest_agenda,
        "message": "Latest agenda retrieved successfully"
    }), 200


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5001)

