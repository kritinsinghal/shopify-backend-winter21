import json
from google.cloud import firestore

filename = 'credentials.json'
db = firestore.Client.from_service_account_json(filename)
collection = db.collection("Inventory")

class Search():
    def index(self):
        resp = collection.stream()
        index = {}
        for doc in resp:
            doc_dict = doc.to_dict()
            name = doc_dict['name']
            name_words = name.split(" ")
            for word in name_words:
                if word not in index.keys():
                    index[word] = {}
                index[word][doc.id] = 1
            
        batch = db.batch()
        for key, val in index.items():
            param = {}
            param['index'] = list(val.keys())
            search_db = db.collection(u'Search_Index').document(key)
            batch.set(search_db, param)
        batch.commit()

        
        

        