# set dependencies
import json
import pymongo
import pandas as pd
import os
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)

# Initiate confiquration 
app = Flask(__name__)

# Initialize PyMongo to work with MongoDBs
conn = 'mongodb://localhost:27017'
client = pymongo.MongoClient(conn)

# connect to mongo db and collection
db = client['Proj2_NBA_db']
coll = db['Team_Stats']

cursor = coll.find()

mongo_docs = list(cursor)

docs = pd.DataFrame(columns=[])

for num, doc in enumerate(mongo_docs):
    doc_id = doc["_id"]
    series_obj = pd.Series(doc, name=doc_id)
    docs = docs.append(series_obj)

    #print(docs)

    #json.dumps(parsed, indent=4)  

# render a list from mongoDB into jsonified route
# @app.route("/conn")
# def pStats():
#     mylist = []
#     for item in coll.find(): 
#         mylist.append(item)
#     return jsonify(mylist)

# render a list from mongoDB into HTML
# @app.route("/conn")
# def pStats(): 
#     results = list(coll.find())
#     return render_template("index1.html", pStats=results)

## frontend routes
@app.route("/")
def main():
    return render_template("index1.html")

# ## service routes
@app.route("/conn")
def firstRoute():
    #test = coll.session.query().all()
    test = coll.find_one()
    print('testing json dumps',json.dumps(list(test), indent=4))

    return json.dumps(list(test), indent=4)


if __name__ == "__main__":
    app.run(debug=True)