import React, { useState, useEffect } from "react";
import ProjectList from "../components/projects/ProjectList";
import NavBar from "../components/utility/NavBar";

export default function ProjectsView() {

    const [pageNumber, setPageNumber] = useState(0);
    const [count, setCount] = useState(5);

    useEffect(() => {
        fetch('/api/projects?' + new URLSearchParams({
            page: pageNumber,   // requested page number (handled by server)
            count: count        // patients number to return on single page
        })).then(
            response => response.text()
        ).then(
            data => {
                console.log(data);
            }
        )
    }, []);

    return (
        <div className="content">
            <ProjectList />
        </div>
    );
}