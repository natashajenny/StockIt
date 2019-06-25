from datetime import datetime
from secrets import token_bytes
from sqlalchemy import create_engine
from sqlalchemy import Column, ForeignKey, MetaData
from sqlalchemy import Date, DateTime, Float, Integer, Numeric, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

USER  = 'comp3900'
PASS  = 'comp9900'
HOST  = 'portfolio.c6khp9ert7ew.us-east-1.rds.amazonaws.com'
DBASE = 'portfolio'
TEST  = True

Base = declarative_base()

def start_engine(user=USER, pw=PASS, host=HOST, dbase=DBASE):
    connect_string = 'postgresql://%s:%s@%s/%s' % (user, pw, host, dbase)
    engine = create_engine(connect_string, echo=TEST)
    return engine

class Singleton(object):
    def __init__(self, decorated):
        self._decorated = decorated
    def instance(self, *args, **kwargs):
        try:
            return self._instance
        except AttributeError:
            self._instance = self._decorated(*args, **kwargs)
            return self._instance
    def __call__(self, *args, **kwargs):
        raise TypeError('Singletons must be accessed through the `Instance` method.')

@Singleton
class Db(object):
    engine = None
    session = None
    def __init__(self):
        self.engine = start_engine()
        Session = sessionmaker(bind=self.engine)
        self.session = Session()
    def instance(self, *args, **kwargs):
        pass

class Model():
    def save(self):
        db = Db.instance()
        db.session.add(self)
        db.session.commit()
    def update(self):
        db = Db.instance()
        db.session.commit()
    def delete(self):
        db = Db.instance()
        db.session.delete(self)
        db.session.commit()        
    def flush(self):
        db = Db.instance()
        db.session.flush()
    def query(self):
        db = Db.instance()
        return db.session.query(self.__class__)

class User(Model, Base):
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

class Portfolio(Model, Base):
    __tablename__ = 'portfolios'
    portfolio_id = Column('portfolio_id', Integer, primary_key=True)
    user_id = Column('user_id', Integer, ForeignKey("users.user_id"), nullable=False)
    title = Column('title', String, nullable=False)
    description = Column('description', String)
    net_gain = Column('net_gain', Numeric)
    created_on = Column('created_on', DateTime(timezone=True))
    deleted_on = Column('deleted_on', DateTime(timezone=True))

class Company(Model, Base):
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

class EmissionLog(Model, Base):
    __tablename__ = 'emission_logs'
    date = Column('date', Date, primary_key=True)
    code = Column('code', String(3), ForeignKey("companies.code"), primary_key=True)
    number = Column('number', Integer, nullable=False)

class NewsLog(Model, Base):
    __tablename__ = 'news_logs'
    date = Column('date', Date, primary_key=True)
    code = Column('code', String(3), ForeignKey("companies.code"), primary_key=True)
    news = Column('news', String)
    score = Column('score', Float)

class PerformanceLog(Model, Base):
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

class PortfolioLog(Model, Base):
    __tablename__ = 'portfolio_log'
    datetime = Column('datetime', DateTime(timezone=True), primary_key=True)
    portfolio_id = Column('portfolio_id', Integer, ForeignKey("portfolios.portfolio_id"),
                           primary_key=True)
    code = Column('code', String(3), ForeignKey("companies.code"), primary_key=True)
    number = Column('number', Integer, nullable=False)

class StockLog(Model, Base):
    __tablename__ = 'stock_logs'
    date = Column('date', Date, primary_key=True)
    code = Column('code', String(3), ForeignKey("companies.code"), primary_key=True)
    opening = Column('opening', Numeric)
    high = Column('high', Numeric)
    low = Column('low', Numeric)
    closing = Column('closing', Numeric)
    adjusted = Column('adjusted', Numeric)
    volume = Column('volume', Integer)
    prediction = Column('prediction', Numeric)
    sma = Column('sma', Float)
    ema = Column('ema', Float)
    per = Column('per', Float)
    rank = Column('rank', Integer)
    cap = Column('cap', Numeric)
  
class Watchlist(Model, Base):
    __tablename__ = 'watchlists'
    user_id = Column('user_id', Integer, ForeignKey("users.user_id"), primary_key=True)    
    code = Column('code', String(3), ForeignKey("companies.code"), primary_key=True)
    alert_high = Column('alert_high', Numeric)
    alert_low = Column('alert_low', Numeric)
    buy_high = Column('buy_high', Numeric)
    buy_low = Column('buy_low', Numeric)
    sell_high = Column('sell_high', Numeric)
    sell_low = Column('sell_low', Numeric)
