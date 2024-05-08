import { GoogleLogin } from "@react-oauth/google";
import React from "react";
import { useNavigate } from "react-router-dom";

export const CreateAccount = () => {
    const navigate = useNavigate();

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100vw",
            }}
        >
            <div style={{ textAlign: "center" }}>
                <h2 style={{ fontSize: "30px", marginBottom: "10px" }}>
                    Create Account
                </h2>
                <GoogleLogin
                    onSuccess={(credentialResponse) => {
                        const token = credentialResponse.credential;

                        fetch(
                            `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/authenticate`,
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: "Bearer " + token,
                                },
                                credentials: "include",
                                body: JSON.stringify({ token }),
                            },
                        )
                            .then((response) => {
                                if (!response.ok) {
                                    throw new Error("Failed to authenticate");
                                }
                                return response.json();
                            })
                            .then((data) => {
                                navigate("/login");
                            })
                            .catch((error) => {
                                console.error("Error:", error);
                            });
                    }}
                    onError={() => {
                        console.error("Login Failed");
                    }}
                />
            </div>
        </div>
    );
};
