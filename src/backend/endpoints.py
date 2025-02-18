import json
import csv
from datetime import datetime, timedelta
from flask import Flask, g, request, jsonify, render_template, redirect, url_for
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from flask_json import FlaskJSON, json_response
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy 
from flask_marshmallow import Marshmallow
from functions import *
from grapher import *
from loader import *

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
    class Meta:
        model = PortfolioLog

class WatchlistSchema(ma.ModelSchema):
    class Meta:
        model = Watchlist


# manually delete users
@app.route('/delete/<int:user_id>', methods=['DELETE'])
def delete(user_id):
    delete_user(user_id)
    return render_template('welcome.html')

@app.route('/register', methods=['POST', 'GET'])
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
            return redirect(url_for('welcome'))
        else:
            user_schema = UserSchema()
            output = user_schema.dump(user).data
            return jsonify({'user': output})
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
        return jsonify({'portfolios': output})
    else :
        portfolios = get_portfolios(user_id)
        portfolio_schema = PortfolioSchema(many=True)
        output = portfolio_schema.dump(portfolios).data
        return jsonify({'portfolios': output})

@app.route('/user/<int:user_id>/delete/<int:portfolio_id>', methods=['DELETE'])        
def delete_portfolio(user_id, portfolio_id):
    delete_portfolio(user_id, portfolio_id)

@app.route('/user/<int:user_id>/update_ticks/<string:stocks>', methods=['GET'])
def update_ticks(user_id, stocks):
    stock_list = stocks.split(",")
    update_last_ticks(stock_list)
    last_data = get_last_ticks(stock_list)
    company_schema = CompanySchema(many=True)
    output = company_schema.dump(last_data).data
    return jsonify({'last_ticks': output})

@app.route('/user/<int:user_id>/portfolio/<int:portfolio_id>', methods=['GET','POST'])
def stock(user_id, portfolio_id):
    # add stock to portfolio
    if request.method == 'POST':
        data = list(request.form.to_dict().keys())[0]
        data_dict = json.loads(data)
        code = data_dict['code']['data']
        num = data_dict['quantity']['data']
        bought_price = data_dict['price']['data']
        save_log(portfolio_id, code, num, bought_price)
    # else:
    # get existing stocks
    logs = get_logs(portfolio_id)
    log_schema = StockLogSchema(many=True)
    output = log_schema.dump(logs).data
    net_gain = 0
    for data in output:
        data['bought_price'] = get_bought_price(portfolio_id, data['company'])
        data['quantity'] = get_quantity(portfolio_id, data['company'])
        value_bought = data['bought_price'] * data['quantity']
        value_if_sell = data['closing'] * data['quantity']
        data['stock_gain'] = round(value_if_sell - value_bought, 2)
        data['unit_gain'] = round(data['closing']-data['bought_price'], 2)
        net_gain += value_if_sell - value_bought
    net_gain = round(net_gain, 2)
    return jsonify({'portfolio_stocks': output, 'net_gain': net_gain})   

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

@app.route('/company/<string:code>/add_portfolio', methods=['POST'])
def stocklist_to_portfolio(code, portfolio_id):
    # add stock to portfolio from the stocks page
    data = list(request.form.to_dict().keys())[0]
    data_dict = json.loads(data)
    portfolio_id = data_dict['portfolio_id']['data']
    code = data_dict['code']['data']
    num = data_dict['number']['data']
    bought_price = data_dict['bought_price']['data']
    save_log(portfolio_id, code, num, bought_price)

@app.route('/user/<int:user_id>/portfolio/<int:portfolio_id>/update/<string:code>', methods=['POST'])
def update_stock(user_id, portfolio_id, code):
    data = list(request.form.to_dict().keys())[0]
    data_dict = json.loads(data)
    num = data_dict['quantity']
    bought_price = data_dict['bought_price']
    update_log(portfolio_id, code, num, bought_price)
    # get existing stocks
    logs = get_logs(portfolio_id)
    log_schema = StockLogSchema(many=True)
    output = log_schema.dump(logs).data
    net_gain = 0
    for data in output:
        data['bought_price'] = get_bought_price(portfolio_id, data['company'])
        data['quantity'] = get_quantity(portfolio_id, data['company'])
        value_bought = data['bought_price'] * data['quantity']
        value_if_sell = data['closing'] * data['quantity']
        data['stock_gain'] = round(value_if_sell - value_bought, 2)
        net_gain += value_if_sell - value_bought
    net_gain = round(net_gain, 2)
    return jsonify({'portfolio_stocks': output, 'net_gain': net_gain})


