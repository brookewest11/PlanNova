# views.py
from django.http import HttpResponse
from utils import get_db_handle

def authenticate_user(request):
    db_name = 'user_authentication'
    host = 'plannova.2teaqsx.mongodb.net' 
    port = '27017' 
    username = 'plannova_user'
    password = 'PlanNova!333'

    db_handle, client = get_db_handle(db_name, host, port, username, password)

    # Now you can use `db_handle` to interact with your MongoDB database
    # ...

    # Don't forget to close the MongoDB client when you're done
    client.close()

    return HttpResponse("Data from MongoDB retrieved!")
