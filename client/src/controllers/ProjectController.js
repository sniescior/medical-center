import React, { useState } from "react";
import ProjectDetail from "../components/projects/ProjectDetail";
import ProjectsView from "../views/ProjectsView";

export default function ProjectController(props) {
    const [projectID, setProjectID] = useState(null)
    const [toastMessage, setToastMessage] = useState('');

    if(projectID) {
        return (
            <ProjectDetail projectID={projectID} setProjectID={setProjectID} toastMessage={toastMessage} setToastMessage={setToastMessage} />
        );
    } else {
        return (
            <ProjectsView projectID={setProjectID} setProjectID={setProjectID} toastMessage={toastMessage} setToastMessage={setToastMessage} />
        );
    }
};
