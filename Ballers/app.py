import os
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///BallersP3.db"
db = SQLAlchemy(app)

class tStats(db.tStats):
    __tablename__ = 'Team_Stats'

    Team = db.Column(db.String(64))
    Year = db.Column(db.Float)
    TeamPoints = db.Column(db.Float)
    Assists = db.Column(db.Float)
    FieldGoals = db.Column(db.Float)
    TeamName = db.Column(db.String(64))
    Wins = db.Column(db.Float)
    Losses = db.Column(db.Float)
    WinPct = db.Column(db.Float)

    def __repr__(self):
        return '<tStats %r>' % (self.name)

@app.route("/")
def home():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)