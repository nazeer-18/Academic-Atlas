import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv()  # Load variables from .env file

api_key = os.getenv("processing_API")
genai.configure(api_key=api_key)
mod = genai.GenerativeModel(model_name='gemini-2.0-flash')

def processing(msg):
    response = mod.generate_content('"'+msg+'" remove any typos and spelling mistakes from given quotation and just give me the grammer corrected sentence in quotes again without answering the question in it')

    # print("query processing gemini:"+response.text)
    return response.text