#!/usr/bin/env python3

from pymongo import MongClient

# Connects to the MongoDB server
client = MongoClient('mongodb://localhost:1234/')

# Creates or switched to the 'user_database'
db = client['user_database']
