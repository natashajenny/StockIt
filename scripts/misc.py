from model import Company


codes = ["CYB", "DLX", "LNK", "MPL", "NEC", "ORA", "RWC", "SCG", "S32", "SKI", "SUN", "A2M", "SGR", "TWE", "URW", "VCX", "XRO"]

for code in codes:
	print('Deleteing ', code)
	company = Company().query().get(code)
	for stock_log in company.stock_logs:
		stock_log.delete()
	company.delete()
	print(code, ' deleted')
