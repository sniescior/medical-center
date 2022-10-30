import React from "react";
import { useRouteError } from "react-router-dom"

export default function ErrorView() {
    const error = useRouteError();

    return (
        <div id="error-page">
            <h2>Przepraszamy, wystąpił błąd</h2>
            <h5>{error.statusText}</h5>
            <p>
                {error.message}
            </p>
        </div>
    );
}