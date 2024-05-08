import React, { useState, useEffect } from "react";
import { DecisionCard } from "../components/decisionCard.tsx";
import { useNavigate } from "react-router-dom";

export const PastDecisions = () => {
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(
            `${import.meta.env.VITE_BACKEND_BASE_URL}/user_data/get_past_decision_results`,
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
                setData(data.past_decision_results);
            })
            .catch((error) => {
                setError(error.message);
            });
    }, []);

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ padding: "50px" }}>
            <h2
                style={{
                    display: "flex",
                    flexDirection: "row",
                    padding: "20px",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: "30px",
                }}
            >
                <strong>Past Decisions</strong>
                <button
                    onClick={() => navigate("/profile")}
                    style={{ marginTop: "20px" }}
                >
                    Profile
                </button>
            </h2>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "start",
                    alignItems: "center",
                    flexWrap: "wrap",
                }}
            >
                {data.map((item, index) => {
                    const [name, { open_now }, rating, categories, photos] =
                        item;
                    const imgUrl = photos[0]?.photo_reference;

                    return (
                        <div style={{ padding: "20px" }}>
                            <DecisionCard
                                key={index}
                                imgUrl={imgUrl}
                                openNow={""}
                                description={`${rating}⭐`}
                                name={name}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
