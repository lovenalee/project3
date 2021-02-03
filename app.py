# set dependencies
import pymongo
import pandas as pd
import jsonify
from flask import Flask, render_template

# Initialize PyMongo to work with MongoDBs
conn = 'mongodb://localhost:27017'
client = pymongo.MongoClient(conn)

# connect to mongo db and collection
db = client['Proj2_NBA_db']
coll = db['PlayerPerGamesStats']

## frontend routes
@app.route("/")
def main():
    return render_template("index.html")

## service routes
@app.route("mongodb://localhost:27017")
def firstRoute():
    db.session.query().all()
    return jsonify(thisdict)

if __name__ == "__main__":
    app.run(debug=True)