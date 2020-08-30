import json
import uuid
import datetime
from functools import wraps
from flask import request

from google.cloud import firestore
from helper import response_helper

filename = 'credentials.json'
db = firestore.Client.from_service_account_json(filename)
collection = db.collection("Auth")

def verify_api():
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            authenticated = False
            response = {}
            api_key = None
            if request.args.get('api_key'):
                api_key = request.args.get('api_key')
            elif request.form.get("api_key"):
                api_key = request.args.get('api_key')
            else:
                req_json = request.get_json()
                if req_json is not None:
                    api_key = req_json.get('api_key')
            
            if request.args.get('inventory_id'):
                inventory_id = request.args.get('inventory_id')
                response["inventory_id"] = inventory_id
                
            elif request.form.get("inventory_id"):
                inventory_id = request.args.get('inventory_id')
                response["inventory_id"] = inventory_id

            else:
                req_json = request.get_json()
                if req_json is not None:
                    inventory_id = req_json.get('inventory_id')
                    response["inventory_id"] = inventory_id
            
            if api_key is not None:
                check = Auth().check(api_key)
        
            if api_key is None or check == False:
                return response_helper.failure(response, "Invalid API Key")
            
            response["status"] = "success"
            
            response.update(kwargs)

            return f(*args, **response)

        return decorated_function

    return decorator


class Auth():
    def get(self):
        apiKey = str(uuid.uuid4())
        resp = {}
        resp["key"] = apiKey
        resp["timestamp"] = datetime.datetime.now()
        collection.document(apiKey).set(resp)
        return response_helper.success(resp)
    
    def check(self, key):
        doc = collection.document(key).get()
        if doc.to_dict() is None:
            return False
        return True
    
    

        