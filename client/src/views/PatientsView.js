import React, { useState } from "react";
import LoaderPage from "../components/utility/LoaderPage";
import Patients from "../components/patients/Patients";
import PatientModal from "../components/patients/PatientModal";
import ErrorPage from "../components/utility/ErrorPage";
import { getArrayQuery, getItemsCount } from "../database/ordersQuery";

export default function PatientsView(props) {
    const { setToastMessage } = props;

    const [loader, setLoader] = useState(false);

    const [tableRefresh, setTableRefresh] = useState(false);
    
    const defaultModalData = { id: '', first_name: '', last_name: '', email: '', address: '', city: '', country: '', date_of_birth: '' }
    const [modalOpened, setModalOpened] = useState(false);
    const [modalData, setModalData] = useState(defaultModalData);

    const [error, setError] = useState({});

    const openModal = (element) => {
        setModalData(element);
        setModalOpened(true);
    }

    const refreshPatients = (searchParams) => {
        return new Promise((resolve, reject) => {
            getArrayQuery('/api/patients?', searchParams, setError, () => {})
            .then((data) => {
                resolve(data)
            });
        });
    }

    const countAction = (searchParams, setPatientsCount) => { 
        getItemsCount('/api/patients/count-patients?', searchParams, setPatientsCount, setError, setLoader);
    }
    
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
                        tableRefresh={tableRefresh}
                        setTableRefresh={setTableRefresh}
                        refreshAction={refreshPatients}
                        setError={setError}
                        onClickAction={openModal}
                        countAction={countAction} />

                    <PatientModal 
                        tableRefresh={tableRefresh}
                        setTableRefresh={setTableRefresh}
                        setToastMessage={setToastMessage}
                        refreshPatientsList={refreshPatients}
                        modalData={modalData}
                        setModalData={setModalData}
                        modalOpened={modalOpened}
                        setModalOpened={setModalOpened} />
                </div>
            </div>
        );
    }
}