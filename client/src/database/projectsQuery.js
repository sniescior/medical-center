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

export const fetchProjects = (searchParams, setProjects) => {
    fetch('/api/projects?' + searchParams).then(
        response => response.json()
    ).then(
        data => {
            setProjects(data.data.projects);
        }
    );
}

export const getProjectsCount = (searchParams, setProjectsCount) => {
    fetch('/api/projects/count-projects?' + searchParams, {
        method: 'GET'
    }).then(
        response => response.json()
    ).then(
        data => {
            setProjectsCount(data.data.projectsCount);
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
