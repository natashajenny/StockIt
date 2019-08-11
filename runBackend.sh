#!/bin/sh
cd src/backend
FLASK_APP=$PWD/app/http/api/endpoints.py FLASK_ENV=development python3 -m flask run --port 4000