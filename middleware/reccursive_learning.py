import random
import json

from train import train_intents

def ReccursiveLearn(pattern,intent):
    id=random.randint(10**7, 10**8-1)
    if type(pattern) != type([]):
        pattern=[pattern]
    dict={"tag":"ai_"+str(id),"patterns": pattern,"responses":[intent]}
    with open("intents.json",'r+') as f:
        data=json.load(f)
        data["intents"].append(dict)
        f.seek(0)  # Go back to the beginning of the file
        json.dump(data, f, indent=4)
    # todo: find a solution to train the updated intent file
    # train_intents()

if __name__=="__main__":
    p=input()
    i=input()
    ReccursiveLearn(p,i)
