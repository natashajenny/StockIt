import base64
import copy
import PIL
import warnings
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.dates as mdates
import seaborn as sns
from model import *
from datetime import date, datetime
from io import BytesIO
import plotly as py
import plotly.graph_objs as go

warnings.filterwarnings("ignore")
sns.set()

engine = start_engine()

def get_plot(
    stocks = [],                # list of stocks 
    indicies = [],              # list of fundamental indicies
    size = (12, 4),             # graph (length, height)
    start = '2019-06-01',       # start date in 'YYYY-MM-DD' format
    finish = None,              # finish date in 'YYYY-MM-DD' format
    title = None,               # graph title
    change = False,             # daily percentage change
    norm = 'mean',              # normalization method: mean, minmax
    micro = False,              # micro plot
    engine = engine,
    # observations
    opening = False,
    high = False,
    low = False,
    closing = False,
    adjusted = False,
    volume = False,
    # technicals
    sma15 = False,
    sma50 = False,
    sma200 = False,
    ema15 = False,
    ema50 = False,
    ema200 = False,
    macd = False,
    bb = False,
    stoch = False,
    rsi = False,
    adx = False,
    cci = False,
    aroon = False,
    chaikin = False,
    obv = False,
    mom = False,
    # fundamentals
    pe_ratio = False,
    dp_ratio = False,
    pb_ratio = False):
    
    if (len(stocks) == 0) and (len(indicies) == 0):
        raise Exception('Empty list')
    
    if not engine:
        engine = start_engine()

    (x, y) = size
    if not micro:
        plt.figure(figsize=(x, y), dpi=100)

    start = datetime.strptime(start, '%Y-%m-%d').date()
    if finish:
        finish = datetime.strptime(finish, '%Y-%m-%d').date()
    else:
        finish = datetime.today()        
     
    companies = [Company().query().get(stock) for stock in stocks]
    for company in companies:
        stock_log = StockLog().query().filter((StockLog.company == company) &
                                               (StockLog.date >= start) &
                                               (StockLog.date <= finish))
        df = pd.read_sql(stock_log.statement, engine)
        df.sort_values(by='date', inplace=True)
        df.set_index('date', inplace=True)
        if len(companies) > 1:
            if norm == 'minmax':
                df['closing'] = (df['closing'] - df['closing'].min()) / (df['closing'].max() - df['closing'].min())
            else:
                df['closing'] = (df['closing'] - df['closing'].mean()) / df['closing'].std()
            plt.plot(df.index.values, df['closing'], label='Closing of %s'% company.code)  

    if opening:
        plt.plot(df.index.values, df['opening'], label='Opening of %s' % company.code)
    if high:
        plt.plot(df.index.values, df['high'], label='High of %s' % company.code)
    if low:
        plt.plot(df.index.values, df['low'], label='Low of %s' % company.code)
    if closing:
        plt.plot(df.index.values, df['closing'], label='Closing of %s' % company.code)        
    if adjusted:
        plt.plot(df.index.values, df['adjusted'], label='Adjusted close of %s' % company.code)
    if change:
        df['change_pct'] = df['change_pct'] * 100
        plt.plot(df.index.values, df['change_pct'], label='Change in percent of %s' % company.code)  
        plt.axhline(y=0.0, color='r', linestyle='--')
    if sma15:
        plt.plot(df.index.values, df['sma15'], linestyle='--', label='SMA15 of %s' % company.code)
    if sma50:
        plt.plot(df.index.values, df['sma50'], linestyle='--', label='SMA50 of %s' % company.code)
    if sma200:
        plt.plot(df.index.values, df['sma200'], linestyle='--', label='SMA200 of %s' % company.code)        
    if ema15:
        plt.plot(df.index.values, df['ema15'], linestyle='--', label='EMA15 of %s' % company.code)
    if ema50:
        plt.plot(df.index.values, df['ema50'], linestyle='--', label='EMA50 of %s' % company.code)
    if ema200:
        plt.plot(df.index.values, df['ema200'], linestyle='--', label='EMA200 of %s' % company.code) 
    if macd:
        plt.plot(df.index.values, df['macd'], label='MACD of %s' % company.code)
        plt.plot(df.index.values, df['macd_sig'], label='Signal of %s' % company.code)
        plt.bar(df.index.values, df['macd_hist'], color='green', linewidth=1, edgecolor='green')
        plt.axhline(y=0.0, color='r', linestyle='--')
    if bb:
        plt.plot(df.index.values, df['closing'], c='r', label='Closing of %s' % company.code)   
        plt.plot(df.index.values, df['bb_hi'], c='c', linestyle='--', label='BB Hi of %s' % company.code)
        plt.plot(df.index.values, df['bb_lo'], c='c', linestyle='--', label='BB Lo of %s' % company.code)
        plt.fill_between(df.index.values, df['bb_lo'], df['bb_hi'], alpha=0.25)
    if stoch:
        plt.plot(df.index.values, df['slowk'], label='Slow K of %s' % company.code)
        plt.plot(df.index.values, df['slowd'], label='Slow D of %s' % company.code)
        plt.axhline(y=80, c='r', linestyle='--')
        plt.axhline(y=20, c='r', linestyle='--')
        plt.ylim(0, 100)
    if rsi:
        plt.plot(df.index.values, df['rsi'], label='RSI of %s' % company.code) 
        plt.axhline(y=70, c='r', linestyle='--')
        plt.axhline(y=30, c='r', linestyle='--')   
        plt.ylim(0, 100)
    if adx:
        plt.plot(df.index.values, df['adx'], label='ADX of %s' % company.code)         
        plt.axhline(y=25, c='r', linestyle='--')   
        plt.ylim(0, 100)
    if cci:
        plt.plot(df.index.values, df['cci'], label='CCI of %s' % company.code)         
        plt.axhline(y=100, c='r', linestyle='--')
        plt.axhline(y=-100, c='r', linestyle='--')         
    if aroon:
        plt.plot(df.index.values, df['aroon_up'], label='Aroon Up  of %s' % company.code)  
        plt.plot(df.index.values, df['aroon_dn'], label='Aroon Down of %s' % company.code)  
        plt.ylim(0, 100)
    if chaikin:
        plt.plot(df.index.values, df['chaikin'], label='Chaikin A/D  of %s' % company.code)  
        plt.axhline(y=0, c='r', linestyle='--')
    if obv:
        plt.plot(df.index.values, df['obv'], label='OBV of %s' % company.code)  
    if mom:
        plt.plot(df.index.values, df['mom'], label='Momentum of %s' % company.code)  
        plt.axhline(y=0, c='r', linestyle='--')
    if pe_ratio:
        df['pe_ratio'] = df['pe_ratio'] * 100
        plt.plot(df.index.values, df['pe_ratio'], label='Price-to-Earnings Ratio of %s' % company.code) 
    if dp_ratio:
        plt.plot(df.index.values, df['dp_ratio'], label='Dividend Yield of %s' % company.code) 
    if pb_ratio:
        plt.plot(df.index.values, df['pb_ratio'], label='Price-to-BV Ratio of %s' % company.code)
    if micro:
        plt.figure(figsize=(1, 0.33), dpi=100)
        plt.xticks([])
        plt.yticks([])
        plt.axis('off')
        df['micro'] = (df['closing'] - df['closing'].mean()) / df['closing'].std()
        plt.plot(df.index.values, df['micro'])          
        plt.axhline(y=0, c='r', linewidth=1, linestyle='--')  
    if volume:
        plt.bar(df.index.values, df['volume'], color='green', label='Volume of %s' % company.code, linewidth=1, edgecolor='green')
        
    if len(indicies) > 0:
        index_log = IndexLog().query().filter((IndexLog.date >= start) & (IndexLog.date <= finish) & (IndexLog.index.in_(indicies)))
        fi = pd.read_sql(index_log.statement, engine)
        for idx in indicies:
            new = fi.loc[fi['index'] == idx]
            new = new.rename(columns={'value': idx})
            new.sort_values(by='date', inplace=True)
            new.set_index('date', inplace=True)
            new.drop(new.columns[[0]], axis=1, inplace=True)
            if norm == 'minmix':
                new[idx] = (new[idx] - new[idx].min) / (new[idx].max() - new[idx].min())
            else:
                new[idx] = (new[idx] - new[idx].mean()) / new[idx].std()
            plt.plot(new.index.values, new[idx], label='%s index' % idx.capitalize())
        # if len(companies) > 0:
        #     if norm == 'minmax':
        #         df['closing'] = (df['closing'] - df['closing'].min()) / (df['closing'].max() - df['closing'].min())
        #     else:
        #         df['closing'] = (df['closing'] - df['closing'].mean()) / df['closing'].std()
        #     plt.plot(df.index.values, df['closing'], label='Closing of %s'% company.code)  

    if not micro:
        plt.legend()

    fig_file = BytesIO()
    plt.savefig(fig_file, format='png')
    fig_file.seek(0)
    fig_png = base64.b64encode(fig_file.getvalue())
    result = str(fig_png)[2:-1]
    fig_file.close()
    plt.close()
    return result

