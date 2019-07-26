import pandas as pd
from model import Company, StockLog
from datetime import datetime

CSV = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED'\
      '&outputsize=full'\
      '&datatype=csv'\
      '&apikey=OW4NZBLAQU5EBFEV'\
      '&symbol='

def get_stock_log(code, csv_path=CSV):
    df = pd.read_csv(csv_path + code + '.AX',
                     usecols=[0, 1, 2, 3, 4, 5, 6],
                     parse_dates=['timestamp'])
    return df

def update_stock_log(code, df):
    for idx, row in df.iterrows():
        date = row['timestamp'].date()
        stock_log = StockLog().query().get((date, code))
        if not stock_log:
            stock_log = StockLog()
            stock_log.date = row['timestamp']
            stock_log.code = code   
            stock_log.save()     
        stock_log.opening = row['open']
        stock_log.high = row['high']
        stock_log.low = row['low']
        stock_log.closing = row['close']
        stock_log.adjusted = row['adjusted_close']
        stock_log.volume = row['volume']        
        stock_log.update()

def update_all_stock():
    companies = Company().query().all()
    for company in companies:
        code = company.code
        df = get_stock_log(code)
        update_stock_log(code, df)
        # print(code)
