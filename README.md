# Stock It Portfolio Management System
Stock It is a stock portfolio management system which allows users to create multiple portfolios for their stock investments, watchlist for potential investments, as well as view a prediction model to guide them in investing.

Out stock portfolio management system consists of three main components:
* a user facing web application designed to provide basic portfolio management functionality for ASX Top 100 stocks;
* a set of server side data scraping and wrangling scripts for mining relevant stock financial data;
* a neural network stock forecasting model assisting users in their  decisions.


## Running our project:

### Frontend
> yarn install
> yarn build
> yarn start

### Backend
> cd capstone-project-scrubs/src/backend
> FLASK_APP=$PWD/app/http/api/endpoints.py FLASK_ENV=development python3 -m flask run --port 4000


## Source Code Structure
[ to - do ]


## Contributors
zID | Team Member | E-mail | Role
------------ | ------------ | ------------ | -------------
z5097492 | Alina Sari | a.sari@unsw.edu.au | SCRUM Master, Front-end Developer
z5124648 | Ian Ethan Wong | ianwwl@gmail.com | Front-end Developer
z5141492 | Natasha Jenny | n.jenny@student.unsw.edu.au | Back-end Developer
z3152502 | Yaroslav Akimov | y.akimov@student.unsw.edu.au | Data Scientist, Back-end Developer


