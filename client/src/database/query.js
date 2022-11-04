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

export const fetchPatients = (searchParams, setPatients) => {
    fetch('/api/patients?' + searchParams).then(
        response => response.json()
    ).then(
        data => {
            setPatients(data.data.patients);
        }
    );
}

export const getPatientsCount = (searchParams, setPatientsCount) => {
    fetch('/api/patients/count-patients?' + searchParams).then(
        response => response.json()
    ).then(
        data => {
            setPatientsCount(data.data.patientsCount);
        }
    );
}
