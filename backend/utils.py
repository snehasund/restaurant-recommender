from flask import request, jsonify, session
from flask_cors import cross_origin
import requests
from create_app import app, preferences_collection
from settings import PLACES_API_KEY

@app.route("/")
def hello_world():
    return "Hello World"


@app.route("/utils", methods=["GET"])
def hello_utils():
    return "Hello utils"


@app.route("/test", methods=["GET"])
def test():
    return "Hello"


def get_nearby_restaurants(latitude, longitude, radius=5000, type="restaurant"):
    url = f"https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={latitude},{longitude}&radius={radius}&type={type}&key={PLACES_API_KEY}"
    response = requests.get(url)
    data = response.json()
    nameset = set()
    attrs = []
    if "results" in data:
        for place in data["results"]:
            if place["name"] not in nameset:
                attrs.append(
                    [
                        place["name"],
                        place["opening_hours"],
                        place["rating"],
                        place["types"],
                        place["photos"],
                    ]
                )
                nameset.add(place["name"])
    return attrs[:7]
