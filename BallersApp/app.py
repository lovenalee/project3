import os
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect,
    url_for)
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///BallersP3.db"
db = SQLAlchemy(app)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/tStats")
def tStats():
    return render_template("tStats.html")

@app.route("/teamStats")
def teamStats():
    return render_template("teamStats.html")

@app.route("/teamStats2")
def teamStats2():
    return render_template("tStatScatterLine.html")

@app.route("/goat")
def GOAT():
    return render_template("GOAT.html")

@app.route("/WS")
def WS():
    return render_template("WS.html")

@app.route("/teams")
def teams():
    return render_template("Teams.html")

@app.route("/introduction")
def introduction():
    return render_template("introduction.html")

class tStats(db.Model):
    __tablename__ = 'Team_Stats'

    Team = db.Column(db.String(64), primary_key=True)
    Year = db.Column(db.String(4))
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
def tStats2():
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

class tStats2018(db.Model):
    __tablename__ = 'Team_Stats_2018'
    
    ID = db.Column(db.Float, primary_key=True)
    Team = db.Column(db.String(64))
    Year = db.Column(db.String(4))
    TeamPoints = db.Column(db.Float)
    Assists = db.Column(db.Float)
    FieldGoals = db.Column(db.Float)
    TotalRebounds = db.Column(db.Float)
    TeamName = db.Column(db.String(64))
    Wins = db.Column(db.Float)
    Losses = db.Column(db.Float)
    WPct = db.Column(db.Float)
    
    def __repr__(self):
        return '<tStats2018 %r>' % (self.name)

@app.route("/api/tStats2018")
def tStats_2018():
    results6 = db.session.query(
    tStats2018.ID,
    tStats2018.Team,
    tStats2018.TeamPoints, 
    tStats2018.Assists, 
    tStats2018.FieldGoals,
    tStats2018.TotalRebounds).all()
    
    result_list6 = []
    
    for result6 in results6:
        tStatsdata2018 = {
            "ID": result6[0],
            "Team": result6[1],
            "Points": result6[2],
            "Assists": result6[3],
            "FieldGoals": result6[4],
            "Rebounds": result6[5]
        }

        result_list6.append(tStatsdata2018)
    
    print(result_list6)

    return jsonify(result_list6)


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
    __tablename__ = 'WS_Avg'

    Year = db.Column(db.Float, primary_key=True)
    Rounded_Position = db.Column(db.Float)
    WSmean = db.Column(db.Float)
   
    def __repr__(self):
        return '<pStats %r>' % (self.name)

@app.route("/api/ws")
def ws():
    results3 = db.session.query(
    pStats.Year, 
    pStats.Rounded_Position, 
    pStats.WSmean).all()

    result_list3 = []
    
    for result3 in results3:
        wsdata = {
            "Year": result3[0],
            "Rounded_Position": result3[1],
            "WSmean": result3[2]
        }
        result_list3.append(wsdata)

    return jsonify(result_list3)



class rStats(db.Model):
    __tablename__ = 'goat_rings'

    Player = db.Column(db.String(64), primary_key=True)
    Championships = db.Column(db.Float)
    Year = db.Column(db.String(10))
  
   
    def __repr__(self):
        return '<rStats %r>' % (self.name)

@app.route("/api/rings")
def rings():
    results4 = db.session.query(rStats.Player, 
    rStats.Championships, 
    rStats.Year).all()

    result_list4 = []
    
    for result4 in results4:
        ringdata = {
            "Player": result4[0],
            "Titles": result4[1],
            "Year": result4[2]
        }

        result_list4.append(ringdata)

    return jsonify(result_list4)

class g2Stats(db.Model):
    __tablename__ = 'goat_totals'

    STATS = db.Column(db.String(64), primary_key=True)
    bill = db.Column(db.Float)
    wilt = db.Column(db.Float)
    kareem = db.Column(db.Float)
    magic = db.Column(db.Float)
    larry = db.Column(db.Float)
    michael = db.Column(db.Float)
    scottie = db.Column(db.Float)
    shaquille = db.Column(db.Float)
    kobe = db.Column(db.Float)
    lebron = db.Column(db.Float)
    stephen = db.Column(db.Float)
    kevin = db.Column(db.Float)
    kawhi = db.Column(db.Float)


  
   
    def __repr__(self):
        return '<g2Stats %r>' % (self.name)

@app.route("/api/totals")
def totals():
    results5 = db.session.query(g2Stats.STATS, 
    g2Stats.bill,
    g2Stats.wilt,
    g2Stats.kareem,
    g2Stats.magic,
    g2Stats.larry,
    g2Stats.michael,
    g2Stats.scottie,
    g2Stats.shaquille,
    g2Stats.kobe,
    g2Stats.lebron,
    g2Stats.stephen,
    g2Stats.kevin,
    g2Stats.kawhi).all()

    result_list5 = []
    
    for result5 in results5:
        totaldata = {
            "Stats": result5[0],
            "bill": result5[1],
            "wilt": result5[2],
            "kareem": result5[3],
            "magic": result5[4],
            "larry": result5[5],
            "michael": result5[6],
            "scottie": result5[7],
            "shaquille": result5[8],
            "kobe": result5[9],
            "lebron": result5[10],
            "stephen": result5[11],
            "kevin": result5[12],
            "kawhi": result5[13]
        }

        result_list5.append(totaldata)

    return jsonify(result_list5)






if __name__ == "__main__":
    app.run(debug=True)