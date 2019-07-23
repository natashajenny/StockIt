import datetime
from model import *
from sqlalchemy import and_, between, func, desc
from sqlalchemy.sql import exists

## User

# Create and save a new user
def create_user(login, password, name, email, phone):
    user = User(login=login, password=password, name=name, email=email, phone=phone, balance=0)
    user.save()
    return user

def delete_user(user_id):
    print(user_id)
    user = User().query().get(user_id)
    user.delete()

def find_user(user_id):
    return User().query().get(user_id)

# Returns a list of this user's portfolio objects
def get_portfolios(user_id):
    portfolios = Portfolio().query().filter(Portfolio.user_id==user_id)
    print(portfolios)
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


## Stock Log

def get_stock_log(date, code):
    log = StockLog().query().filter(and_(StockLog.code==code, StockLog.date==date)).all()
    return log.all()

## Performance Log

def get_summary():
    db = Db.instance()
    subq = db.session.query(PerformanceLog.code, func.max(PerformanceLog.year).label('maxyear')).group_by(PerformanceLog.code).subquery('t2')
    q = db.session.query(PerformanceLog).\
    join(subq, and_(PerformanceLog.code == subq.c.code, PerformanceLog.year == subq.c.maxyear))
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



## Portfolio Log

def get_logs(portfolio_id):
    db = Db.instance()

    subq = db.session.query(StockLog.code, func.max(StockLog.date).label('recentdate')).group_by(StockLog.code).subquery('t2')

    q = db.session.query(StockLog).\
        join(PortfolioLog, StockLog.code == PortfolioLog.code).\
        join(subq, StockLog.date == subq.c.recentdate).\
        filter(PortfolioLog.portfolio_id==portfolio_id)

    return q.all()
#     for l in q.all():
#         print(l.__dict__)


def get_logs_limit(portfolio_id, start_date, end_date):
    log = PortfolioLog().query().filter(and_(portfolio_id==portfolio_id, datetime.between(start_date, end_date)))
    return log.all()

def save_log(portfolio_id, code, number):
    p = PortfolioLog(datetime=datetime.now(), portfolio_id=portfolio_id, code=code, number=number)
    p.save()

def update_log(portfolio_id, code, number):
    p = PortfolioLog().query().filter(and_(PortfolioLog.portfolio_id == portfolio_id, PortfolioLog.code == code)).scalar()
    p.number = number
    p.update()

def delete_log(portfolio_id, code):
    p = PortfolioLog().query().filter(and_(PortfolioLog.portfolio_id == portfolio_id, PortfolioLog.code == code)).scalar()
    p.delete()


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
    for l in wl.all():
        print(l.__dict__)
#     return wl.all()

def delete_wl(user_id, code):
    p = Watchlist().query().filter(and_(Watchlist.user_id == user_id, Watchlist.code == code)).scalar()
    p.delete()


def set_alerts(user_id, code, alert_high, alert_low, buy_high, buy_low, sell_high, sell_low):
    wl = Watchlist().query().filter(and_(Watchlist.user_id==user_id, Watchlist.code==code))
    wl.alert_high = alert_high
    wl.alert_low = alert_low
    wl.buy_high = buy_high
    wl.buy_low = buy_low
    wl.sell_high = sell_high
    wl.sell_low = sell_low
    wl.save()

def update_alerts(user_id, code, alert_high, alert_low, buy_high, buy_low, sell_high, sell_low):
    wl = Watchlist().query().filter(and_(Watchlist.user_id==user_id, Watchlist.code==code))
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
#     for l in p.all():
#         print(l.__dict__)
    return p.all()

def get_all_pl():
    db = Db.instance()
    p = db.session.query(Company.code, PerformanceLog).join(PerformanceLog, PerformanceLog.code == Company.code)
    return p.all()
