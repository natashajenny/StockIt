import json
from datetime import datetime, timedelta
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

class PortfolioSchema(ma.ModelSchema):
    class Meta:
        model = Portfolio

class CompanySchema(ma.ModelSchema):
    class Meta:
        model = Company

class StockLogSchema(ma.ModelSchema):
    class Meta:
        model = StockLog

class PerformanceLogSchema(ma.ModelSchema):
    class Meta:
        model = PerformanceLog

class PortfolioLogSchema(ma.ModelSchema):
    # details = ma.Nested(StockLogSchema)
    class Meta:
        model = PortfolioLog

class WatchlistSchema(ma.ModelSchema):
    class Meta:
        model = Watchlist


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


@app.route('/company', methods=['GET'])
def all_companies():
    comps = get_summary()
    pl_schema = PerformanceLogSchema(many=True)
    output = pl_schema.dump(comps).data
    return jsonify({'stocks': output})


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

@app.route('/user/<int:user_id>/delete/<int:portfolio_id>', methods=['DELETE'])        
def delete_portfolio(portfolio_id, code):
    delete_portfolio(portfolio_id)

@app.route('/user/<int:user_id>/portfolio/<int:portfolio_id>', methods=['GET','POST'])
def stock(user_id, portfolio_id):
    # add stock to portfolio
    if request.method == 'POST':
        data = list(request.form.to_dict().keys())[0]
        data_dict = json.loads(data)
        code = data_dict['code']['data']
        num = data_dict['number']['data']
        bought_price = data_dict['bought_price']['data']
        save_log(portfolio_id, code, num, bought_price)
    # get existing stocks    
    else:
        logs = get_logs(portfolio_id)
        log_schema = StockLogSchema(many=True)
        output = log_schema.dump(logs).data
        net_gain = 0
        for data in output:
            data['bought_price'] = get_bought_price(portfolio_id, data['company'])
            data['quantity'] = get_quantity(portfolio_id, data['company'])
            prev_date = datetime.today() - timedelta(days=1)
            prev_price = get_stock_price(prev_date, data['company'])
            data['change'] = round(data['closing'] - prev_price, 2)
            data['percentage_change'] = round(data['change']/prev_price * 100, 2) # this is in %
            value_bought = data['bought_price'] * data['quantity']
            value_if_sell = data['closing'] * data['quantity']
            data['stock_gain'] = round(value_if_sell - value_bought, 2)
            net_gain += value_if_sell - value_bought
        net_gain = round(net_gain, 2)
        return jsonify({'portfolio_stocks': output, 'net_gain': net_gain})

# @app.route('/test', methods=['GET'])
# def testok():
#     logs = get_logs(16)
#     log_schema = StockLogSchema(many=True)
#     output = log_schema.dump(logs).data
#     net_gain = 0
#     for data in output:
#         data['bought_price'] = get_bought_price(16, data['company'])
#         data['quantity'] = get_quantity(16, data['company'])
#         prev_date = datetime.today() - timedelta(days=1)
#         prev_price = get_stock_price(prev_date, data['company'])
#         data['prev_price'] = prev_price
#         data['change'] = round(data['closing'] - prev_price, 2)
#         data['percentage_change'] = round(data['change']/prev_price * 100, 2) # this is in %
#         data['value_bought'] = data['bought_price'] * data['quantity']
#         data['value_if_sell'] = data['closing'] * data['quantity']
#         data['stock_gain'] = round(data['value_if_sell'] - data['value_bought'], 2)
#         net_gain += data['value_if_sell'] - data['value_bought']
#         data['net_gain'] = net_gain
#     net_gain = round(net_gain, 2)
#     return jsonify({'portfolio_stocks': output, 'net_gain': net_gain})
   

@app.route('/company/<string:code>', methods=['GET'])
def stock_details(code):
    pl_det = get_pl_details(code)
    pl_schema = PerformanceLogSchema()
    pl_output = pl_schema.dump(pl_det).data

    stock_det = get_stock_details(code)
    s_schema = StockLogSchema()
    s_output = s_schema.dump(stock_det).data
    pl_output.update(s_output)
    return jsonify({'details': pl_output})

@app.route('/user/<int:user_id>/portfolio/<int:portfolio_id>/update/<string:code>', methods=['POST'])
def update_stock(portfolio_id, code):
    data = list(request.form.to_dict().keys())[0]
    data_dict = json.loads(data)
    num = data_dict['number']['data']
    bought_price = data_dict['bought_price']['data']
    update_log(portfolio_id, code, num, bought_price)


@app.route('/user/<int:user_id>/portfolio/<int:portfolio_id>/delete/<string:code>', methods=['DELETE'])        
def delete_stock(user_id, portfolio_id, code):
    delete_log(useR_id, portfolio_id, code)

@app.route('/user/<int:user_id>/watchlist', methods=['GET','POST'])
def watchlist(user_id):
    if request.method == 'POST':
        # maybe there should be a search functionality here to add the stock to the watchlist?
        data = list(request.form.to_dict().keys())[0]
        data_dict = json.loads(data)
        code = data_dict['code']['data']
        w = create_wl(user_id, code)
        # watchlist gets updated
        wl = get_wl(user_id)
        wl_schema = WatchlistSchema(many=True)
        output = wl_schema.dump(wl).data
        return jsonify({'wl_stocks': output})
    else:
        wl = get_wl(user_id)
        wl_schema = WatchlistSchema(many=True)
        output = wl_schema.dump(wl).data
        return jsonify({'wl_stocks': output})

@app.route('/user/<int:user_id>/delete_wl/<string:code>', methods=['DELETE'])        
def delete_wl(user_id, code):
    delete_wl(user_id, code)

@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('welcome'))

@login_manager.user_loader
def load_user(user_id):
    return find_user(user_id)

# this is just for testing

@app.route('/allusers', methods=['GET'])
def all_users():
    users = get_all_users()
    user_schema = UserSchema(many=True)
    output = user_schema.dump(users).data
    return jsonify({'users' : output})


# @app.route('/allports', methods=['GET'])
# def all_ports():
#     ports = get_portfolios(16)
#     portfolio_schema = PortfolioSchema(many=True)
#     output = portfolio_schema.dump(ports).data
#     return jsonify({'portfolios' : output})

