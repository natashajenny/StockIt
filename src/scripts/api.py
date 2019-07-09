import matplotlib.pyplot as plt
import pandas as pd
import plotly as py
import plotly.graph_objs as go

from model import Company, StockLog
from model import start_engine

engine = start_engine()
company = Company().query().get('ABC')
stock_log = StockLog().query().filter(StockLog.company==company)
df = pd.read_sql(stock_log.statement, engine)

#df.plot(kind='line', x='date', y='opening')
#plt.show()

trace = go.Candlestick(x=df['date'],
                      open=df['opening'],
                      high=df['high'],
                      low=df['low'],
                      close=df['closing'])
data = [trace]
py.offline.plot(data, filename='ABC-candlestick')
