import React from "react";

export default function LoaderPage(props) {
    return (
        <div className={props.loader ? "loader-wrapper loading" : "loader-wrapper"}>
            <span className="loader spinning big"></span>
        </div>
    );
};
