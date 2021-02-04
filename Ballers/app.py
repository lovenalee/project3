import os
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)

app = Flask(__name__)

from flask_sqlalchemy import SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///sqlite.db"
db = SQLAlchemy(app)

print(app)


if __name__ == "__main__":
    app.run(debug=True)