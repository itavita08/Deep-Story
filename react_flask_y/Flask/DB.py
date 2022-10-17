from elasticsearch import Elasticsearch
from datetime import datetime

es = Elasticsearch()

def saveData(text):
    doc ={
        'text': text,
    }

