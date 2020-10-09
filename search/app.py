import flask
from flask import Flask, request, jsonify
from flask_cors import CORS

from search import Search

app = Flask(__name__)
CORS(app)

@app.route("/search/index", methods=['POST'])
def search_index(*args, **kwargs):
  Search().index()
  resp = {}
  resp["status"] = "success"
  return jsonify(resp)

if __name__ == "__main__":
  app.run(debug=True)