import os
import torch
from transformers import AutoTokenizer, AutoModelForCausalLM
from dotenv import load_dotenv

MODEL_NAME = "TinyLlama/TinyLlama-1.1B-Chat-v1.0"

# Load model and tokenizer
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForCausalLM.from_pretrained(
    MODEL_NAME,
    device_map="auto",
    torch_dtype=torch.float16
)

def generate_event_agenda(description):
    prompt = f"""
    <|system|>
    You are an assistant that creates professional event agendas.
    <|user|>
    Generate a time-based agenda for the following event:
    "{description}"

    Include time slots, session titles, and short descriptions for each activity. Format it as a bullet list.
    <|assistant|>
    """
    inputs = tokenizer(prompt, return_tensors="pt").to(model.device)
    outputs = model.generate(**inputs, max_new_tokens=300, temperature=0.6)
    text = tokenizer.decode(outputs[0], skip_special_tokens=True)
    
    try:
        return text.split("<|assistant|>")[1].strip()
    except:
        return text.strip()


if __name__ == "__main__":
    event_description = input("Describe the event: ")
    print("\nGenerating event agenda...\n")
    agenda = generate_event_agenda(event_description)
    print(agenda)
    print("-" * 60)