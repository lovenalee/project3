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
    print(results)
    return jsonify(results)


class gStats(db.Model):
    __tablename__ = 'GOAT_Stats'

    name = db.Column(db.String(64), primary_key=True)
    MATCHUP = db.Column(db.String(64))
    WL = db.Column(db.String(10))
    FG3_PCT = db.Column(db.Float)
    FGM = db.Column(db.Float)
    FTM = db.Column(db.String(64))
    MIN = db.Column(db.Float)
    REB = db.Column(db.Float)
    AST = db.Column(db.Float)
    PTS = db.Column(db.Float)
    BLK = db.Column(db.Float)
    STL = db.Column(db.Float)

    def __repr__(self):
        return '<gStats %r>' % (self.name)

@app.route("/api/goat")
def goat():
    results2 = db.session.query(gStats.name, 
    gStats.MATCHUP, 
    gStats.WL, 
    gStats.FG3_PCT, 
    gStats.FGM, 
    gStats.FTM, 
    gStats.MIN, 
    gStats.REB, 
    gStats.AST,
    gStats.PTS,
    gStats.BLK,
    gStats.STL).all()

    return jsonify(results2)

class pStats(db.Model):
    __tablename__ = 'NBA_Season_Data'

    Player = db.Column(db.String(64), primary_key=True)
    Tm = db.Column(db.String(10))
    Year = db.Column(db.Float)
    Age = db.Column(db.Float)
    G = db.Column(db.Float)
    MP = db.Column(db.Float)
    PER = db.Column(db.Float)
   

    def __repr__(self):
        return '<pStats %r>' % (self.name)

@app.route("/api/position")
def position():
    results3 = db.session.query(pStats.Player, 
    pStats.Tm, 
    pStats.Year, 
    pStats.Age, 
    pStats.G, 
    pStats.MP, 
    pStats.PER).all()

    return jsonify(results3)

@app.route("/goat")
def GOAT():
    return render_template("GOAT.html")


if __name__ == "__main__":
    app.run(debug=True)