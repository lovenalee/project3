# set dependencies
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
coll = db['PlayerPerGamesStats']

# render a list from mongoDB into jsonified route
@app.route("/conn")
def pStats():
    mylist = []
    for item in coll.find(): 
        mylist.append(item)
    return jsonify(mylist)

# render a list from mongoDB into HTML
# @app.route("/conn")
# def pStats(): 
#     results = list(coll.find())
#     return render_template("index1.html", pStats=results)

# ## frontend routes
# @app.route("/")
# def main():
#     return render_template("index.html")

# # ## service routes
# @app.route("/conn")
# def firstRoute():
#     db.session.query().all()
#     return jsonify(coll)

if __name__ == "__main__":
    app.run(debug=True)