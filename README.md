📧 Email Sender Module – Setup & API Guide
🛠️ Setup Instructions

1. Create a virtual environment
```bash
python -m venv venv
```
Activate the virtual environment:

Windows:

```bash
venv\Scripts\activate
```

Linux/macOS:

```bash
source venv/bin/activate
```

2. Install dependencies

```bash
pip install -r requirements.txt
```

3. Run the application
```bash
python emailGeneration.py
```
You should see:

```bash
 * Running on http://127.0.0.1:5000
```
📡 API Endpoint
POST http://127.0.0.1:5000/send-emails

📥 Request Body (JSON)
```
{
  "emails": "vendor1@example.com, vendor2@example.com, vendor3@example.com"
}
```
🛠️ Notes:
This version uses hardcoded/rough event details.

Future update: fetch event_description, company_name, etc. from the database.

✅ Example Response
```
{
  "message": "Emails sent successfully!"
}
```
