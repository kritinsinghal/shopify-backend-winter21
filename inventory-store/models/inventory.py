import json
import uuid
from google.cloud import firestore
from helper import response_helper
from models.sales import Sales

filename = 'credentials.json'
db = firestore.Client.from_service_account_json(filename)
collection = db.collection("Inventory")

class Inventory():
    def create(self, req_args):
        id = str(uuid.uuid4())
        resp = {}
        resp["inventory_id"] = id
        resp["name"] = req_args.get("name")
        resp["image"] = req_args.get("image")
        resp["qty"] = req_args.get("qty")
        resp["price"] = req_args.get("price")
        resp["discount"] = req_args.get("discount")
        r = collection.document(id).set(resp)
        Sales().create(resp)
        return response_helper.success(resp)
    
    def update(self, inventory_id, req_args):
        resp = {}
        resp["price"] = req_args.get("price")
        resp["qty"] = req_args.get("qty")
        resp["discount"] = req_args.get("discount")
        r = collection.document(inventory_id).update(resp)
        Sales().update_price(inventory_id, req_args.get("price"))
        return resp

    
    def get(self, inventory_id):
        resp = {}
        resp["data"] = collection.document(inventory_id).get().to_dict()
        return response_helper.success(resp)

    def buy(self, inventory_id):
        resp = collection.document(inventory_id).get().to_dict()
        resp["qty"] = str(int(resp["qty"])-1)
        r = collection.document(inventory_id).set(resp)
        return response_helper.success(resp)
    
    def get_all(self):
        resp = {}        
        resp["data"] = []
        all_inventory = collection.stream()
        for inv in all_inventory:
            resp["data"].append(inv.to_dict())
        return response_helper.success(resp)
    
    def delete(self, inventory_id):
        resp = {}
        collection.document(inventory_id).delete()
        Sales().delete(inventory_id)
        return response_helper.success(resp)