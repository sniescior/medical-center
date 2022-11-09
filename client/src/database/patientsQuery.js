export const deletePatient = (id, setLoader, setToastMessage) => {
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
            setToastMessage(data.message);
            window.location.href = '/patients';
        }
    ).catch((error) => {
        setToastMessage(`Wystąpił błąd podczas przetwarzania żądania (${error})`)
    })
}

export const editPatient = (id, putParams, setLoader, setToastMessage) => {
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
            setToastMessage(data.message);
            window.location.href = '/patients';
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

export const addPatient = (postParams, setLoader, setToastMessage) => {
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
            setToastMessage(data.message);
            window.location.href = '/patients';
        }
    ).catch((error) => {
        setToastMessage(`Wystąpił błąd podczas przetwarzania żądania (${error})`);
    });
}
