export const deletePatient = (id, refreshPatientsList, setModalOpened, setLoader, setToastMessage) => {
    setLoader(true);
    fetch(`/api/patients/${id}`, {
        method: 'DELETE'
    }).then(
        response => response.json()
    ).then(
        data => {
            refreshPatientsList();
            setToastMessage(data.message);
            setModalOpened(false);
            setLoader(false);
        }
    );
}

export const updatePatient = (id, putParams, refreshPatientsList, setModalOpened, setLoader, setToastMessage) => {
    setLoader(true);
    fetch(`/api/patients/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(putParams)
    }).then(
        response => response.json()
    ).then(
        data => {
            refreshPatientsList();
            setToastMessage(data.message);
            setModalOpened(false);
            setLoader(false);
        }
    );
}

export const fetchPatients = (searchParams, setPatients, setLoader) => {
    setLoader(true);
    fetch('/api/patients?' + searchParams).then(
        response => response.json()
    ).then(
        data => {
            setPatients(data.data.patients);
            setLoader(false);
        }
    );
}

export const fetchAllPatients = (setPatients, setLoader) => {
    setLoader(true);
    fetch('/api/patients/all').then(
        response => response.json()
    ).then(
        data => {
            setPatients(data.data.patients);
            setLoader(false);
        }
    );
}

export const getPatientsCount = (searchParams, setPatientsCount) => {
    fetch('/api/patients/count-patients?' + searchParams, {
        method: 'GET'
    }).then(
        response => response.json()
    ).then(
        data => {
            setPatientsCount(data.data.patientsCount);
        }
    );
}

export const addPatient = (postParams, refreshPatientsList, setModalOpened, setLoader, setToastMessage) => {
    setLoader(true);
    fetch('/api/patients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postParams)
    }).then(
        response => response.json()
    ).then(
        data => {
            setModalOpened(false);
            refreshPatientsList();
            setToastMessage(data.message);
            setLoader(false);
        }
    );
}