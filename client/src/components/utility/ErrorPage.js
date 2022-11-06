import React from "react";

export default function ErrorPage(props) {
    return (
        <div className="content">
            <div className="empty-table bigger">
                <img src="notfound.svg" />
                <h1>{props.error.statusCode ? props.error.statusCode : "Nieznany błąd"}</h1>
                <h2>{props.error.message ? props.error.message : "Wystąpił problem. Przepraszamy"}</h2>
            </div>
        </div>
    );
};
