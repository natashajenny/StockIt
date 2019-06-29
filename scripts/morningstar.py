import pandas as pd

def get_report(code):
    df_list = pd.read_excel('../data/financial/%s.xlsx' % code.lower(), sheet_name=None)
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
            df = pd.concat([df, df_list[sheet]])
    df = df.drop_duplicates(subset='Item', keep='first')       
    df.set_index('Item', inplace=True)
    para_map = [
        ('revenue', 'Total Revenue Excluding Interest'),
        ('expenses', 'Operating Expenses'),
        ('ebitda', 'EBITDA'),
        ('ebit', 'EBIT'),
        ('profit', 'PreTax Profit'),
        ('npataa', 'Reported NPAT After Abnormals'),
        ('assets', 'Total Assets'),
        ('liabilities', 'Total Liabilities'),
        ('operating_cash', 'Net Operating Cashflows'),
        ('investing_cash', 'Net Investing Cashflows'),
        ('financing_cash', 'Net Financing Cashflows'),
        ('shares', 'Shares Outstand. (EOP)'),
        ('eps', 'EPS Aft. Abs.'),
        ('dps', 'DPS - Adj.'),
        ('net_dividend', 'Total Div - Inc. Special'),
        ('gross_dividend', 'Total Gross Div- Inc.Spec'),
        ('net_yield', 'Dividend Yield (%)'),
        ('gross_yield', 'Gross Div. Yield (%)'),
        ('dividend_cover', 'Dividend Cover (%)'),
        ('total_equity', 'Total Equity'),
        ('total_debt', 'Total Gross Debt'),
        ('invested_capital', 'Total Capital Invested'),
        ('working_capital', 'Working Capital'),
        ('gross_investment', 'Gross Investment'),
        ('noplat', 'NOPLAT'),
        ('profit_margin', 'Net Profit Margin (%)'),
        ('ebit_margin', 'EBIT Margin (%)'),
        ('ebita_margin', 'EBITA Margin (%)'),
        ('ebitda_margin', 'EBITDA Margin (%)'),
        ('roe', 'ROE (%)'),
        ('roa', 'ROA (%)'),
        ('roic', 'ROIC (%)'),
        ('noplat_margin', 'NOPLAT Margin (%)'),
        ('capital_turnover', 'Invested Capital Turnover'),
        ('inventory_turnover', 'Inventory Turnover'),
        ('asset_turnover', 'Asset Turnover'),
        ('ppe_turnover', 'PPE Turnover'),
        ('depreciation_ppe', 'Depreciation/PP&E (%)'),
        ('depreciation_revenue', 'Depreciation/Revenue (%)'),
        ('wkg_capital_revenue', 'Wkg Capital/Revenue (%)'),
        ('wkg_capital_turnover', 'Working Cap Turnover'),
        ('financial_leverage', 'Financial Leverage'),
        ('gross_gearing', 'Gross Gearing (D/E) (%)'),
        ('net_gearing', 'Net Gearing (%)'),
        ('interest_cover', 'Net Interest Cover'),
        ('current_ratio', 'Current Ratio'),
        ('quick_ratio', 'Quick Ratio'),
        ('gorss_debt_cf', 'Gross Debt/CF'),
        ('net_debt_cf', 'Net Debt/CF'),
        ('nta_ps', 'NTA per Share ($)'),
        ('bv_ps', 'BV per Share ($)'),
        ('cash_ps', 'Cash per Share ($)'),
        ('days_inventory', 'Days Inventory'),
        ('days_receivable', 'Days Receivables'),
        ('days_payable', 'Days Payables'),
        ('cf_ps', 'Gross CF per Share ($)'),
        ('sales_ps', 'Sales per Share ($)'),
        ('share_price', 'Year End Share Price'),
        ('market_cap', 'Market Cap.'),
        ('market_cap', 'Market Cap'),
        ('net_debt', 'Net Debt'),
        ('ev', 'Enterprise Value'),
        ('ev_ebitda', 'EV/EBITDA'),
        ('ev_ebit', 'EV/EBIT'),
        ('market_cap_npat', 'Market Cap./Rep NPAT'),
        ('market_cap_revenue', 'Market Cap./Trading Rev.'),
        ('price_book_value', 'Price/Book Value'),
        ('price_book_value', 'Price/BV'),
        ('price_cash_flow', 'Price/Gross Cash Flow'),
        ('per', 'PER'),
        ('cash_assset', 'Cash (%)'),
        ('trade_asset', 'Trade Debtors (%)'),
        ('inventory_asset', 'Inventory (%)'),
        ('equipment_asset', 'Plant & Equipment (%)'),
        ('intangible_asset', 'Intangibles (%)'),
        ('goodwill_asset', 'Goodwill (%)'),
        ('nci_asset', 'Non Current Investments (%)'),
        ('other_asset', 'Other (%)'),
        ('interest_income', 'Interest Income'),
        ('non_interest_income', 'Non Interest Income'),
        ('interest_expense', 'Interest Expense'),
        ('non_interest_expense', 'Non Interest Expense'),
        ('interest_margin', 'Net Interest Margin (%)'),
        ('spread', 'Spread'),
        ('non_interest_total', 'Non Interest/Tot.Income (%)')
    ]
    for col in df.columns[2:3]:
        for (field, idx) in para_map:
            if idx in df.index:
                val = df.loc[idx, col]
                #print(idx, val)
            else:
                print(idx)

get_report('IAG')
