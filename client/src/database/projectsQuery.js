export const getProjectDetails = (projectID, setProject, setLoader, setError) => {
    setLoader(true);
    fetch(`/api/projects/${projectID}`).then(
        (response) => {
            if(response.ok) {
                return response.json();
            }
            throw (response.status);
        }
    ).then(
        data => {
            setProject(data.data);
            setLoader(false);
        }
    ).catch((error) => {
        setError({
            statusCode: error
        });
    });
}

export const getProjectsCount = (searchParams, setProjectsCount, setLoader, setError) => {
    setLoader(true);
    fetch('/api/projects/count-projects?' + searchParams, {
        method: 'GET'
    }).then(
        (response) => {
            if(response.ok) {
                return response.json();
            }
            throw (response.status);
        }
    ).then(
        data => {
            setProjectsCount(data.data.projectsCount);
            setLoader(false);
        }
    ).catch((error) => {
        setError({
            statusCode: error
        });
    });
}

export const getParticipants = (searchParams, setPatients, setLoader, setError) => {
    setLoader(true);
    fetch('/api/projects/get-participants?' + searchParams)
    .then(
        (response) => {
            if(response.ok) {
                return response.json();
            }
            throw (response.status);
        }
    ).then(
        data => {
            if(data.statusCode !== 200) {
                setError({
                    statusCode: data.statusCode,
                    message: data.message
                })
            } else {
                setPatients(data.data.patients);
                setLoader(false);
            }
        }
    ).catch((error) => {
        setError({
            statusCode: error
        });
    });
}

export const getParticipantsCount = (searchParams, setPatientsCount, setError) => {
    fetch('/api/projects/participants-count?' + searchParams, {
        method: 'GET'
    }).then(
        (response) => {
            if(response.ok) {
                return response.json();
            }
            throw (response.status);
        }
    ).then(
        data => {
            setPatientsCount(data.data.patientsCount);
        }
    ).catch((error) => {
        setError({
            statusCode: error
        });
    });
}

export const getNotParticipants = (searchParams, setPatients, setLoader, setError) => {
    setLoader(true);
    fetch('/api/projects/get-not-participants?' + searchParams)
    .then(
        (response) => {
            if(response.ok) {
                return response.json();
            }
            throw (response.status);
        }
    ).then(
        data => {
            if(data.statusCode !== 200) {
                setError({
                    statusCode: data.statusCode,
                    message: data.message
                })
            } else {
                setPatients(data.data.patients);
                setLoader(false);
            }
        }
    ).catch((error) => {
        setError({
            statusCode: error
        });
    });
}

export const getNotParticipantsCount = (searchParams, setPatientsCount, setError) => {
    fetch('/api/projects/not-participants-count?' + searchParams, {
        method: 'GET'
    }).then(
        (response) => {
            if(response.ok) {
                return response.json();
            }
            throw (response.status);
        }
    ).then(
        data => {
            setPatientsCount(data.data.patientsCount);
        }
    ).catch((error) => {
        setError({
            statusCode: error
        });
    });
}

export const removeParticipant = (postParams, setLoader, setToastMessage) => {
    setLoader(true);
    fetch('/api/projects/remove-participant', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postParams)
    }).then(
        (response) => {
            if(response.ok) {
                return response.json();
            }
            throw (response.status);
        }
    ).then(
        data => {
            setToastMessage(data.message);
            setLoader(false);
        }
    ).catch((error) => {
        setToastMessage(`Wystąpił błąd podczas przetwarzania żądania (${error})`)
        setLoader(false);
    });
}

export const updateParticipant = (postParams, setLoader, setToastMessage) => {
    setLoader(true);
    fetch('/api/projects/update-participant', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postParams)
    }).then(
        (response) => {
            if(response.ok) {
                return response.json();
            }
            throw (response.status);
        }
    ).then(
        data => {
            setLoader(false);
            setToastMessage(data.message);
            window.location.reload();
        }
    ).catch((error) => {
        setToastMessage(`Wystąpił błąd podczas przetwarzania żądania (${error})`)
        setLoader(false);
    });
}

export const addPatientToProject = (postParams, setLoader, setToastMessage) => {
    setLoader(true);
    fetch('/api/projects/add-participant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postParams)
    }).then(
        (response) => {
            if(response.ok) {
                return response.json();
            }
            throw (response.status);
        }
    ).then(
        data => {
            setLoader(false);
            setToastMessage(data.message);
            window.location.reload();
        }
    ).catch((error) => {
        setToastMessage(`Wystąpił błąd podczas przetwarzania żądania (${error})`)
        setLoader(false);
    });
}