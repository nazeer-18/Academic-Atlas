import random
import json

import torch

from model import NeuralNet
from nltk_utils import bag_of_words, tokenize
from transformers import BartForConditionalGeneration, AutoTokenizer
import google.generativeai as genai
from query_processing import processing
from intent_validator import validator
from dotenv import load_dotenv
import os

load_dotenv()  # Load variables from .env file

api_key = os.getenv("chat_API")


device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

with open('intents.json', 'r') as json_data:
    intents = json.load(json_data)

FILE = "data.pth"
data = torch.load(FILE)

input_size = data["input_size"]
hidden_size = data["hidden_size"]
output_size = data["output_size"]
all_words = data['all_words']
tags = data['tags']
model_state = data["model_state"]

detox_base_model_name = 'facebook/bart-base'
detox_model_name = 's-nlp/bart-base-detox'
detox_tokenizer = AutoTokenizer.from_pretrained(detox_base_model_name)
detox_model = BartForConditionalGeneration.from_pretrained(detox_model_name)

model = NeuralNet(input_size, hidden_size, output_size).to(device)
model.load_state_dict(model_state)
model.eval()

genai.configure(api_key=api_key)

def get_response(msg):
    query=processing(msg)
    sentence = tokenize(query)
    res="Bot isn't running!"
    X = bag_of_words(sentence, all_words)
    X = X.reshape(1, X.shape[0])
    X = torch.from_numpy(X).to(device)

    output = model(X)
    _, predicted = torch.max(output, dim=1)

    tag = tags[predicted.item()]
    ai=False

    probs = torch.softmax(output, dim=1)
    prob = probs[0][predicted.item()]
    if prob.item() > 0.75:
        for intent in intents['intents']:
            if tag == intent["tag"]:
                res = random.choice(intent['responses'])
        check=validator(query,res)
        if(check !=res):
            ai=True
            res=check
    else:       
        ai=True
        mod = genai.GenerativeModel(model_name='gemini-2.0-flash')
        response = mod.generate_content(msg+"")

        # print("gemini:"+response.text)
        res=response.text
    # ls=[]
    if False:
        # TODO: resolve chunk split & output 
        print("bef:"+res)
        detox_string=""
        for i in range(0,len(res),51):
            s=res[i:i+51]
            # ls.append(s)
            input_ids = detox_tokenizer.encode(s, return_tensors='pt')
            output_ids = detox_model.generate(input_ids, num_return_sequences=1,max_length=50)
            detox_string = detox_string + detox_tokenizer.decode(output_ids[0], skip_special_tokens=True)
        print("Aft:"+detox_string)
        # print(ls)
        res=detox_string
    if query[0]=='"':
        query=query[1:]
    if query[-1:]=='\n' or query[-1:]=='"':
        query=query[:-1]
    if res[-1:]=='\n':
        res=res[:-1]
    if query[-1:]=='\n' or query[-1:]=='"':
        query=query[:-1]
    return [query,res,ai]


if __name__ == "__main__":
    print("Let's chat! (type 'quit' to exit)")
    while True:
        sentence = input("You: ")
        if sentence == "quit":
            break

        resp = get_response(sentence)
        print(resp)

