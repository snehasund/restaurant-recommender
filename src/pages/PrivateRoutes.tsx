import { Outlet, useNavigate } from "react-router-dom";
import { Landing } from "./Landing.tsx";

import React, { useState, useEffect } from "react";
export const PrivateRoutes = () => {
    const [auth, setAuth] = useState({ token: false });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/extract_user_id_from_session`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        credentials: "include",
                    },
                );
                const data = await response.json();
                if (data.user_id) {
                    setAuth({ token: true });
                } else {
                    navigate("/");
                }
            } catch (error) {
                console.error("Failed to fetch user ID from session:", error);
            }
        };
        fetchUserId();
    }, []);
    return auth.token ? <Outlet /> : <Landing />;
};
