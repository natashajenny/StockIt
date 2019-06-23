import sqlalchemy as db

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, ForeignKey
from sqlalchemy import Date, DateTime, Float, Integer, Numeric, String

USER  = 'comp3900'
PASS  = 'comp9900'
HOST  = 'portfolio.c6khp9ert7ew.us-east-1.rds.amazonaws.com'
DBASE = 'portfolio'
TEST  = True

try:
    eng = db.create_engine('postgresql://%s:%s@%s/%s' % (USER, PASS, HOST, DBASE), echo=TEST)
    con = eng.connect()
    meta = db.MetaData()
    con.close()
except:
    print('Ooops...')

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    user_id = Column('user_id', Integer, primary_key=True)
    login = Column('login', String, nullable=False)
    password = Column('password', String, nullable=False)
    salt = Column('salt', String, nullable=False)
    name = Column('name', String)
    dob = Column('dob', Date)
    gender = Column('gender', String(1))
    email = Column('email', String)
    phone = Column('phone', String)
    balance = Column('balance', Numeric)

class Portfolio(Base):
    __tablename__ = 'portfolios'
    portfolio_id = Column('portfolio_id', Integer, primary_key=True)
    user_id = Column('user_id', Integer, ForeignKey("users.user_id"), nullable=False)
    title = Column('title', String, nullable=False)
    description = Column('description', String)
    net_gain = Column('net_gain', Numeric)
    created_on = Column('created_on', DateTime(timezone=True))
    deleted_on = Column('deleted_on', DateTime(timezone=True))

class Company(Base):
    __tablename__ = 'companies'
    code = Column('code', String(3), primary_key=True)
    name = Column('name', String, nullable=False)
    sector = Column('sector', String)
    industry = Column('industry', String)
    listed_on = Column('listed_on', Date)
    summary = Column('summary', String)
    address = Column('address', String)
    phone = Column('phone', String)
    email = Column('email', String)
    website = Column('website', String)
    abn = Column('abn', String(11))
    directors = Column('directors', String)
    recommendation = Column('recommendation', String)

class EmissionLog(Base):
    __tablename__ = 'emission_logs'
    date = Column('date', Date, primary_key=True)
    code = Column('code', String(3), ForeignKey("companies.code"), primary_key=True)
    number = Column('number', Integer, nullable=False)

class NewsLog(Base):
    __tablename__ = 'news_logs'
    date = Column('date', Date, primary_key=True)
    code = Column('code', String(3), ForeignKey("companies.code"), primary_key=True)
    news = Column('news', String)
    score = Column('score', Float)

class PerformanceLog(Base):
    __tablename__ = 'performance_logs'
    year = Column('date', Date, primary_key=True)
    code = Column('code', String(3), ForeignKey("companies.code"), primary_key=True)
    revenue = Column('revenue', Numeric)
    expenses = Column('expenses', Numeric)
    profit = Column('profit', Numeric)
    assets = Column('assets', Numeric)
    liabilities = Column('liabilities', Numeric)
    eps = Column('eps', Numeric)
    dividend = Column('dividend', Numeric)
    cdy = Column('cdy', Float)
    roe = Column('roe', Float)
    gearing = Column('gearing', Float)

class PortfolioLog(Base):
    __tablename__ = 'portfolio_log'
    datetime = Column('datetime', DateTime(timezone=True), primary_key=True)
    portfolio_id = Column('portfolio_id', Integer, ForeignKey("portfolios.portfolio_id"),
                           primary_key=True)
    code = Column('code', String(3), ForeignKey("companies.code"), primary_key=True)
    number = Column('number', Integer, nullable=False)

class StockLog(Base):
    __tablename__ = 'stock_logs'
    date = Column('date', Date, primary_key=True)
    code = Column('code', String(3), ForeignKey("companies.code"), primary_key=True)
    start = Column('start', Numeric)
    high = Column('high', Numeric)
    low = Column('low', Numeric)
    close = Column('close', Numeric)
    adjusted = Column('adjusted', Numeric)
    volume = Column('volume', Integer)
    prediction = Column('prediction', Numeric)
    sma = Column('sma', Float)
    ema = Column('ema', Float)
    per = Column('per', Float)
    rank = Column('rank', Integer)
    cap = Column('cap', Numeric)
    
class Watchlist(Base):
    __tablename__ = 'watchlists'
    user_id = Column('user_id', Integer, ForeignKey("users.user_id"), primary_key=True)    
    code = Column('code', String(3), ForeignKey("companies.code"), primary_key=True)
    alert_high = Column('alert_high', Numeric)
    alert_low = Column('alert_low', Numeric)
    buy_high = Column('buy_high', Numeric)
    buy_low = Column('buy_low', Numeric)
    sell_high = Column('sell_high', Numeric)
    sell_low = Column('sell_low', Numeric)
