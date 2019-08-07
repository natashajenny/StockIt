import time
import math
import warnings
import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
# import talib as ta
from functions import *
from model import Company, StockLog, IndexLog, PerformanceLog
from model import start_engine
from datetime import date, datetime

warnings.filterwarnings("ignore")

def update_last_ticks(companies):
    engine = start_engine()
    start = datetime.strptime('2008-07-01', '%Y-%m-%d').date()

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
            company_list.append(get_company(code))
        companies = company_list

    for company in companies:
        stock = company.code
        # print('Updating', stock)
        df = pd.read_csv(CSV + stock + '.AX', parse_dates=['timestamp'])
        df['timestamp'] = df['timestamp'].dt.tz_localize('Australia/Sydney')
        df['timestamp'] = df['timestamp'].dt.tz_convert(None)
        df['timestamp'] = df['timestamp'] + pd.Timedelta(days=1)
        df = df.loc[df['timestamp'].idxmax()]
        company.last_dt = df['timestamp'].to_pydatetime()
        company.last_tick = df['close']
        company.save()
        time.sleep(15)

