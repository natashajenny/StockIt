# from .middlewares import login_required
from flask import Flask, json, g, request
from flask_json import FlaskJSON, json_response
# from app.kudo.service import Service as Kudo
# from app.kudo.schema import GithubRepoSchema
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
json = FlaskJSON(app)

@app.route("/user", methods=["GET"])
# @login_required
def index():
    return json_response(value = 'all users')


@app.route("/user/<int:user_id>/portfolio", methods=["GET"])
# @login_required
def create(user_id):
    buf = 'user ' + str(user_id) + ' portfolio'
    return json_response(value = buf)

