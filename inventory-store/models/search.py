import json
from functools import reduce

from google.cloud import firestore

from helper import response_helper

filename = 'credentials.json'
db = firestore.Client.from_service_account_json(filename)
collection = db.collection("Search_Index")

class Search():
    def query(self, query):
        words = query.split(" ")
        indexes = []
        for word in words:
            word = word.lower()
            doc = collection.document(word).get().to_dict()
            if doc is not None:
                indexes.append(doc['index'])
        
        resp = {}
        resp['index'] = reduce(lambda x, y: list(set(x).intersection(set(y))), indexes)
        return response_helper.success(resp) 

        
        

        