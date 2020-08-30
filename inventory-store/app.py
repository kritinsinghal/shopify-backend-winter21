import flask
from flask import Flask, request
from flask_cors import CORS

from models.sales import Sales
from models.inventory import Inventory
from models.auth import Auth, verify_api

app = Flask(__name__)
CORS(app)


@app.route("/api/key", methods=['GET'])
def api_auth_get():
  return Auth().get()

@app.route("/api/inventory", methods=['POST'])
@verify_api()
def api_inventory_create(*args, **kwargs):
  req_args = request.get_json()
  if req_args is None:
    req_args = request.args
  return Inventory().create(req_args)

@app.route("/api/inventory/<inventory_id>", methods=['GET'])
@verify_api()
def api_inventory_get(*args, **kwargs):
  inventory_id = kwargs.get('inventory_id')
  return Inventory().get(inventory_id)

@app.route("/api/sales/<inventory_id>", methods=['POST'])
@verify_api()
def api_inventory_buy(*args, **kwargs):
  print(kwargs)
  inventory_id = kwargs.get('inventory_id')
  Inventory().buy(inventory_id)
  Sales().buy(inventory_id)
  return Inventory().get(inventory_id)

@app.route("/api/sales/<inventory_id>", methods=['GET'])
@verify_api()
def api_inventory_sales(*args, **kwargs):
  inventory_id = kwargs.get('inventory_id')
  return Sales().get(inventory_id)

@app.route("/api/inventory", methods=['GET'])
@verify_api()
def api_inventory_get_all(*args, **kwargs):
  return Inventory().get_all()

@app.route("/api/inventory/<inventory_id>", methods=['PUT'])
@verify_api()
def api_inventory_update(*args, **kwargs):
  inventory_id = kwargs.get('inventory_id')
  req_args = request.get_json()
  if req_args is None:
    req_args = request.args
  return Inventory().update(inventory_id, req_args)

@app.route("/api/inventory/delete/<inventory_id>", methods=['POST'])
@verify_api()
def api_inventory_delete(*args, **kwargs):
  inventory_id = kwargs.get('inventory_id')
  return Inventory().delete(inventory_id)

if __name__ == "__main__":
  app.run(debug=True)