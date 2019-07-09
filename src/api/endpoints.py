# from .middlewares import login_required
from flask import Flask, json, g, request, jsonify
from flask_json import FlaskJSON, json_response
# from app.kudo.service import Service as Kudo
# from app.kudo.schema import GithubRepoSchema
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy 
from flask_marshmallow import Marshmallow

from ..scripts import functions 

app = Flask(__name__)
CORS(app)
json = FlaskJSON(app)

ma = Marshmallow(app)

class UserSchema(ma.ModelSchema):
    class Meta:
        model = User


@app.route("/user", methods=["GET"])
# @login_required
def index():
    user = functions.create_user('user1', '1234', 'userOne', '13-11-96', 'F', 'email', 'phone')
    user_schema = UserSchema()
    output = user_schema.dump(user).data
    return jsonify({'user' : output})


@app.route("/user/<int:user_id>/portfolio", methods=["GET"])
# @login_required
def create(user_id):
    buf = 'user ' + str(user_id) + ' portfolio'
    return json_response(value = buf)
