#!/usr/bin/env python
# coding: utf-8

import time
import math
import warnings
import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
import talib as ta
from model import Company, StockLog, IndexLog, PerformanceLog, TestTable
from model import start_engine
from datetime import date, datetime

def get_table():
    # get all companies
    engine = start_engine()
    start = datetime.strptime('2008-07-01', '%Y-%m-%d').date()
    companies = Company().query().all()
    company_diff =  ['ALX', 'AZJ', 'CAR']
    diff = [c for c in companies if c.code not in company_diff]
    companies = diff
    table = pd.DataFrame()
    for company in companies:
        print('Processing', company.code)
        # get stock data
        stock_log = StockLog().query().filter((StockLog.company==company) & (StockLog.date >= start))
        df = pd.read_sql(stock_log.statement, engine)
        df.sort_values(by='date', inplace=True)
        df.set_index('date', inplace=True)
        df.drop(df[df.closing == 0].index, inplace=True)    
        # calculate techincal indicators
        df['change'] = df['closing'].diff(1)
        df['change_pct'] = df['closing'].pct_change(1)
        for period in [15, 50, 200]:
            df['sma%d' % period] = ta.SMA(df['closing'], timeperiod=period)
        for period in [15, 50, 200]:
            df['ema%d' % period] = ta.EMA(df['closing'], timeperiod=period)  
        df['macd'], df['macd_sig'], df['macd_hist']  = ta.MACD(df['closing'], fastperiod=12, slowperiod=26, signalperiod=9)
        df['bb_hi'], df['bb_mid'], df['bb_lo'] = ta.BBANDS(df['closing'], timeperiod=20, nbdevup=2, nbdevdn=2, matype=0)
        df['slowk'], df['slowd'] = ta.STOCH(df['high'], df['low'], df['closing'], fastk_period=14, slowk_period=3, slowk_matype=0, slowd_period=3, slowd_matype=0)
        df['rsi'] = ta.RSI(df['closing'], timeperiod=14)
        df['adx'] = ta.ADX(df['high'], df['low'], df['closing'], timeperiod=14)
        df['cci'] = ta.CCI(df['high'], df['low'], df['closing'], timeperiod=14)
        df['aroon_dn'], df['aroon_up'] = ta.AROON(df['high'], df['low'], timeperiod=25)
        df['chaikin'] = ta.AD(df['high'], df['low'], df['closing'], df['volume'])
        df['obv'] = ta.OBV(df['closing'], df['volume'])
        df['mom'] = ta.MOM(df['closing'], timeperiod=10)
        # read annual reports
        perf_log = PerformanceLog().query().filter(PerformanceLog.company==company)
        fi = pd.read_sql(perf_log.statement, engine)
        fi.set_index('date', inplace=True)
        # Price to EPS Ratio
        eps = fi['eps']
        df = df.merge(eps, how='outer', left_index=True, right_index=True)
        df['eps'].interpolate(method='pad', inplace=True)
        df['pe_ratio'] = df.apply(lambda x: x['closing'] / x['eps'], axis=1)
        df.drop(['eps'], axis=1, inplace=True)
        # Dividend to Price Ratio (Dividend Yield)
        dividend = fi['net_dividend']
        df = df.merge(dividend, how='outer', left_index=True, right_index=True)
        df['net_dividend'].interpolate(method='pad', inplace=True)
        df['dp_ratio'] = df.apply(lambda x: x['net_dividend'] / x['closing'], axis=1)
        df.drop(['net_dividend'], axis=1, inplace=True)    
        # Price to Book Ratio
        bvps = fi['bv_ps']
        df = df.merge(bvps, how='outer', left_index=True, right_index=True)
        df['bv_ps'].interpolate(method='pad', inplace=True)
        df['pb_ratio'] = df.apply(lambda x: x['closing'] / x['bv_ps'], axis=1)
        df.drop(['bv_ps'], axis=1, inplace=True)    
        # clean up
        df.dropna(subset=['opening'], inplace=True)
        table = table.append(df)
        # write to DB
        # df.set_index('code', append=True, inplace=True) 
        # df.to_sql('test_table', engine, if_exists='append')
    # table['code'] = table['code'].astype(str)
    # table['volume'] = table['volume'].astype(np.int64)
    return table

def get_final_table(table):
    final_table = pd.DataFrame()
    for idx in sorted(set(table.index)):
        print(idx)
        tmp = table[table.index == idx]
        tmp['rank'] = tmp['change_pct'].rank(ascending=False)
        final_table = final_table.append(tmp)
    # final_table.set_index('code', append=True, inplace=True) 
    return final_table

def insert_data(final_table):
    import sqlalchemy.orm as orm
    engine = start_engine()
    Session = orm.sessionmaker()
    Session.configure(bind=engine)
    sess = Session()
    sess.bulk_insert_mappings(TestTable, final_table.to_dict(orient="records"))
