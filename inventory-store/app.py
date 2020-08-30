import flask
from flask import Flask, request
from flask_cors import CORS

from models.sales import Sales
from models.inventory import Inventory

app = Flask(__name__)
CORS(app)

@app.route("/api/inventory", methods=['POST'])
def api_inventory_create():
  req_args = request.get_json()
  if req_args is None:
    req_args = request.args
  print(req_args)
  return Inventory().create(req_args)

@app.route("/api/inventory/<inventory_id>", methods=['GET'])
def api_inventory_get(inventory_id):
  return Inventory().get(inventory_id)

@app.route("/api/sales/<inventory_id>", methods=['POST'])
def api_inventory_buy(inventory_id):
  Inventory().buy(inventory_id)
  Sales().buy(inventory_id)
  return Inventory().get(inventory_id)

@app.route("/api/sales/<inventory_id>", methods=['GET'])
def api_inventory_sales(inventory_id):
  return Sales().get(inventory_id)

@app.route("/api/inventory", methods=['GET'])
def api_inventory_get_all():
  return Inventory().get_all()

@app.route("/api/inventory/<inventory_id>", methods=['PUT'])
def api_inventory_update(inventory_id):
  req_args = request.get_json()
  if req_args is None:
    req_args = request.args
  return Inventory().update(inventory_id, req_args)

@app.route("/api/inventory/<inventory_id>", methods=['DELETE'])
def api_inventory_delete(inventory_id):
  return Inventory().delete(inventory_id)

if __name__ == "__main__":
  app.run(debug=True)