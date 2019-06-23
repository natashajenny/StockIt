import sqlalchemy as db

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, ForeignKey, Integer, String, Date, Numeric, Timestamp

USER  = "comp3900"
PASS  = "comp9900"
HOST  = "portfolio.c6khp9ert7ew.us-east-1.rds.amazonaws.com"
DBASE = "portfolio"
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
    hash = Column('hash', String, nullable=False)
    salt = Column('salt', String, nullable=False)
    name = Column('name', String)
    dob = Column('dob', Date)
    gender = Column('gender', String)
    email = Column('email', String)
    phone = Column('phone', String)
    balance = Column('balance', Numeric)

class Portfolio(Base):
    __tablename__ = 'portfolios'
    portfolio_id = Column('portfolio_id', Integer, primary_key=True)
    user_id = Column('user_id', Integer, ForeignKey("User.user_id"), nullable=False)
    title = Column('title', String, nullable=False)
    description = Column('description', String)
    net_gain = Column('net_gain', Numeric)
    created_on = Column('created_on', Timestamp
    deleted_on = Column('deleted_on', Timestamp)
