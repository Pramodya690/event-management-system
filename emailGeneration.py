import os
import torch
from transformers import AutoTokenizer, AutoModelForCausalLM
from dotenv import load_dotenv
import smtplib
from email.message import EmailMessage

from flask import Flask, request, jsonify

app = Flask(__name__)

# Load environment variables
load_dotenv()
EMAIL_USER = os.getenv("EMAIL_USER")
EMAIL_PASS = os.getenv("EMAIL_PASS")
MODEL_NAME = "TinyLlama/TinyLlama-1.1B-Chat-v1.0"

# Load model and tokenizer
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForCausalLM.from_pretrained(
    MODEL_NAME,
    device_map="auto",
    torch_dtype=torch.float16
)

# -------- Generate Email Function --------
def generate_vendor_email(event_description, company_name, company_phone, company_email, company_website):
    prompt = f"""
    <|system|>
    You are an assistant that writes professional emails to vendors.
    <|user|>
    Write a professional email to a vendor requesting services for:
    {event_description}

    Based on the event description, infer and mention event requirements (e.g., catering, audio systems, lighting).

    The email should:
    - Mention the inferred event requirements
    - Ask for availability and pricing
    - Inquire about additional services
    - Be signed as 'Event Management Team' from {company_name}
    - Include company contact details: {company_phone}, {company_email}, {company_website}
    <|assistant|>
    """

    inputs = tokenizer(prompt, return_tensors="pt").to(model.device)
    outputs = model.generate(
        **inputs,
        max_new_tokens=500,
        temperature=0.6,
        do_sample=True
    )
    email_body = tokenizer.decode(outputs[0], skip_special_tokens=True)

    # Clean and format
    try:
        email_body = email_body.split("<|assistant|>")[1].strip()
    except:
        pass

    email_body = email_body.replace("[Vendor Name]", "Valued Vendor")
    email_body = email_body.replace("[Your Name]", "Event Management Team")
    email_body = email_body.replace("[Your Company Name]", company_name)
    email_body = email_body.replace("[Your Company Phone Number]", company_phone)
    email_body = email_body.replace("[Your Company Email Address]", company_email)
    email_body = email_body.replace("[Your Company Website]", company_website)
    email_body = email_body.replace("[date] to [date]", "July 15th, 2025")

    return email_body

# -------- Generate Task List Function --------
def infer_event_tasks(description):
    prompt = f"""
    <|system|>
    You are an assistant that extracts event management tasks from descriptions.
    <|user|>
    List 6–8 specific tasks to organize the following event:
    "{description}"

    Tasks should be short, actionable, and assigned to an event team.
    <|assistant|>
    """
    inputs = tokenizer(prompt, return_tensors="pt").to(model.device)
    outputs = model.generate(**inputs, max_new_tokens=150, temperature=0.6)
    text = tokenizer.decode(outputs[0], skip_special_tokens=True)

    try:
        return [line.strip(" -•") for line in text.split("<|assistant|>")[1].strip().split("\n") if line.strip()]
    except:
        return [line.strip(" -•") for line in text.strip().split("\n") if line.strip()]

# -------- Email Sending Function --------
def send_email(to_email, subject, body):
    msg = EmailMessage()
    msg['Subject'] = subject
    msg['From'] = EMAIL_USER
    msg['To'] = to_email
    msg.set_content(body)

    try:
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
            smtp.login(EMAIL_USER, EMAIL_PASS)
            smtp.send_message(msg)
        print(f" Email sent to {to_email}")
    except Exception as e:
        print(f" Failed to send email: {e}")

@app.route('/send-emails', methods=['POST'])
def handle_send_emails():
    data = request.get_json()
    email_string = data.get('emails', '')
    vendor_emails = [e.strip() for e in email_string.split(",") if e.strip()]

    # need to fetch from db
    event_description = "The book exhibition is a vibrant event that brings together book lovers, authors, publishers, and educational institutions under one roof. It showcases a wide range of books across various genres, including fiction, non-fiction, academic texts, children’s literature, and rare collectibles. The event aims to promote reading habits, support local and international authors, and provide a platform for literary discussions, book signings, and cultural exchange. It serves as an ideal opportunity for readers to discover new titles, benefit from discounts, and engage in interactive sessions with authors and publishers."
    company_name = "EventShere"
    company_phone = "+94 712345678"
    company_email = "info@eventshere.com"
    company_website = "www.EventShere.com"

    # Generate email body
    email_body = generate_vendor_email(
        event_description,
        company_name,
        company_phone,
        company_email,
        company_website
    )

    # Send to each vendor
    for vendor_email in vendor_emails:
        send_email(
            to_email=vendor_email,
            subject="Service Request for Upcoming Event",
            body=email_body
        )

    return jsonify({"message": "Emails sent successfully!"}), 200

if __name__ == "__main__":
    app.run(debug=True)