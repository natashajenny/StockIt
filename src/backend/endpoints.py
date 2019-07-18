import json
from flask import Flask, g, request, jsonify, render_template, redirect, url_for
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from flask_json import FlaskJSON, json_response
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy 
from flask_marshmallow import Marshmallow
from functions import *

app = Flask(__name__)
CORS(app)
ma = Marshmallow(app)

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'
app.secret_key = 'super secret key'
app.config['Register_Admin_Status'] = 'Admin_logged_in'

class UserSchema(ma.ModelSchema):
    class Meta:
        model = User

class CompanySchema(ma.ModelSchema):
    class Meta:
        model = Company

class PortfolioSchema(ma.ModelSchema):
    class Meta:
        model = Portfolio


@app.route('/')
def welcome():
    return render_template('welcome.html')

# manually delete users
@app.route('/delete/<int:user_id>', methods=['DELETE'])
def delete(user_id):
    delete_user(user_id)
    return render_template('welcome.html')

@app.route('/register', methods=['POST', 'GET'])
# @login_required
def register():
    if request.method == 'POST':
        data = list(request.form.to_dict().keys())[0]
        data_dict = json.loads(data)
        username = data_dict['username']['data']
        password = data_dict['password']['data']
        name = data_dict['name']['data']
        email = data_dict['email']['data']
        phone = data_dict['phone']['data']
    
        user = create_user(username, password, name, email, phone)
        user_schema = UserSchema()
        output = user_schema.dump(user).data
        print(output)
        # returns json object of registered User
        return jsonify({'user': output})
    else :
        return render_template('newUser.html')

@app.route('/login', methods=['GET','POST'])
def login():
    if request.method == 'POST':
        data = list(request.form.to_dict().keys())[0]
        data_dict = json.loads(data)
        username = data_dict['username']['data']
        password = data_dict['password']['data']
        user = validate_login(username, password)

        if user is None:
            print('user is false')
            return redirect(url_for('welcome'))
        else:
            user_schema = UserSchema()
            output = user_schema.dump(user).data
            # returns json object of registered User
            print(output)
            return jsonify({'user': output})
            # return render_template('home.html')
    return render_template('login.html')

# this is just for testing
@app.route('/allusers', methods=['GET'])
def allusers():
    users = get_all_users()
    user_schema = UserSchema(many=True)
    output = user_schema.dump(users).data
    return jsonify({'all users' : output})


@app.route('/company', methods=['GET'])
def allcomnames():
    stocks = get_com_name()
    company_schema = CompanySchema(many=True)
    output = company_schema.dump(stocks).data
    return jsonify({'all stocks' : output})

@app.route('/dashboard')
def dashboard():
    pass

@app.route('/user/<int:user_id>/portfolio', methods=['GET','POST'])
def portfolio(user_id):
    if request.method == 'POST':
        data = list(request.form.to_dict().keys())[0]
        data_dict = json.loads(data)
        title = data_dict['title']['data']
        desc = data_dict['description']['data']

        p = create_portfolio(user_id, title, desc)   
        portfolios = get_portfolios(user_id)
        portfolio_schema = PortfolioSchema(many=True)
        output = portfolio_schema.dump(portfolios).data
        print(output)
        return jsonify({'portfolios': output})
    else :
        portfolios = get_portfolios(user_id)
        portfolio_schema = PortfolioSchema(many=True)
        output = portfolio_schema.dump(portfolios).data
        return jsonify({'portfolios': output})

@app.route('/user/<int:user_id>/portfolio/<int:portfolio_id>', methods=['GET','POST'])
def stock(user_id, portfolio_id):
    if request.method == 'POST':
        print(user_id, portfolio_id)
        return jsonify({'stocks': 'all_stocks'})
    else:
        return jsonify({'stocks': 'all_stocks'})

@app.route('/watchlist')
def watchlist():
    pass

@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('welcome'))

@login_manager.user_loader
def load_user(user_id):
    return find_user(user_id)



