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
    lst_dt = Column('lst_dt', DateTime(timezone=True))
    last_tick = Column('last_tick', Float)

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
    dps = Column('dps', Float)
    gross_dividend = Column('gross_dividend', Float)
    # cdy = Column('cdy', Float)
    roe = Column('roe', Float)
    roa = Column('roa', Float)
    profit_margin = Column('profit_margin', Float)
    interest_cover = Column('interest_cover', Float)
    net_gearing = Column('net_gearing', Float)
    asset_turnover = Column('asset_turnover', Float)
    inventory_turnover = Column('inventory_turnover', Float)
    ebitda = Column('ebitda', Float)
    ebit = Column('ebit', Float)
    npataa = Column('npataa', Float)
    operating_cash = Column('operating_cash', Float)
    investing_cash = Column('investing_cash', Float)
    financing_cash = Column('financing_cash', Float)
    shares = Column('shares', Float)
    net_dividend = Column('net_dividend', Float)
    net_yield = Column('net_yield', Float)
    gross_yield = Column('gross_yield', Float)
    dividend_cover = Column('dividend_cover', Float)
    total_equity = Column('total_equity', Float)
    total_debt = Column('total_debt', Float)
    invested_capital = Column('invested_capital', Float)
    working_capital = Column('working_capital', Float)
    gross_investment = Column('gross_investment', Float)
    noplat = Column('noplat', Float)
    ebit_margin = Column('ebit_margin', Float)
    ebita_margin = Column('ebita_margin', Float)
    ebitda_margin = Column('ebitda_margin', Float)
    roic = Column('roic', Float)
    noplat_margin = Column('noplat_margin', Float)
    capital_turnover = Column('capital_turnover', Float)
    ppe_turnover = Column('ppe_turnover', Float)
    depreciation_ppe = Column('depreciation_ppe', Float)
    depreciation_revenue = Column('depreciation_revenue', Float)
    wkg_capital_revenue = Column('wkg_capital_revenue', Float)
    wkg_capital_turnover = Column('wkg_capital_turnover', Float)
    financial_leverage = Column('financial_leverage', Float)
    gross_gearing = Column('gross_gearing', Float)
    current_ratio = Column('current_ratio', Float)
    quick_ratio = Column('quick_ratio', Float)
    gross_debt_cf = Column('gross_debt_cf', Float)
    net_debt_cf = Column('net_debt_cf', Float)
    nta_ps = Column('nta_ps', Float)
    bv_ps = Column('bv_ps', Float)
    cash_ps = Column('cash_ps', Float)
    days_inventory = Column('days_inventory', Float)
    days_receivables = Column('days_receivables', Float)
    days_payables = Column('days_payables', Float)
    cf_ps = Column('cf_ps', Float)
    sales_ps = Column('sales_ps', Float)
    share_price = Column('share_price', Float)
    market_cap = Column('market_cap', Float)
    net_debt = Column('net_debt', Float)
    ev = Column('ev', Float)
    ev_ebit = Column('ev_ebit', Float)
    ev_ebitda = Column('ev_ebitda', Float)
    market_cap_npat = Column('market_cap_npat', Float)
    market_cap_revenue = Column('market_cap_revenue', Float)
    price_book_value = Column('price_book_value', Float)
    price_cash_flow = Column('price_cash_flow', Float)
    per = Column('per', Float)
    cash_asset = Column('cash_asset', Float)
    trade_asset = Column('trade_asset', Float)
    inventory_asset = Column('inventory_asset', Float)
    equipment_asset = Column('equipment_asset', Float)
    intangible_asset = Column('intangible_asset', Float)
    goodwill_asset = Column('goodwill_asset', Float)
    nci_asset = Column('nci_asset', Float)
    other_asset = Column('other_asset', Float)
    interest_income = Column('interest_income', Float)
    non_interest_income = Column('non_interest_income', Float)
    interest_expense = Column('interest_expense', Float)
    non_interest_expense = Column('non_interest_expense', Float)
    interest_margin = Column('interest_margin', Float)
    spread = Column('spread', Float)
    non_interest_total = Column('non_interest_total', Float)
    abnormals = Column('abnormals', Float)
    pretax_profit = Column('pretax_profit', Float)
    claims_ratio = Column('claims_ratio', Float)
    expense_ratio = Column('expense_ratio', Float)
    profitability = Column('profitability', Float)
    solvency = Column('solvency', Float)
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

class TestTable(Model, Base):
    __tablename__ = 'test_table'
    date = Column('date', Date, primary_key=True)
    code = Column('code', String(3), ForeignKey("companies.code"), primary_key=True)
    opening = Column('opening', Float)
    high = Column('high', Float)
    low = Column('low', Float)
    closing = Column('closing', Float)
    adjusted = Column('adjusted', Float)
    change = Column('change', Float)
    change_pct = Column('change_pct', Float)
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
    rank = Column('rank', Integer)
    company = relationship('Company', backref='test_table')    
  
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
    
class IndexLog(Model, Base):
    __tablename__ = 'index_logs'
    date = Column('date', Date, primary_key=True)
    index = Column('index', String, primary_key=True)
    value = Column('value', Float)
