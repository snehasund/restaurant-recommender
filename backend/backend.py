#all of my imports
import googlemaps # type: ignore
import numpy as np # type: ignore
from sklearn.cluster import KMeans # type: ignore
import requests
from settings import PLACES_API_KEY

API_KEY = PLACES_API_KEY

import numpy as np # type: ignore
from sklearn.cluster import KMeans # type: ignore

def get_nearby_restaurants(latitude, longitude, radius=5000, type="restaurant", num_restaurants=7):
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
                        place.get("opening_hours"),
                        place["rating"],
                        place["types"],
                        place["photos"],
                    ]
                )
                nameset.add(place["name"])
    return attrs[:num_restaurants]

def recommend_best_restaurants(location, cuisine_preferences, radius=5000, rank_by='prominence', num_clusters=3, num_restaurants=6):
    gmaps = googlemaps.Client(key=API_KEY)
    #keyword = " ".join(cuisine_preferences)

    # Places API search request
    # places_result = gmaps.places_nearby(location=location, radius=radius, keyword=keyword, rank_by=rank_by)
    places_result = []

    for cuisine in cuisine_preferences:
        places_result+= gmaps.places_nearby(location=location, radius=radius, keyword="restaurant " + cuisine, rank_by=rank_by)["results"]

    print(places_result)

    places=places_result
    if len(places) > 0:
        coordinates = [[place['geometry']['location']['lat'], place['geometry']['location']['lng']] for place in places]
        coordinates = np.array(coordinates)

        kmeans = KMeans(n_clusters=num_clusters, random_state=0).fit(coordinates)

        cluster_labels = kmeans.labels_
        max_cluster_label = 0
        max_mean_rating = 0
        for i in range(num_clusters):
            cluster_rating_sum = 0
            cluster_count = 0
            for idx, place in enumerate(places):
                if cluster_labels[idx] == i:
                    cluster_rating_sum += place.get('rating', 0)
                    cluster_count += 1
            if cluster_count > 0:
                mean_rating = cluster_rating_sum / cluster_count
                if mean_rating > max_mean_rating:
                    max_mean_rating = mean_rating
                    max_cluster_label = i

        cluster_center = kmeans.cluster_centers_[max_cluster_label]

        distances = []
        for place, label in zip(places, cluster_labels):
            if label == max_cluster_label:
                lat_diff = place['geometry']['location']['lat'] - cluster_center[0]
                lng_diff = place['geometry']['location']['lng'] - cluster_center[1]
                distance = np.linalg.norm([lat_diff, lng_diff])
                distances.append((place, distance))

        sorted_restaurants = sorted(distances, key=lambda x: x[0].get('rating', 0), reverse=True)
        top_restaurants = sorted_restaurants[:num_restaurants]
        ranked_restaurants = [restaurant[0] for restaurant in top_restaurants]
        if len(ranked_restaurants) < 6:
            ranked_restaurants.append(get_nearby_restaurants(location[0], location[1], num_restaurants=6-len(ranked_restaurants)))
        return ranked_restaurants
    return None
