export const deletePatient = (id, refreshPatientsList, setToastMessage) => {
    fetch(`/api/patients/${id}`, {
        method: 'DELETE'
    }).then(
        response => response.json()
    ).then(
        data => {
            setToastMessage(data.message);
            refreshPatientsList();
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
