# from .middlewares import login_required
from flask import Flask, json, g, request, jsonify
from flask_json import FlaskJSON, json_response
# from app.kudo.service import Service as Kudo
# from app.kudo.schema import GithubRepoSchema
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy 
from flask_marshmallow import Marshmallow
# import scripts/functions.py file

app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
CORS(app)
json = FlaskJSON(app)

# ma = Marshmallow(app)

# class CompanySchema(ma.ModelSchema):
#     class Meta:
#         model = Company
#         # Company from model.py


@app.route("/user", methods=["GET"])
# @login_required
def index():
    return json_response(value = 'all users')


@app.route("/user/<int:user_id>/portfolio", methods=["GET"])
# @login_required
def create(user_id):
    buf = 'user ' + str(user_id) + ' portfolio'
    return json_response(value = buf)


# @app.route('/')
# def index():
#     # result has sqlalchemy objects from an all() query
#     result = get_companies()
#     c_schema = StockSchema(many=True)
#     output = c_schema.dump(result).data
#     return jsonify({'company' : output})