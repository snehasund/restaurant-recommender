export const NoChoice = () => {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
                justifyContent: "center",
            }}
        >
            <div style={{ width: "80%", textAlign: "center" }}>
                <h1>
                    Looks like none of these options fit your preferences...
                    consider
                    <a href="/modifyPreferences">
                        {" "}
                        modifying your preferences
                    </a>{" "}
                    and trying again?
                </h1>
            </div>
        </div>
    );
};