@app.route('/user/<int:user_id>/portfolio/<int:portfolio_id>/delete/<string:code>', methods=['DELETE'])        
def delete_stock(user_id, portfolio_id, code):
    delete_log(user_id, portfolio_id, code)
    # get existing stocks
    logs = get_logs(portfolio_id)
    log_schema = StockLogSchema(many=True)
    output = log_schema.dump(logs).data
    net_gain = 0
    for data in output:
        data['bought_price'] = get_bought_price(portfolio_id, data['company'])
        data['quantity'] = get_quantity(portfolio_id, data['company'])
        value_bought = data['bought_price'] * data['quantity']
        value_if_sell = data['closing'] * data['quantity']
        data['stock_gain'] = round(value_if_sell - value_bought, 2)
        net_gain += value_if_sell - value_bought
    net_gain = round(net_gain, 2)
    return jsonify({'portfolio_stocks': output, 'net_gain': net_gain})

@app.route('/user/<int:user_id>/watchlist', methods=['GET'])
def watchlist(user_id):
    wl = get_wl(user_id)
    wl_schema = WatchlistSchema(many=True)
    output = wl_schema.dump(wl).data
    return jsonify({'wl_stocks': output})

# create watchlist for a code
@app.route('/user/<int:user_id>/watchlist/<string:code>', methods=['POST'])
def createWatchlist(user_id, code):
    w = create_wl(user_id, code)
    # watchlist gets updated
    wl = get_wl(user_id)
    wl_schema = WatchlistSchema(many=True)
    output = wl_schema.dump(wl).data
    return jsonify({'wl_stocks': output})

# user sets alerts for a particular code in their watchlist
@app.route('/user/<int:user_id>/watchlist/<string:code>/set_alerts', methods=['POST'])
def watchlist_set(user_id, code):
    data = list(request.form.to_dict().keys())[0]
    data_dict = json.loads(data)
    alert_high = float(data_dict['alert_high']['data'])
    alert_low = float(data_dict['alert_low']['data'])
    buy_high = float(data_dict['buy_high']['data'])
    buy_low = float(data_dict['buy_low']['data'])
    sell_high = float(data_dict['sell_high']['data'])
    sell_low = float(data_dict['sell_low']['data'])

    set_alerts(user_id, code, alert_high, alert_low, buy_high, buy_low, sell_high, sell_low)
    wl = get_wl(user_id)
    wl_schema = WatchlistSchema(many=True)
    output = wl_schema.dump(wl).data
    return jsonify({'wl_stocks': output})

# user updates alerts for a particular code in their watchlist
@app.route('/user/<int:user_id>/watchlist/<string:code>/update_alerts', methods=['POST'])
def watchlist_update(user_id, code):
    data = list(request.form.to_dict().keys())[0]
    data_dict = json.loads(data)
    alert_high = data_dict['alert_high']
    alert_low = data_dict['alert_low']
    buy_high = data_dict['buy_high']
    buy_low = data_dict['buy_low']
    sell_high = data_dict['sell_high']
    sell_low = data_dict['sell_low']

    update_alerts(user_id, code, alert_high, alert_low, buy_high, buy_low, sell_high, sell_low)
    wl = get_wl(user_id)
    wl_schema = WatchlistSchema(many=True)
    output = wl_schema.dump(wl).data
    return jsonify({'wl_stocks': output})


@app.route('/top_ten', methods=['GET'])
def top_ten():
    stocks = get_top_ten()
    log_schema = StockLogSchema(many=True)
    output = log_schema.dump(stocks).data
    return jsonify({'stocks': output})

