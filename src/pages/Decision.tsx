import { useState } from "react";
import { DecisionCard } from "../components/decisionCard";
import { Icon } from "../components/decisionIcons";
import { decisionCardProps } from "../components/decisionCard";
import { API_URL } from "./PreChoice";
import { useNavigate } from "react-router-dom";

let yeses: any[] = [];

export const Decision = (props: {
    setter: (arg: any) => void;
    decisions: any[];
    onDone: (arg: boolean) => void;
}) => {
    let [idx, setIdx] = useState(0);
    let navigate = useNavigate();
    let addToYeses = () => {
        yeses.push(props.decisions[idx]);
    };
    let increment = async () => {
        if (idx == props.decisions.length - 1) {
            if (yeses.length == 0) {
                navigate("/noChoice");
            }
            yeses.sort((a, b) => (a[2] || 0) - (b[2] || 0));
            let decision = yeses[yeses.length - 1];
            props.setter(decision);
            props.onDone(true);
            let result = await fetch(
                `${import.meta.env.VITE_BACKEND_BASE_URL}/user_data/save_decision_results`,
                {
                    method: "POST",
                    body: JSON.stringify(decision),
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                },
            );
        }
        setIdx(idx + 1);
    };
    return (
        <div
            style={{
                width: "100vw",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
            }}
        >
            <div
                style={{ position: "absolute", left: "5%" }}
                onClick={async () => {
                    await increment();
                }}
            >
                <Icon color="red" icon="X" />
            </div>
            <div>
                <div style={{ margin: "auto" }}>
                    <DecisionCard
                        imgUrl={props.decisions[idx][4][0].photo_reference}
                        openNow={
                            props.decisions[idx][1].open_now
                                ? "Open Now"
                                : "Closed"
                        }
                        description={props.decisions[idx][2] + "⭐"}
                        name={props.decisions[idx][0]}
                    />
                </div>
            </div>
            <div
                style={{ position: "absolute", left: "90%" }}
                onClick={async () => {
                    addToYeses();
                    await increment();
                }}
            >
                <Icon color="#a1e3ae" icon="heart" />
            </div>
        </div>
    );
};
