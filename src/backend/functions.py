import datetime
from model import *
from sqlalchemy import and_, between, func, desc, asc
from sqlalchemy.sql import exists

## User

# Create and save a new user
def create_user(login, password, name, email, phone):
    user = User(login=login, password=password, name=name, email=email, phone=phone, balance=0)
    user.save()
    return user

def delete_user(user_id):
    user = User().query().get(user_id)
    user.delete()

def find_user(user_id):
    return User().query().get(user_id)

# Returns a list of this user's portfolio objects
def get_portfolios(user_id):
    portfolios = Portfolio().query().filter(Portfolio.user_id==user_id)
    return portfolios.all()


# check if user is registered, allows them to login
def validate_login(login, password):
    db = Db.instance()
    user = db.session.query(User).filter(and_(User.login == login, User.password == password)).all()
    if not user:
        return None
    else:
        return user[0]


## Company

def get_company(code):
    company = Company().query().get(code)
    return company

def get_stock_logs(code):
    company = get_company(code)
    return company.stock_logs

# Get all companies in the db
def get_companies():
    companies = Company().query().order_by(Company.name)
    return companies.all()

# Get all companies names
def get_com_name():
    companies = Company().query().with_entities(Company.code).order_by(Company.code)
    return companies.all()

# Search companies with names like %keyword%
def get_companies_like(keyword):
    companies = Company().query().filter(Company.name.like('%keyword%'))
    return companies.all()

def get_last_ticks(stocks):
    db = Db.instance()
    q = db.session.query(Company.code, Company.last_dt, Company.last_tick).filter(Company.code.in_(stocks))
    return q.all()


## Stock Log

def get_stock_details(code):
    c = Company().query().get(code)
    q = StockLog().query().filter(and_(StockLog.company == c, StockLog.opening != None)).order_by(desc(StockLog.date)).first()
    return q        

## Performance Log

def get_summary():
    db = Db.instance()
    subq = db.session.query(PerformanceLog.code, func.max(PerformanceLog.year).label('maxyear')).group_by(PerformanceLog.code).subquery('t2')
    q = db.session.query(PerformanceLog).\
    join(subq, and_(PerformanceLog.code == subq.c.code, PerformanceLog.year == subq.c.maxyear))
    return q.all()

def get_pl_details(code):
    q = PerformanceLog().query().filter(PerformanceLog.code == code).order_by(desc(PerformanceLog.year)).first()
#     print(q.__dict__)
    return q

def get_top_ten():
    q = StockLog().query().order_by(asc(StockLog.rank)).limit(10)
    return q.all()

def get_bottom_ten():
    q = StockLog().query().filter(StockLog.rank.isnot(None)).order_by(desc(StockLog.rank)).limit(10)
    return q.all()

## Portfolio

def create_portfolio(user_id, title, description):
    portfolio = Portfolio(user_id=user_id, title=title, description=description, created_on=datetime.now())
    portfolio.save()
    return portfolio.portfolio_id

def delete_portfolio(portfolio_id):
    portfolio = Portfolio().query().get(portfolio_id)
    portfolio.delete()

def find_portfolio(portfolio_id):
    return Portfolio().query().get(portfolio_id)

# def update_portfolio(portfolio_id, net_gain):
#     p = Portfolio().query().filter(Portfolio.portfolio_id == portfolio_id).scalar()
#     p.net_gain = net_gain
#     p.update()

## Portfolio Log

def get_logs(portfolio_id):
    db = Db.instance()
    subq = db.session.query(StockLog.code.label('stock_code'), func.max(StockLog.date).label('recent_date')).group_by(StockLog.code).subquery('t2')
    q = db.session.query(StockLog).join(subq, and_(StockLog.date == subq.c.recent_date, StockLog.code == subq.c.stock_code, StockLog.opening != None)).\
        join(PortfolioLog, PortfolioLog.code == StockLog.code).filter(PortfolioLog.portfolio_id == portfolio_id)
    return q.all()

def get_portfolio_stocks(portfolio_id):
    q = PortfolioLog().query().filter(PortfolioLog.portfolio_id == portfolio_id)
    # for l in q.all():
    #    print(l.code)
    return q.all()

