import React, { useEffect, useState } from "react";
import { getParticipants, getProjectDetails } from "../../database/projectsQuery";
import { fetchAllPatients } from "../../database/patientsQuery";
import ErrorPage from "../utility/ErrorPage";
import LoaderPage from "../utility/LoaderPage";
import PatientsTable from "../patients/PatientsTable";
import Toast from "../utility/Toast";
import ProjectModal from "./ProjectModal";
import { useParams } from "react-router-dom";

const headerData = [
    {
        key: 'id',
        title: 'ID',
    },
    {
        key: 'name',
        title: 'Imię',
    },
    {
        key: 'last_name',
        title: 'Nazwisko',
    },
];

export default function ProjectDetail(props) {

    const params = useParams();
    console.log(params.projectID);
    
    const [loader, setLoader] = useState(true);
    const [tableLoader, setTableLoader] = useState(false);
    const [error, setError] = useState({});

    const [modalOpened, setModalOpened] = useState(false);
    
    const [project, setProject] = useState({});
    const [patients, setPatients] = useState([]);

    const [order, setOrder] = useState('ASC');
    const [orderByColumn, setOrderByColumn] = useState('id');

    // filtering states
    const [consentOnly, setConsentOnly] = useState(false);
    const [participantsOnly, setParticipantsOnly] = useState(true);

    const defaultModalData = { id: '', name: '' }
    const [modalData, setModalData] = useState(defaultModalData);

    const refreshPage = () => {
        getProjectDetails(params.projectID, setProject, setLoader, setError)

        if(participantsOnly) {
            getParticipants(params.projectID, setPatients, setTableLoader, setError);
        } else {
            fetchAllPatients(setPatients, setTableLoader);
        }
    }

    useEffect(() => {
        refreshPage();
    }, [participantsOnly]);

    const openModal = () => {
        setModalData({ id: project.id, name: project.name });
        setModalOpened(true);
    };

    if(error.statusCode) {
        return ( <ErrorPage error={error} /> );
    } else {
        return (
            <div className="content">
                <LoaderPage loader={loader} />
                <div className="content-header">
                    <h2>{project.name}</h2>
                    <button className="action-button" onClick={() => {
                        openModal();
                    }}>
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </button>
                </div>
                <div className="content-info">
                    <div>
                        <h2>13-12-2020</h2>
                        <h4>data rozpoczęcia</h4>
                    </div>
                    <div>
                        <h2>32</h2>
                        <h4>zleceń</h4>
                    </div>
                    <div>
                        <h2>12</h2>
                        <h4>przeprowadzonych badań</h4>
                    </div>
                </div>

                <span className="divider"></span>

                <div className="button-wrapper">
                    <button
                        onClick={() => { setParticipantsOnly(!participantsOnly); }}
                        className={participantsOnly ? "button-filter active" : "button-filter"}>
                        <i className="bi bi-person-check-fill"></i>
                        Tylko uczestnicy
                    </button>
                    <button
                        onClick={() => { setConsentOnly(!consentOnly); }} 
                        className={consentOnly ? "button-filter active" : "button-filter"}>
                        <i className="bi bi-check-circle"></i>
                        Tylko ze zgodą
                    </button>
                </div>

                <PatientsTable participants={true} order={order} setOrder={setOrder} orderByColumn={orderByColumn} setOrderByColumn={setOrderByColumn} items={patients} headerData={headerData} />

                <ProjectModal refreshPage={refreshPage} setProjectID={props.setProjectID} modalOpened={modalOpened} setModalOpened={setModalOpened} modalData={modalData} setModalData={setModalData} setToastMessage={props.setToastMessage} />
                <Toast message={props.toastMessage} setToastMessage={props.setToastMessage} />
            </div>
        );
    }
};
