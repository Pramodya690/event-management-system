import os
from dotenv import load_dotenv
import openai
import smtplib
from email.message import EmailMessage
from flask import Flask, request, jsonify

# ——— Flask setup ———
app = Flask(__name__)

# ——— Load environment variables ———
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")
if not openai.api_key:
    raise ValueError("Please set OPENAI_API_KEY in your environment")

EMAIL_USER = os.getenv("EMAIL_USER")
EMAIL_PASS = os.getenv("EMAIL_PASS")
if not EMAIL_USER or not EMAIL_PASS:
    raise ValueError("Please set EMAIL_USER and EMAIL_PASS in your environment")

# ——— Generate Vendor Email via OpenAI ———
def generate_vendor_email(
    event_description: str,
    company_name: str,
    company_phone: str,
    company_email: str,
    company_website: str
) -> str:
    system_prompt = (
        "You are an assistant that writes professional emails to vendors relevant to an event’s requirements."
    )
    user_prompt = (
        f"Write a professional email to a vendor, informing them about the following event and requesting their services:\n\n"
        f"{event_description}\n\n"
        f"Use these company details:\n"
        f"- Name: {company_name}\n"
        f"- Phone: {company_phone}\n"
        f"- Email: {company_email}\n"
        f"- Website: {company_website}\n\n"
        "Your email should:\n"
        "1. Clearly inform the vendor about the event details and purpose\n"
        "2. Mention that this email is sent to vendors whose services are relevant\n"
        "3. Specify inferred requirements (e.g., catering, audio systems, lighting)\n"
        "4. Ask for availability and pricing\n"
        "5. Inquire about any additional services\n"
        "6. Be signed as 'Event Management Team' from EventSphere\n"
    )

    resp = openai.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user",   "content": user_prompt},
        ],
        temperature=0.7,
        max_tokens=500
    )
    email_body = resp.choices[0].message.content.strip()
    return email_body

# ——— Infer Event Tasks via OpenAI ———
def infer_event_tasks(description: str) -> list[str]:
    system_prompt = "You are an assistant that extracts actionable event management tasks."
    user_prompt = (
        f"List 6–8 specific, short, actionable tasks to organize the following event:\n\n"
        f"\"{description}\""
    )

    resp = openai.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user",   "content": user_prompt},
        ],
        temperature=0.6,
        max_tokens=150
    )
    text = resp.choices[0].message.content.strip()
    # Split into lines and clean bullets
    tasks = [line.lstrip(" -•").strip() for line in text.split("\n") if line.strip()]
    return tasks

# ——— Send Email via SMTP ———
def send_email(to_email: str, subject: str, body: str) -> dict:
    msg = EmailMessage()
    msg["Subject"] = subject
    msg["From"] = EMAIL_USER
    msg["To"] = to_email
    msg.set_content(body)

    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp:
            smtp.login(EMAIL_USER, EMAIL_PASS)
            smtp.send_message(msg)
        return {"status": "success", "message": f"Email sent to {to_email}"}
    except Exception as e:
        return {"status": "error", "message": f"Failed to send email: {e}"}

# ——— Example usage ———
if __name__ == "__main__":
    # Generate a sample vendor email
    email_body = generate_vendor_email(
        event_description="A 200-person gala dinner celebrating our annual fundraising achievements.",
        company_name="EventSphere Ltd.",
        company_phone="071-1234567",
        company_email="eventsphere@gmail.com",
        company_website="www.eventsphere.com"
    )
    print("\n--- Vendor Email ---\n", email_body)

    # Infer tasks for a sample event
    tasks = infer_event_tasks(
        "Full-day product launch event with keynote, breakout sessions, and networking reception."
    )
    print("\n--- Event Tasks ---")
    for idx, task in enumerate(tasks, start=1):
        print(f"{idx}. {task}")
