import { Button, Input } from "@nextui-org/react";
import { useState } from "react";

export const API_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const PreChoice = (props: {
    restaurants: (arg: any) => void;
    setCoords: (arg: boolean) => void;
}) => {
    let [lat, setLat] = useState(0);
    let [long, setLong] = useState(0);
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            setLat(latitude);
            setLong(longitude);
            console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        });
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
    let sendCoords = async () => {
        let result = await fetch(`${API_URL}/coords`, {
            method: "POST",
            body: JSON.stringify({ lat, long }),
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });
        let data = await result.text();
        let arr = JSON.parse(data);
        props.restaurants(arr);
        props.setCoords(true);
    };
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100vw",
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    boxShadow: "2px 2px 10px lightgray",
                    padding: "10px",
                    borderRadius: "10px",
                }}
            >
                {lat ? (
                    <p>
                        Looking for restaurants nearby......
                        <br />
                        Your coordinates are:
                        <br />
                        {`Latitude: ${lat}, Longitude: ${long}`}
                        <br />
                        <Button
                            onClick={() => sendCoords()}
                            style={{
                                backgroundColor: "#c7e3c1",
                                marginTop: "10px",
                            }}
                        >
                            OK
                        </Button>
                    </p>
                ) : (
                    <div>
                        Cannot find your location. Input some nearby
                        restaurants:
                        <br />
                        <Input />
                    </div>
                )}
            </div>
        </div>
    );
};