def get_corr(
    stocks = [],                # list of stocks 
    indicies = [],              # list of fundamental indicies
    sector = None,
    size = (8, 8),              # graph (length, height)
    start = '2009-07-01',       # start date in 'YYYY-MM-DD' format
    finish = None,              # finish date in 'YYYY-MM-DD' format
    title = None,               # graph title
    engine = engine):
    
    if (len(stocks) == 0) and (len(indicies) == 0) and not sector:
        raise Exception('Empty list')

    
    if not engine:
        engine = start_engine()

    (x, y) = size
    plt.figure(figsize=(x, y), dpi=100)
      
    start = datetime.strptime(start, '%Y-%m-%d').date()
    if finish:
        finish = datetime.strptime(finish, '%Y-%m-%d').date()
    else:
        finish = datetime.today()        
     
    table = pd.DataFrame()
    if sector:
        companies = Company().query().filter(Company.sector == sector).all()
    else:
        companies = [Company().query().get(stock) for stock in stocks]
    for company in companies:
        stock_log = StockLog().query().filter((StockLog.company == company) &
                                              (StockLog.date >= start) &
                                              (StockLog.date <= finish))
        df = pd.read_sql(stock_log.statement, engine)
        df.sort_values(by='date', inplace=True)
        df.set_index('date', inplace=True)
        df.rename(columns={'closing': company.code}, inplace=True)
        table = table.merge(df[company.code], how='outer', left_index=True, right_index=True)
    corr = table.corr()
    sns.heatmap(corr, cmap='coolwarm', center=0, square=True, linewidths=.5, cbar_kws={"shrink": .5})
    fig_file = BytesIO()
    plt.savefig(fig_file, format='png')
    plt.close()
    fig_file.seek(0)
    fig_png = base64.b64encode(fig_file.getvalue())
    result = str(fig_png)[2:-1]
    fig_file.close()
    return result

