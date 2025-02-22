import google.generativeai as genai
from dotenv import load_dotenv
import os
from chat import text_formatting
load_dotenv()  # Load variables from .env file

api_key = os.getenv("better_response_API")
genai.configure(api_key=api_key)
mod = genai.GenerativeModel(model_name='gemini-2.0-flash')

def newResponse(query,ans):
    response = mod.generate_content('"'+query+'" for this question, i have this answer,"'+ans+'" \n but i would like a better answer with good explanation')
    ans=text_formatting(response.text)
    return ans