def get_portfolio_codes(portfolio_id):
    q = PortfolioLog().query().filter(PortfolioLog.portfolio_id == portfolio_id)
    companies = []
    for l in q.all():
       companies.append(l.code)
    return companies

def get_log_date(portfolio_id, code):
    d = PortfolioLog().query().filter(and_(PortfolioLog.portfolio_id == portfolio_id, PortfolioLog.code == code)).scalar()
#     for l in d.all():
#         print(l.__dict__)
    return d.datetime

def get_logs_limit(portfolio_id, start_date, end_date):
    log = PortfolioLog().query().filter(and_(portfolio_id==portfolio_id, datetime.between(start_date, end_date)))
    return log.all()

def get_bought_price(portfolio_id, code):
    log = PortfolioLog().query().filter(and_(PortfolioLog.portfolio_id == portfolio_id, PortfolioLog.code == code)).scalar()
    return log.bought_price

#todo
def save_log(portfolio_id, code, number, bought_price):
    p = PortfolioLog(datetime=datetime.now(), portfolio_id=portfolio_id, code=code, number=number, bought_price=bought_price)
    p.save()

def update_log(portfolio_id, code, number, bought_price):
    p = PortfolioLog().query().filter(and_(PortfolioLog.portfolio_id == portfolio_id, PortfolioLog.code == code)).scalar()
    p.datetime = datetime.now()
    p.number = number
    p.bought_price = bought_price
    p.update()

def delete_log(user_id, portfolio_id, code):
    p = PortfolioLog().query().filter(and_(PortfolioLog.portfolio_id == portfolio_id, PortfolioLog.code == code)).scalar()
    p.delete()

def get_quantity(portfolio_id, code):
    d = PortfolioLog().query().filter(and_(PortfolioLog.portfolio_id == portfolio_id, PortfolioLog.code == code)).scalar()
    return d.number

## News Log

def add_news(date, code, news, score):
    log = NewsLog(date=date, code=code, news=news, score=score)
    log.save()

def get_news(code):
    news = NewsLog().query().filter(code==code)
    return news.all()


## Watchlist

def create_wl(user_id, code):
    wl = Watchlist(user_id=user_id, code=code)
    wl.save()
    return wl

def get_wl(user_id):
    wl = Watchlist().query().filter(Watchlist.user_id==user_id)
#     for l in wl.all():
#         print(l.__dict__)
    return wl.all()

# def get_wl_stock(user_id, code):
#     wl = Watchlist().query().filter(and_(Watchlist.user_id==user_id, Watchlist.code==code)).scalar()
#     return wl

def delete_wl(user_id, code):
    p = Watchlist().query().filter(and_(Watchlist.user_id == user_id, Watchlist.code == code)).scalar()
    p.delete()


def set_alerts(user_id, code, alert_high, alert_low, buy_high, buy_low, sell_high, sell_low):
    wl = Watchlist().query().filter(and_(Watchlist.user_id==user_id, Watchlist.code==code)).scalar()
    wl.alert_high = alert_high
    wl.alert_low = alert_low
    wl.buy_high = buy_high
    wl.buy_low = buy_low
    wl.sell_high = sell_high
    wl.sell_low = sell_low
    wl.save()

def update_alerts(user_id, code, alert_high, alert_low, buy_high, buy_low, sell_high, sell_low):
    wl = Watchlist().query().filter(and_(Watchlist.user_id==user_id, Watchlist.code==code)).scalar()
    wl.alert_high = alert_high
    wl.alert_low = alert_low
    wl.buy_high = buy_high
    wl.buy_low = buy_low
    wl.sell_high = sell_high
    wl.sell_low = sell_low
    wl.update()
    

## Functions for testing

def get_all_users():
    users = User().query()
#     for l in users.all():
#         print(l.__dict__)
    return users.all()

def get_all_portfolios():
    p = Portfolio().query()
    for l in p.all():
        print(l.__dict__)
    return p.all()

def get_all_pl():
    db = Db.instance()
    p = db.session.query(Company.code, PerformanceLog).join(PerformanceLog, PerformanceLog.code == Company.code)
    return p.all()