def get_intraday_graph(stocks, norm=None, size=(12,8), engine=engine):
    CSV = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY'\
          '&interval=1min'\
          '&outputsize=full'\
          '&datatype=csv'\
          '&apikey=OW4NZBLAQU5EBFEV'\
          '&symbol='
    
    if len(stocks) > 5:
        raise Exception("Only 5 stocks supported")
    if not engine:
        engine = start_engine()

    (x, y) = size
    fig = plt.figure(figsize=(x, y), dpi=100)
    ax = fig.add_subplot()

    for stock in stocks:
        df = pd.read_csv(CSV+stock+'.AX', parse_dates=['timestamp'])
        df['timestamp'] = df['timestamp'].dt.tz_localize('Australia/Sydney')
        df['timestamp'] = df['timestamp'].dt.tz_convert(None)
        cut_off = max(df['timestamp']).date()
        df = df[df['timestamp'] > cut_off]
        cut_off += pd.Timedelta(days=1)
        if norm == 'minmax':
            df['close'] = (df['close'] - df['close'].min()) / (df['close'].max() - df['close'].min())
        elif norm == 'mean':
            df['close'] = (df['close'] - df['close'].mean()) / df['close'].std()
        plt.plot(df['timestamp'], df['close'], label='%s Stock Price'% stock) 

    ax.xaxis.set_major_formatter(mdates.DateFormatter('%H:%M'))
    plt.legend()

    fig_file = BytesIO()
    plt.savefig(fig_file, format='png')
    plt.close()
    fig_file.seek(0)
    fig_png = base64.b64encode(fig_file.getvalue())
    result = str(fig_png)[2:-1]
    fig_file.close()
    return result


