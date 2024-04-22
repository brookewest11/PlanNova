# Backend 
# • is used to communicate changes in the frontend to the backend so that the changes get updated
# • Emily Proctor, Kenadi Krueger, Nathan Mignot
# • Feburary 7th, 2024
# • April 9th, 2024
# • Update: Added delete functionality for the fitness page backend


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

# define database and collection for each database we have
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


# login request for login page
@app.route("/login", methods=["POST"])
@cross_origin(supports_credentials=True)
def login():
    # get json data from request
    data = request.get_json()

    # get user and password from data
    user = data.get("user")
    password = data.get("password")

    # search collection and checks if user is in the collection
    user = authentication_collection.find_one({"username": user, "password": password})

    # if user is in the database then we update the session by creating a userID to differentiate between each user
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

# register a new user request for login page
@app.route("/register", methods=["POST"])
@cross_origin(supports_credentials=True)
def register():

    #get json data from the request
    data = request.get_json()

    # get the username and password that the user wants to use
    user = data.get("user")
    password = data.get("password")

    # Check if user already exists, if user already exists then we send a message
    existing_user = authentication_collection.find_one({"username": user})
    if existing_user:
        return jsonify({"success": False, "message": "User already exists."}), 400

    # If user doesn't already exist, then we insert the new user into the database
    new_user = {"username": user, "password": password}
    insert_result = authentication_collection.insert_one(new_user)
    user_id = insert_result.inserted_id
    session['user_id'] = str(user_id)
    user_id = session['user_id']
    print(f"register user id: {user_id}")

    return jsonify({"success": True, "message": "User created successfully."}), 201


# update list request for list page
@app.route("/update-lists", methods=["POST"])
@cross_origin(supports_credentials=True)
def update_lists():

    # get json data from request
    data = request.get_json()

    # gets the userID from the session
    user_id = session['user_id']
    print(f"list user id: {user_id}")
    # if the user is not logged in somehow then we get the error message that the user isn't logged in and so there is no associated list in the backend
    if not user_id:
        return jsonify({"success": False, "message": "User not logged in."}), 401

    # sets updated lists from the data request
    updated_lists = data.get("lists")

    # update list if list exists already, insert list if it doesn't already exist
    list_collection.replace_one({"_id": user_id}, {"lists": updated_lists}, upsert=True)

    return jsonify({"success": True, "message": "Lists updated successfully."}), 200


# gets the lists from the backend to show in the frontend in the list page
@app.route("/get-user-lists", methods=["GET"])
@cross_origin(supports_credentials=True)
def get_user_lists():
    # gets the userID from the user that is logged in
    user_id = session['user_id']
    print(f"load list user id: {user_id}")
    if not user_id:
        return jsonify({"error": "User not logged in."}), 401

    # Retrieve user's lists from the database
    user_lists = list_collection.find_one({"_id": user_id})

    # if user does not have any lists then send error message
    if not user_lists:
        return jsonify({"error": "User lists not found."}), 404

    # returns users lists jsonify response
    return jsonify({"lists": user_lists["lists"]}), 200

# Routing for saving meal plan information
@app.route("/update-meals", methods=["POST"])
@cross_origin(supports_credentials=True)
def update_meals():
    data = request.get_json()

    user_id = session.get('user_id')  # Use get to avoid KeyError
    if not user_id:
        return jsonify({"success": False, "message": "User not logged in."}), 401

    # sets new updated meals to be 
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

    # if a meal plan doesn't exist send an error message that it can not retrieve it
    if not meal_plan:
        return jsonify({"success": False, "message": "Meal plan not found."}), 404

    return jsonify({"success": True, "meals": meal_plan["meals"]}), 200

# updates the home page (including classes, notes, events)
@app.route("/update-homepage", methods=["POST"])
@cross_origin(supports_credentials=True)
def update_homepage():
    data = request.get_json()

    user_id = session.get('user_id')  # Use get to avoid KeyError
    if not user_id:
        return jsonify({"success": False, "message": "User not logged in."}), 401

    # sets updated classes, notes, and events 
    updated_classes = data.get("classList")
    updated_notes = data.get("notesTaken")
    updated_events = data.get("eventsScheduled")

    # Update or insert the meal plan for the user
    homepage_collection.replace_one({"user_id": user_id}, {"user_id": user_id, "classes": updated_classes, "notes": updated_notes, "events": updated_events}, upsert=True)

    return jsonify({"sucess": True, "message": "Homepage updated Successfully."}), 200

# gets the user's homepage from the backend to show to the frontend that everything saved
@app.route("/get-user-homepage", methods=["GET"])
@cross_origin(supports_credentials=True)
def get_user_homepage():

    # makes sure user is logged in and we retrive the userID to get to the correct home page from the database
    user_id = session['user_id']
    print(f"load user homepage: {user_id}")
    
    if not user_id:
        return jsonify({"error": "User not logged in."}), 401

    # Retrieve the meal plan from the database for that user
    homepage = homepage_collection.find_one({"user_id": user_id})

    if not homepage:
        return jsonify({"success": False, "message": "Homepage data not found."}), 404

    print(homepage)

    return jsonify({"success": True, "classes": homepage["classes"], "notes": homepage["notes"], "events": homepage["events"]}), 200


 # Used to add a new workout to the past workouts text box and save to the backend
@app.route("/update-fitness", methods=["POST"])
@cross_origin(supports_credentials=True)
def update_fitness():
    data = request.get_json()

    # gets the user ID so we know which database to save the new workout to
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({"success": False, "message": "User not logged in."}), 401

    # creates a new workout to be added into the array of past workouts with all things included in the text boxes in the fitness page
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

#used to fetch all the old past workouts from the backend so that way the user can see them saved in the frontend in the past workouts area
@app.route("/get-user-fitness", methods=["GET"])
@cross_origin(supports_credentials=True)
def get_user_fitness():

    # gets logged in user to make sure we pull the correct database
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


# used to delete a workout from the backend
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