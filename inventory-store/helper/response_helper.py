from flask import jsonify

def success(resp):
    resp["status"] = "success"
    resp["code"] = 200
    return jsonify(resp)

def failure(resp, err = ""):
    resp["status"] = "failure"
    resp["code"] = 400
    resp["error"] = err
    return jsonify(resp)