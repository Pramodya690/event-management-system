import os
import requests
import urllib.parse
import time
from flask import Flask, request, jsonify
from dotenv import load_dotenv
from instagrapi import Client
from instagrapi.exceptions import LoginRequired, ClientError
from flask_cors import CORS
import openai

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Load environment variables
load_dotenv()
INSTA_USER = os.getenv("INSTA_USER")
INSTA_PASS = os.getenv("INSTA_PASS")
FB_TOKEN   = os.getenv("FB_TOKEN")
PAGE_ID    = os.getenv("PAGE_ID")
IMG_PATH   = "image.jpg"

# OpenAI setup
openai.api_key = os.getenv("OPENAI_API_KEY")
OPENAI_MODEL = "gpt-3.5-turbo" 

def generate_caption(title, description, organizer, phone, event_time, date, location):
    system_prompt = (
        "You are a creative social-media copywriter. "
        "Fill in the template between the markers—no extra text, no brackets."
    )
    user_prompt = f"""
Use this description: {description}

===CAPTION START===
📚 {title} 📚

{description}

🎟️ By {organizer}  
📅 {date}
🕒 {event_time}  
📍 {location}
📞 {phone}  

Don’t miss out—[call-to-action question]
===CAPTION END===
"""
    try:
        resp = openai.ChatCompletion.create(
            model=OPENAI_MODEL,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user",   "content": user_prompt},
            ],
            temperature=0.7,
            top_p=0.9,
            max_tokens=150,
        )
        raw = resp.choices[0].message.content
        # extract between markers
        if "===CAPTION START===" in raw and "===CAPTION END===" in raw:
            start = raw.index("===CAPTION START===") + len("===CAPTION START===")
            end   = raw.index("===CAPTION END===")
            caption = raw[start:end].strip()
        else:
            caption = raw.strip()
        # enforce max length
        return caption if len(caption) <= 2000 else caption[:1997] + "..."
    except Exception as e:
        print(f"[OpenAI Error] {e}")
        # fallback
        return (
            f"📚 {title} 📚\n\n{description}\n\n"
            f"🎟️ By {organizer} | 📅 {date} | 🕒 {event_time} | 📍 {location} | 📞 {phone}\n\n"
            "Don’t miss out—ready to dive into the world of books?"
        )

def download_image(url, local_path="temp_image.jpg"):
    resp = requests.get(url)
    resp.raise_for_status()
    with open(local_path, "wb") as f:
        f.write(resp.content)
    return local_path

def post_to_instagram(username, password, caption, image_url):
    try:
        cl = Client()
        cl.login(username, password)
        local = download_image(image_url)
        cl.photo_upload(local, caption)
        os.remove(local)
        return True
    except (LoginRequired, ClientError) as e:
        print(f"Instagram error: {e}")
        return False

def post_to_fb(page_id, caption, image_url, fb_token):
    url = f"https://graph.facebook.com/v20.0/{page_id}/photos"
    payload = {"url": image_url, "caption": caption, "access_token": fb_token}
    resp = requests.post(url, data=payload)
    if resp.ok:
        return True
    print(f"Facebook error: {resp.status_code} {resp.text}")
    return False

def share_to_whatsapp(caption):
    return f"https://wa.me/?text={urllib.parse.quote(caption)}"

@app.route("/create_post", methods=["POST"])
def create_post():
    data = request.json
    caption = generate_caption(
        data["title"], data["description"], data["organizer"],
        data["phone"], data["event_time"], data["date"], data["location"]
    )
    img_url = data.get("image_url")
    results = {
        "instagram": post_to_instagram(INSTA_USER, INSTA_PASS, caption, img_url),
        "facebook":  post_to_fb(PAGE_ID, caption, img_url, FB_TOKEN),
        "whatsapp":  share_to_whatsapp(caption)
    }
    return jsonify(caption=caption, results=results)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)
