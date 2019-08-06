import time
import math
import warnings
import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
import talib as ta
from model import Company, StockLog, IndexLog, PerformanceLog
from model import start_engine
from datetime import date, datetime

%matplotlib inline
warnings.filterwarnings("ignore")

engine = start_engine()

# get all companies
engine = start_engine()
start = datetime.strptime('2008-07-01', '%Y-%m-%d').date()
companies = Company().query().all()

def update_last_ticks(companies='all', engine=engine):
    CSV = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY'\
          '&interval=1min'\
          '&outputsize=full'\
          '&datatype=csv'\
          '&apikey=B2S8XKGQNA9PKVS0'\
          '&symbol='
    
    if not engine:
        engine = start_engine()
    
    if companies == 'all':
        companies = Company().query().all()
    else:
        company_list = []
        for code in companies:
            company_list.append(Company().query().get(code))
        companies = company_list

    for company in companies:
        stock = company.code
        print('Updating', stock)
        df = pd.read_csv(CSV + stock + '.AX', parse_dates=['timestamp'])
        df['timestamp'] = df['timestamp'].dt.tz_localize('Australia/Sydney')
        df['timestamp'] = df['timestamp'].dt.tz_convert(None)
        df['timestamp'] = df['timestamp'] + pd.Timedelta(days=1)
        df = df.loc[df['timestamp'].idxmax()]
        company.last_dt = df['timestamp'].to_pydatetime()
        company.last_tick = df['close']
        company.save()
        time.sleep(15)

update_last_ticks(companies='all')

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

table['code'] = table['code'].astype(str)
table['volume'] = table['volume'].astype(np.int64)
final_table = pd.DataFrame()
for idx in sorted(set(table.index)):
    print(idx)
    tmp = table[table.index == idx]
    tmp['rank'] = tmp['change_pct'].rank(ascending=False)
    final_table = final_table.append(tmp)