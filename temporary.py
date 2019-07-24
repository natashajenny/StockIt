companies = {}
with open('ASXListedCompanies.csv', 'r') as f:
    lines = f.readlines()
    for i in range(3, len(lines)):
        data = lines[i].split(',', 2)
        name = data[0][1:-1]
        code = data[1][1:-1]
        desc = data[2][1:-1]
        companies[code] = [name, desc]

data = [
    { 'label': 'ABC', 'value': 'ADELAIDE BRIGHTON LIMITED' },
    { 'label': 'AGL', 'value': 'AGL ENERGY LIMITED' },
    { 'label': 'ALQ', 'value': 'ALS LIMITED' },
    { 'label': 'ALU', 'value': 'ALTIUM LIMITED' },
    { 'label': 'AWC', 'value': 'ALUMINA LIMITED' },
    { 'label': 'AMC', 'value': 'AMCOR PLC' },
    { 'label': 'AMP' },
    { 'label': 'ANN' },
    { 'label': 'ANZ' },
    { 'label': 'APA' },
    { 'label': 'ALL' },
    { 'label': 'ASX' },
    { 'label': 'ALX' },
    { 'label': 'AZJ' },
    { 'label': 'AST' },
    { 'label': 'BOQ' },
    { 'label': 'BEN' },
    { 'label': 'BHP' },
    { 'label': 'BSL' },
    { 'label': 'BLD' },
    { 'label': 'BXB' },
    { 'label': 'CTX' },
    { 'label': 'CAR' },
    { 'label': 'CGF' },
    { 'label': 'CHC' },
    { 'label': 'CIM' },
    { 'label': 'IAG' },
    { 'label': 'CWY' },
    { 'label': 'CCL' },
    { 'label': 'COH' },
    { 'label': 'CBA' },
    { 'label': 'CWN' },
    { 'label': 'CPU' },
    { 'label': 'CSL' },
    { 'label': 'DXS' },
    { 'label': 'DMP' },
    { 'label': 'DOW' },
    { 'label': 'EVN' },
    { 'label': 'FLT' },
    { 'label': 'FMG' },
    { 'label': 'GMG' },
    { 'label': 'GPT' },
    { 'label': 'ILU' },
    { 'label': 'IPL' },
    { 'label': 'JHX' },
    { 'label': 'JHG' },
    { 'label': 'JBH' },
    { 'label': 'MQG' },
    { 'label': 'MFG' },
    { 'label': 'MGR' },
    { 'label': 'NAB' },
    { 'label': 'NCM' },
    { 'label': 'NST' },
    { 'label': 'OSH' },
    { 'label': 'ORI' },
    { 'label': 'ORG' },
    { 'label': 'OZL' },
    { 'label': 'PDL' },
    { 'label': 'QAN' },
    { 'label': 'QBE' },
    { 'label': 'QUB' },
    { 'label': 'RHC' },
    { 'label': 'REA' },
    { 'label': 'RMD' },
    { 'label': 'RIO' },
    { 'label': 'STO' },
    { 'label': 'SEK' },
    { 'label': 'SHL' },
    { 'label': 'SOL' },
    { 'label': 'SGP' },
    { 'label': 'SYD' },
    { 'label': 'TAH' },
    { 'label': 'TLS' },
    { 'label': 'TPM' },
    { 'label': 'TCL' },
    { 'label': 'WES' },
    { 'label': 'WBC' },
    { 'label': 'WHC' },
    { 'label': 'WPL' },
    { 'label': 'WOW' },
    { 'label': 'WOR' }
]

with open('output.txt', 'w+') as f:
    f.write('[\n')
    for d in data:
        code = d['label']
        f.write("    { label: '")
        f.write(code)
        f.write("', value: '")
        f.write(companies[code][0])
        f.write("' },\n")
        # f.write("    { a\: \'{}\', value\: \'{}\' }".format(code, companies[code][0]))

    f.write(']\n')
    print('Ok')