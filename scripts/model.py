from datetime import datetime
#from secrets import token_bytes
from sqlalchemy import create_engine
from sqlalchemy import Column, ForeignKey, MetaData
from sqlalchemy import Date, DateTime, Float, Integer, Numeric, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import backref, relationship, sessionmaker

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
    date = Column('date', Date, primary_key=True)
    code = Column('code', String(3), ForeignKey("companies.code"), primary_key=True)
    revenue = Column('revenue', Numeric)
    expenses = Column('expenses', Numeric)
    ebitda = Column('ebitda', Numeric)
    ebit = Column('ebit', Numeric)
    profit = Column('profit', Numeric)
    npataa = Column('npataa', Numeric)
    assets = Column('assets', Numeric)
    liabilities = Column('liabilities', Numeric)
    operating_cash = Column('operating_cash', Numeric)
    investing_cash = Column('investing_cash', Numeric)
    financing_cash = Column('financing_cash', Numeric)
    shares = Column('shares', Numeric)
    eps = Column('eps', Numeric)
    dps = Column('dps', Numeric)
    net_dividend = Column('net_dividend', Numeric)
    gross_dividend = Column('gross_dividend', Numeric)
    net_yield = Column('net_yield', Numeric)
    gross_yield = Column('gross_yield', Numeric)
    dividend_cover = Column('dividend_cover', Numeric)
    total_equity = Column('total_equity', Numeric)
    total_debt = Column('total_debt', Numeric)
    invested_capital = Column('invested_capital', Numeric)
    working_capital = Column('working_capital', Numeric)
    gross_investment = Column('gross_investment', Numeric)
    noplat = Column('noplat', Numeric)
    profit_margin = Column('profit_margin', Numeric)
    ebit_margin = Column('ebit_margin', Numeric)
    ebita_margin = Column('ebita_margin', Numeric)
    ebitda_margin = Column('ebitda_margin', Numeric)
    roe = Column('roe', Numeric)
    roa = Column('roa', Numeric)
    roic = Column('roic', Numeric)
    noplat_margin = Column('noplat_margin', Numeric)
    capital_turnover = Column('capital_turnover', Numeric)
    inventory_turnover = Column('inventory_turnover', Numeric)
    asset_turnover = Column('asset_turnover', Numeric)
    ppe_turnover = Column('ppe_turnover', Numeric)
    depreciation_ppe = Column('depreciation_ppe', Numeric)
    depreciation_revenue = Column('depreciation_revenue', Numeric)
    wkg_capital_revenue = Column('wkg_capital_revenue', Numeric)
    wkg_capital_turnover = Column('wkg_capital_turnover', Numeric)
    financial_leverage = Column('financial_leverage', Numeric)
    gross_gearing = Column('gross_gearing', Numeric)
    net_gearing = Column('net_gearing', Numeric)
    interest_cover = Column('interest_cover', Numeric)
    current_ratio = Column('current_ratio', Numeric)
    quick_ratio = Column('quick_ratio', Numeric)
    gross_debt_cf = Column('gross_debt_cf', Numeric)
    net_debt_cf = Column('net_debt_cf', Numeric)
    nta_ps = Column('nta_ps', Numeric)
    bv_ps = Column('bv_ps', Numeric)
    cash_ps = Column('cash_ps', Numeric)
    days_inventory = Column('days_inventory', Numeric)
    days_receivables = Column('days_receivables', Numeric)
    days_payables = Column('days_payables', Numeric)
    cf_ps = Column('cf_ps', Numeric)
    sales_ps = Column('sales_ps', Numeric)
    share_price = Column('share_price', Numeric)
    market_cap = Column('market_cap', Numeric)
    net_debt = Column('net_debt', Numeric)
    ev = Column('ev', Numeric)
    ev_ebit = Column('ev_ebit', Numeric)
    ev_ebitda = Column('ev_ebitda', Numeric)
    market_cap_npat = Column('market_cap_npat', Numeric)
    market_cap_revenue = Column('market_cap_revenue', Numeric)
    price_book_value = Column('price_book_value', Numeric)
    price_cash_flow = Column('price_cash_flow', Numeric)
    per = Column('per', Numeric)
    cash_asset = Column('cash_asset', Numeric)
    trade_asset = Column('trade_asset', Numeric)
    inventory_asset = Column('inventory_asset', Numeric)
    equipment_asset = Column('equipment_asset', Numeric)
    intangible_asset = Column('intangible_asset', Numeric)
    goodwill_asset = Column('goodwill_asset', Numeric)
    nci_asset = Column('nci_asset', Numeric)
    other_asset = Column('other_asset', Numeric)
    interest_income = Column('interest_income', Numeric)
    non_interest_income = Column('non_interest_income', Numeric)
    interest_expense = Column('interest_expense', Numeric)
    non_interest_expense = Column('non_interest_expense', Numeric)
    interest_margin = Column('interest_margin', Numeric)
    spread = Column('spread', Numeric)
    non_interest_total = Column('non_interest_total', Numeric)
    abnormals = Column('abnormals', Numeric)
    pretax_profit = Column('pretax_profit', Numeric)
    claims_ratio = Column('claims_ratio', Numeric)
    expense_ratio = Column('expense_ratio', Numeric)
    profitability = Column('profitability', Numeric)
    solvency = Column('solvency', Numeric)
    company = relationship('Company', backref='performance_logs')

class PortfolioLog(Model, Base):
    __tablename__ = 'portfolio_logs'
    datetime = Column('datetime', DateTime(timezone=True), primary_key=True)
    portfolio_id = Column('portfolio_id', Integer, ForeignKey("portfolios.portfolio_id"),
                           primary_key=True)
    code = Column('code', String(3), ForeignKey("companies.code"), primary_key=True)
    number = Column('number', Integer, nullable=False)

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
    
class IndexLog(Model, Base):
    __tablename__ = 'index_logs'
    date = Column('date', Date, primary_key=True)
    index = Column('index', String, primary_key=True)
    value = Column('value', Numeric)


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
