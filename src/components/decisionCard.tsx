import { useState } from "react";

export interface decisionCardProps {
    name: string;
    imgUrl: string;
    description: string;
    openNow: string;
    category?: string;
}

export const DecisionCard = (props: decisionCardProps) => {
    return (
        <div
            style={{
                height: "600px",
                width: "400px",
                boxShadow: "2px 2px 10px darkgray",
                borderRadius: "10px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <div style={{ margin: "25px" }}>
                <img
                    src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${props.imgUrl}&key=${import.meta.env.VITE_PLACES_API_KEY}`}
                    style={{
                        borderRadius: "10px",
                        height: "300px",
                        margin: "auto",
                    }}
                />
                <br />
                <h1 style={{ fontSize: "40px" }}>
                    <strong>{props.name}</strong>
                </h1>
                <h2 style={{ fontSize: "25px", marginTop: "10px" }}>
                    {props.category}
                </h2>
                <h4 style={{ fontStyle: "italic", fontSize: "25px" }}>
                    {props.openNow}
                </h4>
                <h4 style={{ fontSize: "25px" }}>{props.description}</h4>
            </div>
        </div>
    );
};
