from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

mongo_uri = "mongodb+srv://plannova_user:PlanNova333@plannova.2teaqsx.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(mongo_uri, tlsAllowInvalidCertificates=True)
db = client["user_authentication"]
collection = db["login_page"]

@app.route("/register", methods=["POST"])
@cross_origin()
def register():
    data = request.get_json()

    user = data.get("user")
    password = data.get("password")

    # Check if user already exists
    existing_user = collection.find_one({"username": user})
    if existing_user:
        return jsonify({"success": False, "message": "User already exists."}), 400

    # Insert new user into the database
    new_user = {"username": user, "password": password}
    collection.insert_one(new_user)

    return jsonify({"success": True, "message": "User created successfully."}), 201

if __name__ == "__main__":
    app.run(debug=True)
