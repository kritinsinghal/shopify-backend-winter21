import json
import uuid
from google.cloud import firestore
from helper import response_helper

filename = 'credentials.json'
db = firestore.Client.from_service_account_json(filename)
collection = db.collection("Sales")

class Sales():
    def create(self, req_args):
        resp = {}
        resp["inventory_id"] = req_args.get("inventory_id")
        resp["sold"] = "0"
        resp["price"] = req_args.get("price")
        resp["value"] = "0"
        r = collection.document(resp["inventory_id"]).set(resp)
        return response_helper.success(resp)

    def get(self, inventory_id):
        resp = {}
        resp["data"] = collection.document(inventory_id).get().to_dict()
        return response_helper.success(resp)
    
    def buy(self, inventory_id):
        resp = collection.document(inventory_id).get().to_dict()
        if resp is None:
            return None
        resp["sold"] = str(int(resp["sold"]) + 1)
        resp["value"] = str(int(resp["value"]) + int(resp["price"]))
        r = collection.document(inventory_id).set(resp)
        return response_helper.success(resp)
    
    def update_price(self, inventory_id, price):
        resp = {}
        resp["price"] = price
        collection.document(inventory_id).update(resp)
        return response_helper.success(resp)

    def delete(self, inventory_id):
        resp = {}
        collection.document(inventory_id).delete()
        return response_helper.success(resp)