@app.route('/bottom_ten', methods=['GET'])
def bottom_ten():
    stocks = get_bottom_ten()
    log_schema = StockLogSchema(many=True)
    output = log_schema.dump(stocks).data
    return jsonify({'stocks': output})


@app.route('/user/<int:user_id>/delete_wl/<string:code>', methods=['DELETE'])        
def watchlist_delete(user_id, code):
    delete_wl(user_id, code)
    wl = get_wl(user_id)
    wl_schema = WatchlistSchema(many=True)
    output = wl_schema.dump(wl).data
    return jsonify({'wl_stocks': output})

@app.route('/grapher/<int:micro_int>/<string:type>/<string:stocks>/<string:start_date>/<string:end_date>', methods=['GET'])
def grapher(micro_int, type, stocks, start_date, end_date):
    stock = stocks.split(",")
    micro = False
    if (micro_int == 1):
        micro = True
    if type == "World":
        graph = get_plot(stock, micro=micro, indicies=['world'],start=start_date, finish=end_date)
    elif type == "Simple Moving Average(SMA)":
        graph = get_plot(stock, micro=micro, closing=1, sma15=1, sma50=1, sma200=1, start=start_date, finish=end_date)
    elif type == "Exponential Moving Average(EMA)":
        graph = get_plot(stock, micro=micro, closing=1, ema15=1, ema50=1, ema200=1, start=start_date, finish=end_date)
    elif type == "Percentage Change":
        graph = get_plot(stock, micro=micro, size=(12, 3), change=1, start=start_date, finish=end_date)
    elif type == "Volume Change":
        graph = get_plot(stock, micro=micro, volume=1, size=(12, 2), start=start_date, finish=end_date)
    elif type == "Moving Average Convergence Divergence(MACD)":
        graph = get_plot(stock, micro=micro, macd=1, size=(12, 2), start=start_date, finish=end_date)
    elif type == "Bollinger Bands(BB)":
        graph = get_plot(stock, micro=micro, bb=1, size=(12, 2), start=start_date, finish=end_date)
    elif type == "Stochastic Oscillator(STOCH)":
        graph = get_plot(stock, micro=micro, stoch=1, size=(12, 2), start=start_date, finish=end_date)
    elif type == "Relative Strength Index(RSI)":
        graph = get_plot(stock, micro=micro, rsi=1, size=(12, 2), start=start_date, finish=end_date)
    elif type == "Average Directional Movement Index(ADX)":
        graph = get_plot(stock, micro=micro, adx=1, size=(12, 2), start=start_date, finish=end_date)
    elif type == "Commodity Channel Index(CCI)":
        graph = get_plot(stock, micro=micro, cci=1, size=(12, 2), start=start_date, finish=end_date)
    elif type == "AROON":
        graph = get_plot(stock, micro=micro, aroon=1, size=(12, 2), start=start_date, finish=end_date)
    elif type == "Chaikin":
        graph = get_plot(stock, micro=micro, chaikin=1, size=(12, 2), start=start_date, finish=end_date)
    elif type == "Momentum":
        graph = get_plot(stock, micro=micro, mom=1, size=(12, 2), start=start_date, finish=end_date)
    elif type == "Dividend Yield and Price to Book Value(DP_PB)":
        graph = get_plot(stock, micro=micro, dp_ratio=1, pb_ratio=1, size=(12, 2), start=start_date, finish=end_date)
    elif type == "Correlation":
        graph = get_corr(stock, start=start_date, finish=end_date)
    elif type == "Intraday":
        graph = get_intraday_candle(stock)
    else:
        graph = get_plot(stock, micro=micro, start=start_date, finish=end_date)

    return jsonify({'result': graph})

@app.route('/grapher/prediction/<string:stock>/<string:start_date>')
def prediction_graph(stock, start_date):
    result = get_prediction(stock, start=start_date)
    return jsonify({'graph': result[0], 'price': result[1]})

@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('welcome'))

@login_manager.user_loader
def load_user(user_id):
    return find_user(user_id)
