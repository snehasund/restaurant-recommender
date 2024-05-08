import heart from "../assets/green-heart.png";
import x from "../assets/icons8-x-50.png";
export const Icon = (props: { color: string; icon: string }) => {
    return (
        <div>
            <div
                style={{
                    borderRadius: "50%",
                    fontSize: "50px",
                    borderColor: props.color,
                    color: props.color,
                    boxShadow: `5px 5px 15px ${props.color}`,
                    height: "70px",
                    width: "70px",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <img
                    src={props.icon == "heart" ? heart : x}
                    style={{ paddingTop: "10px", paddingLeft: "10px" }}
                />
            </div>
            <div>
                <a
                    target="_blank"
                    href="https://icons8.com"
                    style={{ color: "white" }}
                >
                    `
                </a>
            </div>
        </div>
    );
};
