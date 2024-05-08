import { DecisionCard, decisionCardProps } from "../components/decisionCard";

export const PostChoice = (props: { resultAsState: any }) => {
    return (
        <div
            style={{
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                width: "100vw",
                margin: "20px",
            }}
        >
            <h1>
                <strong>
                    Your preferences and choices have been analyzed...
                </strong>
            </h1>
            <h2 style={{ fontSize: "30px" }}>
                We've determined that the best choice for you is...
            </h2>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "30px",
                }}
            >
                <div style={{ boxShadow: "0px 0px 30px yellow" }}>
                    <DecisionCard
                        imgUrl={props.resultAsState[4][0].photo_reference}
                        openNow={
                            props.resultAsState[1].open_now
                                ? "Open Now"
                                : "Closed"
                        }
                        description={props.resultAsState[2] + "⭐"}
                        name={props.resultAsState[0]}
                    />
                </div>
            </div>
            <div
                style={{
                    marginTop: "50px",
                }}
            >
                <a
                    href="/profile"
                    style={{
                        marginTop: "100px",
                        padding: "20px",
                        paddingLeft: "180px",
                        paddingRight: "180px",
                        backgroundColor: "#d3acfa",
                        color: "white",
                        borderRadius: "5px",
                        marginLeft: "10px",
                        fontWeight: "bold",
                    }}
                >
                    Home
                </a>
            </div>
        </div>
    );
};
