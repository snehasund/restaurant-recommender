from flask import Flask
from flask_cors import CORS
from pymongo import MongoClient
import os
from flask_jwt_extended import JWTManager

from settings import APP_KEY

app = Flask(__name__)

app.config.update(
    SESSION_COOKIE_SECURE=True,
    SESSION_COOKIE_SAMESITE="None",
)

app.config["MONGODB_URI"] = os.getenv("MONGODB_URI")
client = MongoClient(app.config["MONGODB_URI"])
db = client.user_data
preferences_collection = db.preferences

app.config["JWT_TOKEN_LOCATION"] = ["headers"]

jwt = JWTManager(app)
app.secret_key = APP_KEY

CORS(
    app,
    supports_credentials=True,
    resources={"/*": {"origins": "http://localhost:5173"}},
)
