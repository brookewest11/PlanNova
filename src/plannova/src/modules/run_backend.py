# flask create web app, request access incoming request data, jsonify convert Python dictionaries to JSON format
from flask import Flask, request, jsonify, session, redirect
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
from flask_session import Session

# creates flask application instance, __name__ = name of current python module
app = Flask(__name__)
# enable CORES for flask app, allows frontend (react) to make requests to the backend (flask)
CORS(app, supports_credentials=True)
app.secret_key = 'your_secret_key'
app.config['SESSION_COOKIE_SECURE'] = True

# user = plannova_user, password = PlanNova!333
mongo_uri = "mongodb+srv://plannova_user:PlanNova333@plannova.2teaqsx.mongodb.net/?retryWrites=true&w=majority"
# connect mongodb server to connection string
client = MongoClient(mongo_uri, tlsAllowInvalidCertificates=True)
# define db and collection
authentication_db = client["user_authentication"]
authentication_collection = authentication_db["login_page"]

list_db = client["list_database"]
list_collection = list_db["list_collection"]

@app.route("/login", methods=["POST"])
@cross_origin(supports_credentials=True)
def login():
    # get json data from request
    data = request.get_json()

    # get user and password from data
    user = data.get("user")
    password = data.get("password")

    # search collection and check if user is present
    user = authentication_collection.find_one({"username": user, "password": password})

    # if user in db
    if user:
        session['user_id'] = str(user['_id'])
        user_id = session['user_id']
        print(f"login user id: {user_id}")
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

    jsonify_response = jsonify(response)

    return jsonify_response

@app.route("/register", methods=["POST"])
@cross_origin(supports_credentials=True)
def register():
    data = request.get_json()

    user = data.get("user")
    password = data.get("password")

    # Check if user already exists
    existing_user = authentication_collection.find_one({"username": user})
    if existing_user:
        return jsonify({"success": False, "message": "User already exists."}), 400

    # Insert new user into the database
    new_user = {"username": user, "password": password}
    authentication_collection.insert_one(new_user)

    return jsonify({"success": True, "message": "User created successfully."}), 201

@app.route("/update-lists", methods=["POST"])
@cross_origin(supports_credentials=True)
def update_lists():
    data = request.get_json()

    user_id = session['user_id']
    print(f"list user id: {user_id}")
    if not user_id:
        return jsonify({"success": False, "message": "User not logged in."}), 401

    updated_lists = data.get("lists")

    # update list if present, insert list of not present
    list_collection.replace_one({"_id": user_id}, {"lists": updated_lists}, upsert=True)

    return jsonify({"success": True, "message": "Lists updated successfully."}), 200

if __name__ == "__main__":
    app.run(debug=True)