import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv()  # Load variables from .env file

api_key = os.getenv("validator_API")
genai.configure(api_key=api_key)
mod = genai.GenerativeModel(model_name='gemini-2.0-flash')

def validator(query,ans):
    response = mod.generate_content('"'+query+'" for this question, is this answer relevant? answer:"'+ans+'" just say yes if it is and if not dont say anything just give me the correct answer')
    # print("gemini validated:"+response.text)
    # print("original:"+ans)
    # if 'yes' in ((response.text).lower()).split(' '):
    check=(response.text).lower()
    for i in range(0,len(check)-2):
        if check[i:i+3]=='yes':
            return ans
    else:
        # print("not intent"+ 'yes' in ((response.text).lower()).split(' ') )
        # print(((response.text).lower()).split(' '))
        return response.text