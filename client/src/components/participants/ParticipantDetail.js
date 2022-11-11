import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getItemQuery } from "../../database/participantQuery";
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
        getItemQuery(`/api/projects/${params.projectID}/get-participant/${params.patientID}`, new URLSearchParams({}), setParticipant, setError, setLoader);
    }, []);
    
    const openModal = () => {
        setModalData({patient_id: participant.id, first_name: participant.first_name, last_name: participant.last_name, consent: participant.consent, project_id: params.projectID })
        setModalOpened(true);
    }

    const openOrderModal = (element) => {
        setOrderModalData(element);
        setOrderModalOpened(true);
    }

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
                            Karta uczestnika projektu - <button className="button-link" onClick={() => navigate(`/projects/${project.id}`)}>{project.name}</button>
                        </h4>
                    </div>
                    <button className="action-button" onClick={() => { openModal(); }}>
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </button>
                </div>

                <div className="button-wrapper right">
                    <button className="button-primary" onClick={() => { openOrderModal({ order_id: '' }); }}><i className="bi bi-plus-lg"></i>Dodaj zlecenie</button>
                </div>

                <Orders 
                    orders={orders}
                    setLoader={setLoader}
                    patientID={params.patientID}
                    projectID={params.projectID}
                    setError={setError}
                    openModal={openOrderModal} />

                <OrderModal 
                    modalOpened={orderModalOpened}
                    setModalOpened={setOrderModalOpened}
                    modalData={orderModalData}
                    setModalData={() => {}}
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
