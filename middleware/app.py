from flask import Flask,render_template,request,jsonify
from flask_cors import CORS
import requests
from apscheduler.schedulers.background import BackgroundScheduler
import time
import nltk

from chat import get_response
from reccursive_learning import ReccursiveLearn
from research_paper_summarize import generate_summary
from better_response import newResponse
from train import train_intents

app=Flask(__name__)
CORS(app)

scheduler = BackgroundScheduler()
scheduler.add_job(train_intents, 'cron', hour=3, minute=0)  # Runs every day at 3:00 AM
scheduler.start()

@app.post("/response")
def ans():
    text=request.get_json().get("query")
    response=get_response(text)
    js={"query":response[0],"response":response[1],"ai":response[2]}
    return jsonify(js)

@app.post('/betterResponse')
def ansAgain():
    query=request.get_json().get("query")
    response=request.get_json().get("response")
    new_response=newResponse(query,response)
    print(new_response)
    return jsonify({"betterResponse": new_response})

@app.put("/updateDatabase")
def updateDatabase():
    pattern=request.get_json().get("pattern")
    intent=request.get_json().get("intent")
    ReccursiveLearn(pattern,intent)
    return jsonify({"response":"updated intents"})

@app.post('/summarize')
def summarize():
    title=request.get_json().get("title")
    url = request.get_json().get("url")
    id = request.get_json().get("id")
    summary=generate_summary(url)
    server_url="http://localhost:8080"
    res=requests.post(server_url+'/api/resources/updateSummary',json={"summary":summary,"id":id})
    patterns=[title,"summary of "+title,"summarize "+title]
    ReccursiveLearn(patterns,"summary of "+title+": \n"+summary)
    return jsonify({"status":"Sucess"})
    
if __name__=="__main__":
    nltk.download('punkt_tab')
    app.run(debug=True)