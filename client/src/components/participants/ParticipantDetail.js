import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getItem } from "../../database/ordersQuery";
import { getProjectDetails } from "../../database/projectsQuery";
import OrderModal from "../orders/OrderModal";
import Orders from "../orders/Orders";
import ErrorPage from "../utility/ErrorPage";
import LoaderPage from "../utility/LoaderPage";
import ParticipantModal from "./ParticipantModal";

export default function ParticipantDetail(props) {
    const params = useParams();
    const navigate = useNavigate();

    const [loader, setLoader] = useState(true);
    const [error, setError] = useState({});

    const defaultModalData = { patient_id: '', first_name: '', last_name: '', consent: '', project_id: '' };
    const [modalData, setModalData] = useState(defaultModalData);
    const [modalOpened, setModalOpened] = useState(false);

    const defaultOrderModalData = { order_id: '', participant_id: '', title: '', completion_date: '' };
    const [orderModalData, setOrderModalData] = useState(defaultModalData);
    const [orderModalOpened, setOrderModalOpened] = useState(false);

    const [participant, setParticipant] = useState({});
    const [project, setProject] = useState({});
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getProjectDetails(params.projectID, setProject, setLoader, setError);
        getItem(`/api/projects/${params.projectID}/get-participant/${params.patientID}`, new URLSearchParams({}), setParticipant, setError, setLoader);
        
    }, []);
    
    const openModal = () => {
        setModalData({patient_id: participant.id, first_name: participant.first_name, last_name: participant.last_name, consent: participant.consent, project_id: params.projectID })
        setModalOpened(true);
    }

    const openOrderModal = (element) => {
        setOrderModalData(element);
        setOrderModalOpened(true);
    }

    const [tableRefresh, setTableRefresh] = useState(false);

    if(error.statusCode) {
        return ( <ErrorPage error={error} /> );
    } else {
        return (
            <div className="content">
                <LoaderPage loader={loader} />
                <div className="content-header">
                    <div className="header-text">
                        <h2>
                            {participant.first_name} {participant.last_name}
                        </h2>
                        <h4>
                            Karta uczestnika projektu: <button className="button-link" onClick={() => navigate(`/projects/${project.id}`)}>{project.name}</button>
                        </h4>
                    </div>
                    <button className="action-button" onClick={() => { openModal(); }}>
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </button>
                </div>

                <div className="button-wrapper right">
                    <button className={participant.consent ? "button-primary" : "button-primary button-disabled"} onClick={() => { 
                        if(participant.consent) { openOrderModal({ order_id: '' }); }}}>
                        <i className="bi bi-plus-lg"></i>
                        Dodaj zlecenie
                        <span className={!participant.consent ? "tooltip left" : "tooltip hidden"}>
                            Pacjent nie wyraził zgody
                        </span>
                    </button>
                </div>

                <Orders 
                    tableRefresh={tableRefresh}
                    orders={orders}
                    setLoader={setLoader}
                    patientID={params.patientID}
                    participantID={participant.participant_id}
                    projectID={params.projectID}
                    setError={setError}
                    openModal={openOrderModal} />

                <OrderModal
                    tableRefresh={tableRefresh}
                    setTableRefresh={setTableRefresh}
                    modalOpened={orderModalOpened}
                    setModalOpened={setOrderModalOpened}
                    modalData={orderModalData}
                    setModalData={() => {}}
                    participantID={participant.participant_id}
                    setToastMessage={props.setToastMessage} />

                <ParticipantModal 
                    modalOpened={modalOpened}
                    setModalOpened={setModalOpened}
                    modalData={modalData}
                    setModalData={setModalData}
                    setToastMessage={props.setToastMessage} />
            </div>
        );
    }
}
