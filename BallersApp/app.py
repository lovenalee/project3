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

@app.route("/api/tStats")
def nba():
    results1 = db.session.query(
    tStats.Team, 
    tStats.Year, 
    tStats.TeamPoints, 
    tStats.Assists, 
    tStats.FieldGoals, 
    tStats.TeamName, 
    tStats.Wins, 
    tStats.Losses, 
    tStats.WPct).all()
    
    result_list1 = []
    
    for result1 in results1:
        tStatsdata = {
            "TeamAbbr": result1[0],
            "Seasons": result1[1],
            "Points": result1[2],
            "Assists": result1[3],
            "FieldGoals": result1[4],
            "TeamName": result1[5],
            "Wins": result1[6],
            "Losses": result1[7],
            "WinPct": result1[8]
        }

        result_list1.append(tStatsdata)

    return jsonify(result_list1)

class gStats(db.Model):
    __tablename__ = 'GOAT'

    Players = db.Column(db.String(64), primary_key=True)
    Total_Games = db.Column(db.Float)
    Minutes_Played = db.Column(db.Float)
    Feild_Goals = db.Column(db.Float)
    Total_Blocks = db.Column(db.Float)
    Total_Steals = db.Column(db.Float)
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

    result_list2 = []
    
    for result2 in results2:
        goatdata = {
            "Player": result2[0],
            "Total_Games": result2[1],
            "Minutes_Played": result2[2],
            "Feild_Goals": result2[3],
            "Total_Blocks": result2[4],
            "Total_Rebounds": result2[5],
            "Total_Assists": result2[6],
            "Total_Points": result2[7],
            "Average_Points": result2[8],
            "Average_Assists": result2[9],
            "Average_Rebounds": result2[10],
            "Average_Steals": result2[11],
            "Average_Blocks": result2[12],
            "Average_Feild_Goals": result2[13],
            "WINS": result2[14],
            "LOSSES": result2[15]
        }

        result_list2.append(goatdata)

    return jsonify(result_list2)

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

    result_list3 = []
    
    for result3 in results3:
        wsdata = {
            "Player": result3[0],
            "Tm": result3[1],
            "Year": result3[2],
            "Age": result3[3],
            "Rounded_Position": result3[4],
            "WS": result3[5]
        }

        result_list3.append(wsdata)

    return jsonify(result_list3)

@app.route("/tStats")
def tStats():
    return render_template("tStats.html")

@app.route("/goat")
def GOAT():
    return render_template("GOAT.html")

@app.route("/WS")
def WS():
    return render_template("WS.html")

if __name__ == "__main__":
    app.run(debug=True)