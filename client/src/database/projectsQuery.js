export const deleteProject = (projectID, setModalOpened, setLoader, setToastMessage, setProjectID) => {
    setLoader(true);
    fetch(`/api/projects/${projectID}`, {
        method: 'DELETE'
    }).then(
        response => response.json()
    ).then(
        data => {
            setToastMessage(data.message);
            setModalOpened(false);
            setProjectID(null);
            setLoader(false);
        }
    );
}

export const getProjectDetails = (projectID, setProject, setLoader, setError) => {
    setLoader(true);
    fetch(`/api/projects/${projectID}`).then(
        response => response.json()
    ).then(
        data => {
            if(data.statusCode !== 200) {
                setError({
                    statusCode: data.statusCode,
                    message: data.message
                });
                setLoader(false);
            } else {
                setProject(data.data);
                setLoader(false);
            }
        }
    )
}

export const getParticipants = (projectID, setPatients, setLoader, setError) => {
    setLoader(true);
    fetch(`/api/projects/get-participants/${projectID}`).then(
        response => response.json()
        .then(
            data => {
                if(data.statusCode !== 200) {
                    setError({
                        statusCode: data.statusCode,
                        message: data.message
                    })
                } else {
                    setPatients(data.data.patients)
                    setLoader(false);
                }
            }
        )
    );
}

export const fetchProjects = (searchParams, setProjects, setLoader) => {
    setLoader(true);
    fetch('/api/projects?' + searchParams).then(
        response => response.json()
    ).then(
        data => {
            setProjects(data.data.projects);
            setLoader(false);
        }
    );
}

export const getProjectsCount = (searchParams, setProjectsCount, setLoader) => {
    setLoader(true);
    fetch('/api/projects/count-projects?' + searchParams, {
        method: 'GET'
    }).then(
        response => response.json()
    ).then(
        data => {
            setProjectsCount(data.data.projectsCount);
            setLoader(false);
        }
    );
}

// addProject(finalPostParams, props.setModalOpened, setLoader, props.setToastMessage);
export const addProject = (postParams, setProjectID, setModalOpened, setLoader, setToastMessage) => {
    setLoader(true);
    fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postParams)
    }).then(
        response => response.json()
    ).then(
        data => {
            setToastMessage(data.message);
            setModalOpened(false);
            setLoader(false);
            setProjectID(data.data.project.id);
        }
    );
}

export const updateProject = (projectID, putParams, setProjectID, setModalOpened, setLoader, setToastMessage, refreshPage) => {
    setLoader(true);
    fetch(`/api/projects/${projectID}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(putParams)
    }).then(
        response => response.json()
    ).then(
        data => {
            setToastMessage(data.message);
            setModalOpened(false);
            setProjectID(projectID);
            refreshPage();
            setLoader(false);
        }
    );
}

export const removeParticipant = (postParams, setLoader, setToastMessage, refreshPage) => {
    setLoader(true);
    fetch('/api/projects/remove-participant', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postParams)
    }).then(
        response => response.json()
    ).then(
        data => {
            setToastMessage(data.message);
            refreshPage();
            setLoader(false);
        }
    )
}

export const updateParticipant = (postParams, setLoader, setToastMessage, refreshPage) => {
    setLoader(true);
    console.log(postParams);
    fetch('/api/projects/update-participant', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postParams)
    }).then(
        response => response.json()
    ).then(
        data => {
            setToastMessage(data.message);
            console.log(data);
            refreshPage();
            setLoader(false);
        }
    )
}
