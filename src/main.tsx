import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Login } from "./pages/Login.tsx";
import { NextUIProvider } from "@nextui-org/react";
import { PreChoice } from "./pages/PreChoice.tsx";
import { Decision } from "./pages/Decision.tsx";
import { PostChoice } from "./pages/PostChoice.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { SignInWithGoogle } from "./pages/SignInWithGoogle.tsx";
import { UserData } from "./pages/UserData.tsx";
import { Landing } from "./pages/Landing.tsx";
import { CreateAccount } from "./pages/CreateAccount.tsx";
import { DecisionParent } from "./pages/DecisionParent.tsx";
import { ModifyPreferences } from "./pages/ModifyPreferences.tsx";
import { PastDecisions } from "./pages/PastDecisions.tsx";
import { PrivateRoutes } from "./pages/PrivateRoutes.tsx";
import { NoChoice } from "./pages/NoChoice.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Landing />,
    },
    {
        path: "/create-account",
        element: <CreateAccount />,
    },
    {
        path: "/sign-in",
        element: <SignInWithGoogle />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/",
        element: <PrivateRoutes />,
        children: [
            {
                path: "/profile",
                element: <UserData />,
            },
            {
                path: "/past-decisions",
                element: <PastDecisions />,
            },
            {
                path: "/preChoice",
                element: <DecisionParent />,
            },
            {
                path: "/decision",
                element: <DecisionParent />,
            },
            {
                path: "/choice",
                element: <DecisionParent />,
            },
            {
                path: "/modifyPreferences",
                element: <ModifyPreferences />,
            },
            {
                path: "/noChoice",
                element: <NoChoice />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <NextUIProvider>
                <RouterProvider router={router} />
            </NextUIProvider>
        </GoogleOAuthProvider>
    </React.StrictMode>,
);
