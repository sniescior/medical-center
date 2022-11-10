import React, { useState } from "react";
import Toast from "../components/utility/Toast";
import LoaderPage from "../components/utility/LoaderPage";
import Patients from "../components/patients/Patients";
import PatientModal from "../components/patients/PatientModal";
import { fetchPatients, getPatientsCount } from "../database/patientsQuery";
import ErrorPage from "../components/utility/ErrorPage";

export default function PatientsView(props) {
    const { toastMessage, setToastMessage } = props;

    const [loader, setLoader] = useState(true);
    
    const defaultModalData = { id: '', first_name: '', last_name: '', email: '', address: '', city: '', country: '', date_of_birth: '' }
    const [modalOpened, setModalOpened] = useState(false);
    const [modalData, setModalData] = useState(defaultModalData);

    const [error, setError] = useState({});

    const openModal = (element) => {
        setModalData(element);
        setModalOpened(true);
    }

    const refreshPatients = (searchParams, setPatients) => { fetchPatients(searchParams, setPatients, setLoader, setError); }
    const countAction = (searchParams, setPatientsCount) => { getPatientsCount(searchParams, setPatientsCount); }
    
    if(error.statusCode) {
        return <ErrorPage error={error} />
    } else {
        return (
            <div>
                <div className="content">
                    <LoaderPage loader={loader} />
                    <div className="content-header">
                        <h2>Pacjenci</h2>
                        <button className="button-secondary" onClick={() => { setModalData(defaultModalData); setModalOpened(true); }}>
                            Dodaj pacjenta
                        </button>
                    </div>
                    
                    <Patients 
                        onClickAction={openModal} 
                        refreshAction={refreshPatients}
                        countAction={countAction} />

                    <PatientModal setToastMessage={setToastMessage} refreshPatientsList={refreshPatients} modalData={modalData} setModalData={setModalData} modalOpened={modalOpened} setModalOpened={setModalOpened} />
                </div>
            </div>
        );
    }
}