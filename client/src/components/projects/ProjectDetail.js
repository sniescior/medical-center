import React, { useEffect, useState } from "react";
import { getProjectDetails } from "../../database/projectsQuery";
import Toast from "../utility/Toast";

export default function ProjectDetail(props) {
    const [projectID, setProjectID] = useState(null);
    const [toastMessage, setToastMessage] = useState('');
    const [notFound, setNotFound] = useState(false);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        getProjectDetails(props.projectID, setLoader, setToastMessage, setNotFound);
    }, []);

    if(notFound) {
        return (
            <div className="content">
                <div className="empty-table bigger">
                    <img src="notfound.svg" />
                    <h1>404</h1>
                    <h2>Nie znaleziono</h2>
                </div>
                <Toast message={toastMessage} setToastMessage={setToastMessage} />
            </div>
        );
    } else {
        return (
            <div className="content">
                Projekt: {projectID}
                <Toast message={toastMessage} setToastMessage={setToastMessage} />
            </div>
        );

    }
};
