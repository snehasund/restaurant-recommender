import { useState } from "react";
import { decisionCardProps } from "../components/decisionCard";
import { Decision } from "./Decision";
import { PostChoice } from "./PostChoice";
import { PreChoice } from "./PreChoice";

export const DecisionParent = () => {
    let [done, setDone] = useState(false);
    let [result, setResult] = useState({});
    let [restaurants, setRestaurants] = useState([]);
    let [hasCoords, setHasCoords] = useState(false);
    return (
        <div>
            {!hasCoords ? (
                <PreChoice
                    restaurants={setRestaurants}
                    setCoords={setHasCoords}
                />
            ) : !done ? (
                <Decision
                    setter={setResult}
                    decisions={restaurants}
                    onDone={setDone}
                />
            ) : (
                <PostChoice resultAsState={result} />
            )}
        </div>
    );
};
