import pandas as pd
from model import Company

CSV = 'https://www.asx100list.com/uploads/csv/20190601-asx100.csv '

def get_companies(csv_path=CSV):
    df = pd.read_csv(csv_path,
                     skiprows=1,
                     usecols=[0, 1, 2],
                     header=0,
                     names=['code', 'name', 'sector'])
    return(df)

def update_companies(df):
    for idx, row in df.iterrows():
        company = Company().query().get(row['code'])
        if not company:
            company = Company()
            company.code = row['code']
            company.save()
        company.name=row['name']
        company.sector=row['sector'])
        company.update()            
