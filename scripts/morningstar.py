import pandas as pd

def get_report(code):
    df = pd.read_excel('../data/financial/abc.xlsx', sheet_name=None)
    print(df)

get_report('ABC')


# col
# cyb
