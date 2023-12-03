# flask create web app, request access incoming request data, jsonify convert Python dictionaries to JSON format
from flask import Flask, request, jsonify
# handle Cross-Origin HTTP requests, react and flask backend running on different domains
from flask_cors import CORS
from flask_cors import cross_origin
# pymongo: MongoDB driver for python
from pymongo import MongoClient
# helps with JSON serialization for MongoDB documents
from bson import json_util
# hash passwords
from flask_bcrypt import Bcrypt
from pymongo.server_api import ServerApi

# creates flask application instance, __name__ = name of current python module
app = Flask(__name__)
# enable CORES for flask app, allows frontend (react) to make requests to the backend (flask)
# CORS(app)

# user = plannova_user, password = PlanNova!333
mongo_uri = "mongodb+srv://plannova_user:PlanNova333@plannova.2teaqsx.mongodb.net/?retryWrites=true&w=majority"
# connect mongodb server to connection string
client = MongoClient(mongo_uri, tlsAllowInvalidCertificates=True)
# uri = "mongodb+srv://plannova.2teaqsx.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority"
# client = MongoClient(uri, tlsAllowInvalidCertificates=True)
# define db and collection
db = client["user_authentication"]
collection = db["login_page"]


@app.route("/login", methods=["POST"])
@cross_origin()
def login():
    # get json data from request
    data = request.get_json()

    # get user and password from data
    user = data.get("user")
    password = data.get("password")

    # search collection and check if user is present
    user = collection.find_one({"username": user, "password": password})

    # if user in db
    if user:
        # return success is true and user info
        response = {
            "success": True,
            "user": json_util.dumps(user)
        }
    # user not in db
    else:
        # return success is false
        response = {
            "success": False
        }

    return jsonify(response)

if __name__ == "__main__":
    app.run(debug=True)
