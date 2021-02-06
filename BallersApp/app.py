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

class tStats(db.Model):
    __tablename__ = 'Team_Stats'

    Team = db.Column(db.String(64), primary_key=True)
    Year = db.Column(db.Float)
    TeamPoints = db.Column(db.Float)
    Assists = db.Column(db.Float)
    FieldGoals = db.Column(db.Float)
    TeamName = db.Column(db.String(64))
    Wins = db.Column(db.Float)
    Losses = db.Column(db.Float)
    WPct = db.Column(db.Float)

    def __repr__(self):
        return '<tStats %r>' % (self.name)


@app.route("/")
def home():
    return render_template("index.html")

@app.route("/api/tStats")
def nba():
    results = db.session.query(tStats.Team, 
    tStats.Year, 
    tStats.TeamPoints, 
    tStats.Assists, 
    tStats.FieldGoals, 
    tStats.TeamName, 
    tStats.Wins, 
    tStats.Losses, 
    tStats.WPct).all()
    
    
    return jsonify(results)


class gStats(db.Model):
    __tablename__ = 'GOAT'

    Players = db.Column(db.String(64), primary_key=True)
    Total_Games = db.Column(db.Float)
    Minutes_Played = db.Column(db.Float)
    Feild_Goals = db.Column(db.Float)
    Total_Blocks = db.Column(db.Float)
    Total_Steals = db.Column(db.String(64))
    Total_Rebounds = db.Column(db.Float)
    Total_Assists = db.Column(db.Float)
    Total_Points = db.Column(db.Float)
    Average_Points = db.Column(db.Float)
    Average_Assists = db.Column(db.Float)
    Average_Rebounds = db.Column(db.Float)
    Average_Steals = db.Column(db.Float)
    Average_Blocks = db.Column(db.Float)
    Average_Feild_Goals = db.Column(db.Float)
    WINS = db.Column(db.Float)
    LOSSES = db.Column(db.Float)



    def __repr__(self):
        return '<gStats %r>' % (self.name)

@app.route("/api/goat")
def goat():
    results2 = db.session.query(gStats.Players, 
    gStats.Total_Games, 
    gStats.Minutes_Played, 
    gStats.Feild_Goals, 
    gStats.Total_Blocks, 
    gStats.Total_Rebounds, 
    gStats.Total_Assists, 
    gStats.Total_Points, 
    gStats.Average_Points,
    gStats.Average_Assists,
    gStats.Average_Rebounds,
    gStats.Average_Steals,
    gStats.Average_Blocks,
    gStats.Average_Feild_Goals,
    gStats.WINS,
    gStats.LOSSES).all()

    return jsonify(results2)

class pStats(db.Model):
    __tablename__ = 'WSData'

    Player = db.Column(db.String(64), primary_key=True)
    Tm = db.Column(db.String(10))
    Year = db.Column(db.Float)
    Age = db.Column(db.Float)
    Rounded_Position = db.Column(db.Float)
    WS = db.Column(db.Float)
   
    def __repr__(self):
        return '<pStats %r>' % (self.name)

@app.route("/api/ws")
def ws():
    results3 = db.session.query(pStats.Player, 
    pStats.Tm, 
    pStats.Year, 
    pStats.Age, 
    pStats.Rounded_Position, 
    pStats.WS).all()

    return jsonify(results3)



@app.route("/goat")
def GOAT():
    return render_template("GOAT.html")

@app.route("/WS")
def WS():
    return render_template("WS.html")

if __name__ == "__main__":
    app.run(debug=True)