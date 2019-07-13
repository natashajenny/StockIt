# from .middlewares import login_required
from flask import Flask, json, g, request, jsonify, render_template, redirect, url_for
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from flask_json import FlaskJSON, json_response
# from app.kudo.service import Service as Kudo
# from app.kudo.schema import GithubRepoSchema
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy 
from flask_marshmallow import Marshmallow
from functions import *

app = Flask(__name__)
CORS(app)
json = FlaskJSON(app)
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

@app.route('/register', methods=['POST', 'GET'])
# @login_required
def register():
    print('haha')
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        name = request.form['name']
        gender = request.form['gender']
        email = request.form['email']
        phone = request.form['phone']
    
        user = create_user(username, password, name, gender, email, phone)
        user_schema = UserSchema()
        output = user_schema.dump(user).data

        # returns json object of registered User
        return jsonify({'user': output})
    else :
        return render_template('newUser.html')

@app.route('/login', methods=['GET','POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        user = validate_login(username, password)

        if user is False:
            return redirect(url_for('welcome'))
        else:
            login_user(user[0])
            return render_template('home.html')
    return render_template('login.html')

# this is just for testing
@app.route('/allusers', methods=['GET'])
def allusers():
    users = get_all_users()
    user_schema = UserSchema(many=True)
    output = user_schema.dump(users).data
    return jsonify({'all users' : output})


# @app.route('/user/<int:user_id>/portfolio', methods=['GET'])
# # @login_required
# def create(user_id):
#     buf = 'user ' + str(user_id) + ' portfolio'
#     return json_response(value = buf)


@app.route('/dashboard')
@login_required
def dashboard():
    pass

@app.route('/portfolio', methods=['GET','POST'])
@login_required
def portfolio():
    if request.method == 'POST':
        title = request.form['title']
        desc = request.form['description']

        p = create_portfolio(current_user.user_id, title, desc)   
        portfolios = get_portfolios(current_user.user_id)
        portfolio_schema = PortfolioSchema(many=True)
        output = portfolio_schema.dump(portfolios).data
        return render_template('portfolio.html', portfolios=output)

    else :
        portfolios = get_portfolios(current_user.user_id)
        portfolio_schema = PortfolioSchema(many=True)
        output = portfolio_schema.dump(portfolios).data
        return render_template('portfolio.html', portfolios=output)

@app.route('/watchlist')
@login_required
def watchlist():
    pass

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('welcome'))

@login_manager.user_loader
def load_user(user_id):
    return find_user(user_id)



