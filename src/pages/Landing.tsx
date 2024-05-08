import { Link } from "react-router-dom";
import logo from "../assets/pick_me.png";

export const Landing = () => {
    return (
        <div
            style={{
                alignItems: "center",
                justifyContent: "center",
                width: "100vw",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <div
                style={{
                    boxShadow: "2px 2px 10px lightgray",
                    padding: "25px",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                }}
            >
                <img
                    src={logo}
                    style={{
                        height: "200px",
                        width: "200px",
                        borderRadius: "50%",
                        marginBottom: "10px",
                    }}
                />
                <h1 style={{ fontWeight: "bold", marginBottom: "5px" }}>
                    PickMe
                </h1>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: "20px",
                    }}
                >
                    <Link
                        to="/create-account"
                        className="button"
                        style={{
                            padding: "10px",
                            backgroundColor: "#c7e3c1",
                            color: "black",
                            borderRadius: "5px",
                            fontWeight: "bold",
                        }}
                    >
                        Create Account
                    </Link>
                    <Link
                        to="/sign-in"
                        className="button"
                        style={{
                            padding: "10px",
                            backgroundColor: "#c7e3c1",
                            color: "black",
                            borderRadius: "5px",
                            marginLeft: "10px",
                            fontWeight: "bold",
                        }}
                    >
                        Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
};
