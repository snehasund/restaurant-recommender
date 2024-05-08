import React, { useState, useEffect } from "react";

export const UserData = () => {
    const [userId, setUserId] = useState(null);
    const [error, setError] = useState(null);
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
                setData(data);
            })
            .catch((error) => {
                setError(error.message);
            });
    }, []);
    return (
        <div>
            {error ? (
                <div>Error: {error}</div>
            ) : Boolean(data) ? (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100vw",
                    }}
                >
                    <div
                        style={{
                            boxShadow: "2px 2px 10px lightgray",
                            padding: "20px",
                            borderRadius: "5px",
                        }}
                    >
                        <h2 style={{ fontSize: "30px" }}>
                            <strong>Welcome, {data["name"]}!</strong>
                        </h2>
                        <div style={{ marginBottom: "15px" }}>
                            <h2
                                style={{
                                    fontSize: "18px",
                                    fontStyle: "italic",
                                }}
                            >
                                Here are the preferences you've submitted:
                            </h2>
                            {Object.entries(
                                data["preferences"]["cuisines"],
                            ).map((entry) => {
                                return (
                                    <div key={entry[0]}>
                                        <div>
                                            {entry[0]}: {entry[1]}%
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div style={{ display: "flex" }}>
                            <a
                                href="/preChoice"
                                style={{
                                    padding: "10px",
                                    backgroundColor: "#c7e3c1",
                                    color: "black",
                                    borderRadius: "5px",
                                }}
                            >
                                Make a decision!
                            </a>
                            <a
                                href="/modifyPreferences"
                                style={{
                                    padding: "10px",
                                    backgroundColor: "#c7e3c1",
                                    color: "black",
                                    borderRadius: "5px",
                                    marginLeft: "10px",
                                }}
                            >
                                Modify these preferences
                            </a>
                            <a
                                href="/past-decisions"
                                style={{
                                    padding: "10px",
                                    backgroundColor: "#c7e3c1",
                                    color: "black",
                                    borderRadius: "5px",
                                    marginLeft: "10px",
                                }}
                            >
                                View Past Decisions
                            </a>
                        </div>
                    </div>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};
