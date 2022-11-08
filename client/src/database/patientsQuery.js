export const deletePatient = (id, refreshPatientsList, setModalOpened, setLoader, setToastMessage) => {
    setLoader(true);
    fetch(`/api/patients/${id}`, {
        method: 'DELETE'
    }).then(
        (response) => {
            if(response.ok) {
                return response.json();
            }
            throw (response.status);
        }
    ).then(
        data => {
            refreshPatientsList();
            setToastMessage(data.message);
            setModalOpened(false);
            setLoader(false);
        }
    ).catch((error) => {
        setToastMessage(`Wystąpił błąd podczas przetwarzania żądania (${error})`)
    })
}

export const updatePatient = (id, putParams, refreshPatientsList, setModalOpened, setLoader, setToastMessage) => {
    setLoader(true);
    fetch(`/api/patients/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(putParams)
    }).then(
        (response) => {
            if(response.ok) {
                return response.json();
            }
            throw (response.status);
        }
    ).then(
        data => {
            refreshPatientsList();
            setToastMessage(data.message);
            setModalOpened(false);
            setLoader(false);
        }
    ).catch((error) => {
        setToastMessage(`Wystąpił błąd podczas przetwarzania żądania (${error})`);
    });
}

export const fetchPatients = (searchParams, setPatients, setLoader, setError) => {
    setLoader(true);
    fetch('/api/patients?' + searchParams).then(
        (response) => {
            if(response.ok) {
                return response.json();
            }
            throw (response.status);
        }
    ).then(
        data => {
            setPatients(data.data.patients);
            setLoader(false);
        }
    ).catch((error) => {
        setError({
            statusCode: error
        });
    });
}

export const getPatientsCount = (searchParams, setPatientsCount, setError) => {
    fetch('/api/patients/count-patients?' + searchParams, {
        method: 'GET'
    }).then(
        response => response.json()
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

export const addPatient = (postParams, refreshPatientsList, setModalOpened, setLoader, setToastMessage) => {
    setLoader(true);
    fetch('/api/patients', {
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
            setModalOpened(false);
            refreshPatientsList();
            setToastMessage(data.message);
            setLoader(false);
        }
    ).catch((error) => {
        setToastMessage(`Wystąpił błąd podczas przetwarzania żądania (${error})`);
    });
}
