export const deleteProject = (id, refreshProjectsList, setModalOpened, setLoader, setToastMessage) => {
    setLoader(true);
    fetch(`/api/projects/${id}`, {
        method: 'DELETE'
    }).then(
        response => response.json()
    ).then(
        data => {
            refreshProjectsList();
            setToastMessage(data.message);
            setModalOpened(false);
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

export const addProject = (postParams, refreshProjectsList, setModalOpened, setLoader, setToastMessage) => {
    setLoader(true);
    fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postParams)
    }).then(
        response => response.json()
    ).then(
        data => {
            refreshProjectsList();
            setToastMessage(data.message);
            setModalOpened(false);
            setLoader(false);
        }
    );
}
