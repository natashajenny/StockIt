import pandas as pd

def get_report(code):
    df_list = pd.read_excel('../data/financial/%s.xlsx' % code.lower(), sheet_name=None)
    df = pd.concat([df_list['Profit Loss'],
    			    df_list['Balance Sheet'],
    			    df_list['Cash Flow'],
    			    df_list['Per Share Statisticts'],
    			    # df_list['Sundry Analysis'],
    			    df_list['Ratio Analysis'],
    			    df_list['Asset Base Analysis']])

    print(df)
    
get_report('CBA')

# Profit Loss
# Balance Sheet
# Cash Flow
# Per Share Statisticts
# Revenue Expense
# Sundry Analysis
# Growth Rates
# Ratio Analysis
# Asset Base Analysis





# col
# cyb
# dlx
# lnk
# mpl

# nec
# ora
# rwc
# scg
# s32

# ski
# sun
# a2m
# sgr
# twe

# urw
# vcx
# xro
