from pandas import concat, read_excel
from model import Company, PerformanceLog
from decimal import Decimal, getcontext
from datetime import datetime, timedelta
from calendar import monthrange
from para_map import para_map

def get_report(code):
    df_list = read_excel('../data/financial/%s.xlsx' % code.lower(), sheet_name=None)
    sheet_list = ['Profit Loss',
                  'Balance Sheet',
                  'Cash Flow',
                  'Per Share Statisticts',
                  'Sundry Analysis',
                  'Ratio Analysis',
                  'Asset Base Analysis']
    df = df_list[sheet_list[0]]
    for sheet in sheet_list[1:]:
        if sheet in df_list:
            df = concat([df, df_list[sheet]])
    df = df.drop_duplicates(subset='Item', keep='first')       
    df.set_index('Item', inplace=True)
    getcontext().prec = 4
    for col in df.columns[2:]:
        day = datetime.strptime(col, '%m/%y')
        last_day = monthrange(day.year, day.month)[1]
        day = day + timedelta(days=last_day-1)
        day = day.date()
        perf_log = PerformanceLog(date=day, code=code)
        for (field, idx) in para_map:
            if idx in df.index:
                value = df.loc[idx, col]
                if value == '--':
                    value = None
                if value and '%' in idx:
                    value = Decimal(value)
                    value /= 100
                setattr(perf_log, field, value)
        perf_log.save()

companies = Company().query().all()
for company in companies:
    print(company.code, '=============================================')
    get_report(company.code)

