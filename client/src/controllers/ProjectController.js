import React, { useState } from "react";
import ProjectDetail from "../components/projects/ProjectDetail";
import ProjectsView from "../views/ProjectsView";

export default function ProjectController(props) {
    const [projectID, setProjectID] = useState(null)

    if(projectID) {
        return (
            <ProjectDetail projectID={projectID} />
        );
    } else {
        return (
            <ProjectsView projectID={setProjectID} setProjectID={setProjectID} />
        );
    }
};
