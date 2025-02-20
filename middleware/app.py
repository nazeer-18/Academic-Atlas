from flask import Flask,render_template,request,jsonify
from flask_cors import CORS
import requests

from chat import get_response
from reccursive_learning import ReccursiveLearn
from research_paper_summarize import generate_summary

app=Flask(__name__)
CORS(app)


@app.post("/response")
def ans():
    text=request.get_json().get("query")
    response=get_response(text)
    js={"query":response[0],"response":response[1],"ai":response[2]}
    return jsonify(js)

@app.put("/updateDatabase")
def updateDatabase():
    pattern=request.get_json().get("pattern")
    intent=request.get_json().get("intent")
    ReccursiveLearn(pattern,intent)
    return jsonify({"response":"updated intents"})

@app.post('/summarize')
def summarize():
    url = request.get_json().get("url")
    id = request.get_json().get("id")
    # print(url)
    summary=generate_summary(url)
    # summary="testxxxxx"
    # print("summary generated:",summary)
    server_url="http://localhost:8080"
    res=requests.post(server_url+'/api/resources/updateSummary',json={"summary":summary,"id":id})
    # print(res.json())
    print("updated db," )
    #todo: add this to intent.json
    return jsonify({"status":"Sucess"})
    
if __name__=="__main__":
    app.run(debug=True)