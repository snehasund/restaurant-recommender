from flask import request, jsonify, session
from flask_cors import cross_origin
import backend
from create_app import app, preferences_collection

@app.route("/user_data/save_preferences", methods=["POST"])
@cross_origin()
def save_preferences():
    try:
        user_id = session.get("user_id")
        if not user_id:
            return jsonify({"error": "User ID not found in session"}), 404

        data = request.get_json()
        name = data.get("name")
        preferences = data.get("preferences")

        result = preferences_collection.update_one(
            {"user_id": user_id},
            {
                "$set": {
                    "name": name,
                    "preferences": preferences,
                }
            },
        )

        if result.modified_count > 0:
            return (
                jsonify(
                    {
                        "message": "Preferences updated successfully",
                        "result": str(result.modified_count),
                    }
                ),
                200,
            )
        else:
            return jsonify({"message": "No preferences were updated"}), 200

    except Exception as e:
        print(e)
        return jsonify({"message": "Failed to update preferences"}), 500


@app.route("/user_data/modify_preferences", methods=["POST"])
@cross_origin()
def modify_preferences():
    try:
        user_id = session.get("user_id")
        if not user_id:
            return jsonify({"error": "User ID not found in session"}), 404

        data = request.get_json()
        preferences = data.get("preferences")

        result = preferences_collection.update_one(
            {"user_id": user_id},
            {
                "$set": {
                    "preferences": preferences,
                }
            },
        )

        if result.modified_count > 0:
            return (
                jsonify(
                    {
                        "message": "Preferences updated successfully",
                        "result": str(result.modified_count),
                    }
                ),
                200,
            )
        else:
            return jsonify({"message": "No preferences were updated"}), 200

    except Exception as e:
        print(e)
        return jsonify({"message": "Failed to update preferences"}), 500


@app.route("/user_data/get_user_data", methods=["GET"])
@cross_origin()
def get_user_data():
    if "user_id" not in session:
        return jsonify({"error": "User ID not found in session"}), 404

    user_id = session["user_id"]

    user_data = preferences_collection.find_one({"user_id": user_id})
    if user_data is None:
        return jsonify({"error": "No data found for the user"}), 404

    return {
        "email": user_data["email"],
        "name": user_data["name"],
        "preferences": user_data["preferences"],
    }, 200


@app.route("/user_data/save_decision_results", methods=["POST"])
@cross_origin()
def decision_results():
    print(session)
    if "user_id" not in session:
        return jsonify({"error": "User ID not found in session"}), 404

    user_id = session["user_id"]

    data = request.get_json()

    user_data = preferences_collection.find_one({"user_id": user_id})
    if user_data is None:
        return jsonify({"error": "No data found for the user"}), 404

    result = preferences_collection.update_one(
        {"user_id": user_id},
        {"$push": {"past_decision_results": data}},
        upsert=True,
    )

    if result.modified_count > 0:
        return jsonify({"message": "Decision results saved successfully"}), 200
    else:
        return jsonify({"message": "Failed to save decision results"}), 500


@app.route("/user_data/get_past_decision_results", methods=["GET"])
@cross_origin()
def get_past_decision_results():
    if "user_id" not in session:
        return jsonify({"error": "User ID not found in session"}), 404

    user_id = session["user_id"]

    user_data = preferences_collection.find_one({"user_id": user_id})
    if user_data is None:
        return jsonify({"error": "No data found for the user"}), 404

    past_decision_results = user_data.get("past_decision_results", [])

    return jsonify({"past_decision_results": past_decision_results}), 200


def top_three_cuisines(user):
    user_data = preferences_collection.find_one({"user_id": user})
    preferences = user_data["preferences"]["cuisines"]
    pref_list = [(preferences[key], key) for key in preferences]
    pref_list.sort(reverse=True)
    top_three=[pref[1] for pref in pref_list[0:3]]
    return top_three

@app.route("/coords", methods=["POST"])
@cross_origin()
def processCoords():
    print("received coords")
    data = request.get_data(parse_form_data=True)
    data = str(data)
    cmas = data.split(",")
    f1 = float(cmas[0].split(":")[1])
    f2 = float(cmas[1].split(":")[1].split("}")[0])
    coord_tuple = (f1, f2)
    #restaurants = get_nearby_restaurants(f1, f2)
    user_id = session["user_id"]
    print(user_id)
    print(coord_tuple)
    cuisines = top_three_cuisines(user_id)
    print(cuisines)
    restaurants = backend.recommend_best_restaurants(coord_tuple, cuisines)
    nameset = set()
    attrs = []
    for place in restaurants:
        if place["name"] not in nameset:
            attrs.append(
                [
                    place["name"],
                    place.get("opening_hours"),
                    place.get("rating"),
                    place["types"],
                    place.get("photos"),
                ]
            )
            nameset.add(place["name"])
    print(attrs)
    return jsonify(attrs)

@app.after_request
def after_request(response):
    response.headers.set("Access-Control-Allow-Headers", "Content-Type,Authorization")
    response.headers.set("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS")
    response.headers.set("Access-Control-Allow-Credentials", "true")
    return response