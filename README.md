📧 Email Sender Module – Setup & API Guide
🛠️ Setup Instructions

1. Clone the repository
```
Copy code
git clone https://github.com/Pramodya690/event-management-system.git
cd event-management-system```

3. Create a virtual environment
bash
Copy code
python -m venv venv
Activate the virtual environment:

Windows:

bash
Copy code
venv\Scripts\activate
Linux/macOS:

bash
Copy code
source venv/bin/activate
3. Install dependencies
bash
Copy code
pip install -r requirements.txt
4. Add .env file (optional but recommended)
env
Copy code
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password_or_app_password
⚠️ Make sure .env is in your .gitignore to avoid uploading sensitive data.

5. Run the application
bash
Copy code
python emailGeneration.py
You should see:

csharp
Copy code
 * Running on http://127.0.0.1:5000
📡 API Endpoint
POST http://127.0.0.1:5000/send-emails

📥 Request Body (JSON)
json
Copy code
{
  "emails": "vendor1@example.com, vendor2@example.com, vendor3@example.com"
}
🛠️ Notes:
This version uses hardcoded/rough event details.

Future update: fetch event_description, company_name, etc. from the database.

✅ Example Response
json
Copy code
{
  "message": "Emails sent successfully!"
}
