import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify
import openai

# Load OpenAI key
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")
if not openai.api_key:
    raise ValueError("Please set OPENAI_API_KEY in your environment")

# Choose your model
OPENAI_MODEL = "gpt-3.5-turbo"

# Your agenda generator from before
def generate_event_agenda(description: str) -> str:
    system_prompt = "You are an assistant that creates professional event agendas."
    user_prompt = (
        f"Generate a time-based agenda for the following event:\n"
        f"\"{description}\"\n\n"
        "Include time slots, session titles, and short descriptions for each activity. "
        "Format it as a bullet list."
    )
    resp = openai.chat.completions.create(
        model=OPENAI_MODEL,
        messages=[
            {"role": "system",  "content": system_prompt},
            {"role": "user",    "content": user_prompt},
        ],
        temperature=0.6,
        top_p=0.9,
        max_tokens=300,
    )
    agenda = resp.choices[0].message.content.strip()
    if not agenda.startswith("-"):
        lines = [ln.strip() for ln in agenda.split("\n") if ln.strip()]
        agenda = "\n".join(f"- {ln.lstrip('- ')}" for ln in lines)
    return agenda

# Flask setup
app = Flask(__name__)

@app.route("/", methods=["GET"])
def health_check():
    return jsonify(status="up"), 200

@app.route("/agenda", methods=["POST"])
def agenda_endpoint():
    data = request.get_json(force=True)
    desc = data.get("description", "").strip()
    if not desc:
        return jsonify(error="`description` field is required"), 400
    result = generate_event_agenda(desc)
    return jsonify(agenda=result), 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
