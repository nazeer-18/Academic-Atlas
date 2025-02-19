from flask import Flask,render_template,request,jsonify
from chat import get_response
from flask_cors import CORS
from reccursive_learning import ReccursiveLearn
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
    
if __name__=="__main__":
    app.run(debug=True)