def get_intraday_candle(stocks, norm=None, size=(12,4), engine=engine):
    CSV = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY'\
          '&interval=1min'\
          '&outputsize=full'\
          '&datatype=csv'\
          '&apikey=OW4NZBLAQU5EBFEV'\
          '&symbol='
    
    if len(stocks) > 5:
        raise Exception("Only 5 stocks supported")
    
    if not engine:
        engine = start_engine()
        
    colors = [
        ['red', 'green'],
        ['blue', 'yellow'],
        ['cyan', 'gray'],
        ['magenta', 'orange'],
        ['pink', 'purple']       
    ]        
        
    fig = go.Figure()
    for stock in stocks:
        (col1, col2) = colors.pop(0)
        df = pd.read_csv(CSV+stock+'.AX', parse_dates=['timestamp'])
        df['timestamp'] = df['timestamp'].dt.tz_localize('Australia/Sydney')
        df['timestamp'] = df['timestamp'].dt.tz_convert(None)
        cut_off = max(df['timestamp']).date()
        df = df[df['timestamp'] > cut_off]
        cut_off += pd.Timedelta(days=1)
        trace = go.Candlestick(x=df['timestamp'],
                               open=df['open'],
                               high=df['high'],
                               low=df['low'],
                               close=df['close'],
                               increasing_line_color=col1,
                               decreasing_line_color=col2,
                               name=stock)
        fig.add_trace(trace)
    fig.update_layout(xaxis_rangeslider_visible=False)

    fig_file = BytesIO()
    fig.write_image(fig_file, format='png')
    fig_file.seek(0)
    fig_png = base64.b64encode(fig_file.getvalue())
    result = str(fig_png)[2:-1]
    fig_file.close()
    return result

def get_prediction(stock, start='2019-06-01', size=(12,4), engine=engine):
    if not engine:
        engine = start_engine()
    start = datetime.strptime(start, '%Y-%m-%d').date()
    (x, y) = size
    
    company = Company().query().get(stock)
    predictions = Prediction().query().filter(Prediction.code == stock)
    sls = StockLog().query().filter(StockLog.code == company.code, StockLog.date >= start)
    pr = pd.read_sql(predictions.statement, engine)
    sl = pd.read_sql(sls.statement, engine)
    sl = sl[['date', 'closing']]
    pr = pr[['date', 'prediction']]
    df = sl.merge(pr, how='outer', left_on='date', right_on='date')
    
    first_prediction = df['prediction'].first_valid_index()
    last_prediction = df['prediction'].last_valid_index()
    last_closing = df['closing'].last_valid_index()

    df['prediction'][:last_closing] = np.NaN        
    
    if last_closing != 0:
        df['prediction'][last_closing] = df['closing'][last_closing] 

    fig, ax = plt.subplots(figsize=(x, y))
    if (first_prediction != 0): 
        plt.plot(df['date'], df['closing'], label='Historic Stock Price')
    plt.plot(df['date'], df['prediction'], label='Predicted Stock Price')
    plt.legend()

    fig_file = BytesIO()
    plt.savefig(fig_file, format='png')
    fig_file.seek(0)
    fig_png = base64.b64encode(fig_file.getvalue())
    result = str(fig_png)[2:-1]
    fig_file.close()
    plt.close()
    return [result, df['prediction'][last_prediction]]
