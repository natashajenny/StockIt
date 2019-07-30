import secrets
from datetime import datetime
from sqlalchemy import create_engine
from sqlalchemy import Column, ForeignKey, MetaData
from sqlalchemy import Date, DateTime, Float, Integer, Float, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import backref, relationship, sessionmaker
from flask_login import UserMixin

USER  = 'comp3900'
PASS  = 'comp9900'
HOST  = 'portfolio.c6khp9ert7ew.us-east-1.rds.amazonaws.com'
DBASE = 'portfolio'
TEST  = False

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

class User(Model, Base, UserMixin):
    __tablename__ = 'users'
    user_id = Column('user_id', Integer, primary_key=True)
    login = Column('login', String, nullable=False)
    password = Column('password', String, nullable=False)
    salt = Column('salt', String, nullable=False, default=secrets.token_bytes(16))
    name = Column('name', String)
    dob = Column('dob', Date)
    gender = Column('gender', String(1))
    email = Column('email', String)
    phone = Column('phone', String)
    balance = Column('balance', Float)

    def get_id(self):
        return self.user_id

class Portfolio(Model, Base):
    __tablename__ = 'portfolios'
    portfolio_id = Column('portfolio_id', Integer, primary_key=True)
    user_id = Column('user_id', Integer, ForeignKey("users.user_id"), nullable=False)
    title = Column('title', String, nullable=False)
    description = Column('description', String)
    net_gain = Column('net_gain', Float)
    created_on = Column('created_on', DateTime(timezone=True))
    deleted_on = Column('deleted_on', DateTime(timezone=True))
    user = relationship('User', backref='portfolios')

class Company(Model, Base):
    __tablename__ = 'companies'
    code = Column('code', String(3), primary_key=True)
    name = Column('name', String, nullable=False)
    sector = Column('sector', String)
    # industry = Column('industry', String)
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
    revenue = Column('revenue', Float)
    expenses = Column('expenses', Float)
    profit = Column('profit', Float)
    assets = Column('assets', Float)
    liabilities = Column('liabilities', Float)
    eps = Column('eps', Float)
    gross_dividend = Column('gross_dividend', Float)
    # cdy = Column('cdy', Float)
    roe = Column('roe', Float)
    roa = Column('roa', Float)
    profit_margin = Column('profit_margin', Float)
    interest_cover = Column('interest_cover', Float)
    net_gearing = Column('net_gearing', Float)
    asset_turnover = Column('asset_turnover', Float)
    inventory_turnover = Column('inventory_turnover', Float)
    company = relationship('Company', backref='performance_logs')

class PortfolioLog(Model, Base):
    __tablename__ = 'portfolio_logs'
    datetime = Column('datetime', DateTime(timezone=True), primary_key=True)
    portfolio_id = Column('portfolio_id', Integer, ForeignKey("portfolios.portfolio_id"),
                           primary_key=True)
    code = Column('code', String(3), ForeignKey("companies.code"), primary_key=True)
    number = Column('number', Integer, nullable=False)
    bought_price = Column('bought_price', Float, nullable=False)

class StockLog(Model, Base):
    __tablename__ = 'stock_logs'
    date = Column('date', Date, primary_key=True)
    code = Column('code', String(3), ForeignKey("companies.code"), primary_key=True)
    opening = Column('opening', Float)
    high = Column('high', Float)
    low = Column('low', Float)
    closing = Column('closing', Float)
    adjusted = Column('adjusted', Float)
    volume = Column('volume', Integer)    
    sma15 = Column('sma15', Float)
    sma50 = Column('sma50', Float)
    sma200 = Column('sma200', Float)
    ema15 = Column('ema15', Float)
    ema50 = Column('ema50', Float)
    ema200 = Column('ema200', Float)    
    macd = Column('macd', Float)
    macd_sig = Column('macd_sig', Float)
    macd_hist = Column('macd_hist', Float)
    bb_hi = Column('bb_hi', Float)
    bb_mid = Column('bb_mid', Float)
    bb_lo = Column('bb_lo', Float)
    slowk = Column('slowk', Float)
    slowd = Column('slowd', Float)
    rsi = Column('rsi', Float)
    adx = Column('adx', Float)
    cci = Column('cci', Float)
    aroon_dn = Column('aroon_dn', Float)
    aroon_up = Column('aroon_up', Float)
    chaikin = Column('chaikin', Float)
    obv = Column('obv', Float)
    mom = Column('mom', Float)    
    pe_ratio = Column('pe_ratio', Float)
    dp_ratio = Column('dp_ratio', Float)
    pb_ratio = Column('pb_ratio', Float)    
    prediction = Column('prediction', Float)
    change = Column('change', Float)
    change_pct = Column('change_pct', Float)        
    rank = Column('rank', Integer)
    company = relationship('Company', backref='stock_logs')
  
class Watchlist(Model, Base):
    __tablename__ = 'watchlists'
    user_id = Column('user_id', Integer, ForeignKey("users.user_id"), primary_key=True)    
    code = Column('code', String(3), ForeignKey("companies.code"), primary_key=True)
    alert_high = Column('alert_high', Float)
    alert_low = Column('alert_low', Float)
    buy_high = Column('buy_high', Float)
    buy_low = Column('buy_low', Float)
    sell_high = Column('sell_high', Float)
    sell_low = Column('sell_low', Float)
    company = relationship('Company', backref='watchlists')
    
