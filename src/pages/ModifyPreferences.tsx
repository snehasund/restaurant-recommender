import { Button, Input, Slider, Checkbox } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ModifyPreferences = () => {
    const navigate = useNavigate();

    const displayNames = {
        italian: "Italian",
        american: "American",
        indian: "Indian",
        middleEastern: "Middle Eastern",
        chinese: "Chinese",
        korean: "Korean",
        thai: "Thai",
    };

    const [sliderValues, setSliderValues] = useState({
        italian: 0,
        american: 0,
        indian: 0,
        middleEastern: 0,
        chinese: 0,
        korean: 0,
        thai: 0,
    });

    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(
            `${import.meta.env.VITE_BACKEND_BASE_URL}/user_data/get_user_data`,
            {
                credentials: "include",
            },
        )
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Failed to fetch user ID");
                }
            })
            .then((data) => {
                setSliderValues(data["preferences"]["cuisines"]);
            });
    }, []);

    const handleSliderChange = (name, value) => {
        setSliderValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const preferences = {
            cuisines: sliderValues,
        };

        const response = await fetch(
            // Change the base later on
            `${import.meta.env.VITE_BACKEND_BASE_URL}/user_data/modify_preferences`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    preferences,
                }),
            },
        );
        navigate("/profile");
        if (response.ok) {
            console.log("Preferences modified successfully");
        } else {
            console.error("Failed to modify preferences");
        }
    };

    return (
        <div
            style={{
                justifyContent: "center",
                height: "100%",
                marginLeft: "10vw",
                marginTop: "-10%",
                width: "80vw",
                flexDirection: "column",
                alignSelf: "center",
            }}
            className="space-y-4"
        >
            <form onSubmit={handleSubmit}>
                <h1 style={{ fontSize: "30px" }}>Modify your preferences</h1>
                <h2 style={{ fontSize: "20px" }}>
                    Rate your preference for the following cuisines:
                </h2>
                <div>
                    {Object.keys(sliderValues).map((key) => (
                        <div key={key}>
                            <h4>{displayNames[key]}</h4>
                            <Slider
                                value={sliderValues[key]}
                                onChange={(value) =>
                                    handleSliderChange(key, value)
                                }
                                aria-label={`Slider for ${displayNames[key]}`}
                            />
                        </div>
                    ))}
                </div>
                <Button
                    type="submit"
                    color="primary"
                    style={{ marginTop: "20px" }}
                >
                    Submit Preferences
                </Button>
            </form>
        </div>
    );
};
