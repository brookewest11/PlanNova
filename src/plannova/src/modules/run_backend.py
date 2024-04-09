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
CORS(app, supports_credentials=True, origins='http://localhost:3000')
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

mealplan_db = client["meal_database"]
mealplan_collection = mealplan_db["meal_collection"]

homepage_db = client["homepage_database"]
homepage_collection = homepage_db["homepage_collection"]

fitness_db = client["fitness_database"]
fitness_collection = fitness_db["fitness_collection"]

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
    insert_result = authentication_collection.insert_one(new_user)
    user_id = insert_result.inserted_id
    session['user_id'] = str(user_id)
    user_id = session['user_id']
    print(f"register user id: {user_id}")

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

@app.route("/get-user-lists", methods=["GET"])
@cross_origin(supports_credentials=True)
def get_user_lists():
    user_id = session['user_id']
    print(f"load list user id: {user_id}")
    if not user_id:
        return jsonify({"error": "User not logged in."}), 401

    # Retrieve user's lists from the database
    user_lists = list_collection.find_one({"_id": user_id})

    if not user_lists:
        return jsonify({"error": "User lists not found."}), 404

    return jsonify({"lists": user_lists["lists"]}), 200

# Routing for saving meal plan information
@app.route("/update-meals", methods=["POST"])
@cross_origin(supports_credentials=True)
def update_meals():
    data = request.get_json()

    user_id = session.get('user_id')  # Use get to avoid KeyError
    if not user_id:
        return jsonify({"success": False, "message": "User not logged in."}), 401

    updated_meals = data.get("meals")

    # Update or insert the meal plan for the user
    mealplan_collection.replace_one({"user_id": user_id}, {"user_id": user_id, "meals": updated_meals}, upsert=True)

    return jsonify({"success": True, "message": "Meals updated successfully."}), 200

@app.route("/get-user-meals", methods=["GET"])
@cross_origin(supports_credentials=True)
def get_user_meals():

    user_id = session['user_id']
    print(f"load list user id: {user_id}")
    if not user_id:
        return jsonify({"error": "User not logged in."}), 401

    # Retrieve the meal plan from the database
    meal_plan = mealplan_collection.find_one({"user_id": user_id})

    if not meal_plan:
        return jsonify({"success": False, "message": "Meal plan not found."}), 404

    return jsonify({"success": True, "meals": meal_plan["meals"]}), 200


@app.route("/update-homepage", methods=["POST"])
@cross_origin(supports_credentials=True)
def update_homepage():
    data = request.get_json()

    user_id = session.get('user_id')  # Use get to avoid KeyError
    if not user_id:
        return jsonify({"success": False, "message": "User not logged in."}), 401

    updated_classes = data.get("classList")
    updated_notes = data.get("notesTaken")
    updated_events = data.get("eventsScheduled")

    # Update or insert the meal plan for the user
    homepage_collection.replace_one({"user_id": user_id}, {"user_id": user_id, "classes": updated_classes, "notes": updated_notes, "events": updated_events}, upsert=True)

    return jsonify({"sucess": True, "message": "Homepage updated Successfully."}), 200


@app.route("/get-user-homepage", methods=["GET"])
@cross_origin(supports_credentials=True)
def get_user_homepage():

    user_id = session['user_id']
    print(f"load user homepage: {user_id}")
    
    if not user_id:
        return jsonify({"error": "User not logged in."}), 401

    # Retrieve the meal plan from the database
    homepage = homepage_collection.find_one({"user_id": user_id})

    if not homepage:
        return jsonify({"success": False, "message": "Homepage data not found."}), 404

    print(homepage)

    return jsonify({"success": True, "classes": homepage["classes"], "notes": homepage["notes"], "events": homepage["events"]}), 200


 #Used to add a new workout to the past workouts text box
@app.route("/update-fitness", methods=["POST"])
@cross_origin(supports_credentials=True)
def update_fitness():
    data = request.get_json()

    user_id = session.get('user_id')
    if not user_id:
        return jsonify({"success": False, "message": "User not logged in."}), 401

    # creates a new workout to be added into the array of past workouts with all things included in the text boxes
    workout = {
        "name": data.get("name"),
        "dateTime": data.get("dateTime"),
        "component": data.get("component"),
        "info": data.get("info")
    }

    # fetch the current list of past workouts for the user so that way we can add the new one to it
    fitness_info = fitness_collection.find_one({"user_id": user_id})

    if not fitness_info:
        # if no past workouts exist, create a new array with the above workout
        fitness_collection.insert_one({"user_id": user_id, "workouts": [workout]})
    else:
        # if past workouts exist, add the new workout to the array
        past_workouts = fitness_info.get("workouts", [])
        past_workouts.append(workout)
        fitness_collection.update_one({"user_id": user_id}, {"$set": {"workouts": past_workouts}})
    return jsonify({"success": True, "message": "Fitnesss updated successfully."}), 200

#used to fetch all the old past workouts from the backend so that way the user can see them saved in the frontend
@app.route("/get-user-fitness", methods=["GET"])
@cross_origin(supports_credentials=True)
def get_user_fitness():

    user_id = session['user_id']
    print(f"load list user id: {user_id}")
    if not user_id:
        return jsonify({"error": "User not logged in."}), 401

    # fetch the list of past workouts from the database
    fitness_info = fitness_collection.find_one({"user_id": user_id})

    if not fitness_info:
        return jsonify({"success": False, "message": "Workouts not found."}), 404

    # sets past workouts into the correct position that it needs to be
    past_workouts = fitness_info.get("workouts", [])

    return jsonify({"success": True, "workouts": past_workouts}), 200

@app.route("/delete-workout", methods=["DELETE"])
@cross_origin(supports_credentials=True)
def delete_workout():
    data = request.get_json()

    # make sure a user is logged in before we attempt to delete a workout so that way we know which database set to remove the wrokout from
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({"success": False, "message": "User not logged in."}), 401

    # get the correct information about the workout we want to delete
    workout_to_delete = {
        "name": data.get("name"),
        "dateTime": data.get("dateTime"),
        "component": data.get("component"),
        "info": data.get("info")
    }

    # get the current list of past workouts for the specific user
    fitness_info = fitness_collection.find_one({"user_id": user_id})

    if not fitness_info:
        return jsonify({"success": False, "message": "Workouts not found."}), 404

    # get the current list of past workouts now that we know the user has workouts to delete
    past_workouts = fitness_info.get("workouts", [])

    # removes the workout we want delete from the list
    past_workouts = [workout for workout in past_workouts if workout != workout_to_delete]

    # Update the list of past workouts in the database
    fitness_collection.update_one({"user_id": user_id}, {"$set": {"workouts": past_workouts}})

    return jsonify({"success": True, "message": "Workout deleted successfully."}), 200




if __name__ == "__main__":
    app.run(debug=True)