from flask import request, jsonify, session
from flask_cors import cross_origin
from flask_cors import CORS
from google.auth.transport import requests
from google.oauth2.id_token import verify_oauth2_token

from create_app import app, preferences_collection


# Used for testing
@app.route("/auth/process-token", methods=["POST"])
@cross_origin()
def process_token():
    token = request.json.get("token")
    try:
        id_info = verify_oauth2_token(token, requests.Request(), audience=None)

        user_id = id_info["sub"]
        return (
            jsonify({"message": "Token processed successfully", "user_id": user_id}),
            200,
        )
    except ValueError as e:
        return jsonify({"error": str(e)}), 401


@app.route("/auth/authenticate", methods=["POST"])
@cross_origin()
def authenticate():
    token = request.json.get("token")

    try:
        id_info = verify_oauth2_token(token, requests.Request(), audience=None)

        user_id = id_info["sub"]

        existing_user = preferences_collection.find_one({"user_id": user_id})

        if existing_user:
            session["user_id"] = user_id
            return (
                jsonify(
                    {
                        "message": "Authenticated session established",
                        "user_id": user_id,
                        "token": token,
                    }
                ),
                200,
            )
        else:
            email = request.json.get("email", "")
            new_user = {
                "user_id": user_id,
                "email": email,
            }
            preferences_collection.insert_one(new_user)
            session["user_id"] = user_id
            return (
                jsonify(
                    {
                        "message": "New user created and session established",
                        "user_id": user_id,
                        "token": token,
                        "new_user": "true",
                    }
                ),
                200,
            )

    except ValueError as e:
        return jsonify({"error": str(e)}), 401


@app.route("/auth/extract_user_id_from_session", methods=["GET"])
@cross_origin()
def extract_user_id_from_session():
    if "user_id" in session:
        user_id = session["user_id"]
        return jsonify({"user_id": user_id}), 200
    else:
        return jsonify({"error": "User ID not found in session"}), 404


@app.after_request
def after_request(response):
    response.headers.set("Access-Control-Allow-Headers", "Content-Type,Authorization")
    response.headers.set("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS")
    response.headers.set("Access-Control-Allow-Credentials", "true")
    return response
