import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { removeParticipant, updateParticipant } from "../../database/projectsQuery";
import '../../styles/modal/modal.css';

export default function ParticipantModal(props) {
    const params = useParams();
    const { modalData, setModalOpened, setToastMessage, refreshPage } = props;
    
    useEffect(() => {
        setConsent(modalData.consent ? true : false);
    }, [modalData]);

    const [projectID, setProjectID] = useState(null);
    const [loader, setLoader] = useState(false);

    const [consent, setConsent] = useState(false);

    const defaultFieldValues = { projectID: modalData.projectID, patientID: modalData.id, consent: consent };
    const [postParams, setPostParams] = useState(
        defaultFieldValues
    );

    useEffect(() => {
        setPostParams({ projectID: params.projectID, patientID: modalData.id, consent: consent });
    }, [consent]);

    return (
        <div className={props.modalOpened ? "overlay" : "overlay hidden"}>
            <div className="modal">
                <div className="modal-header">
                    <h2>{modalData.first_name} {modalData.last_name}</h2>
                    <button 
                        className={loader ? "hidden" : ""}
                        onClick={() => { props.setModalOpened(false);  props.setModalData({ id: '', name: '' }); }}>
                        <i className="bi bi-x-lg"></i>
                    </button>
                    <span className={loader ? "loader spinning" : "loader none"}></span>
                </div>
                <form onSubmit={(e) => {e.preventDefault();}}>
                    <div className={!loader ? "form-wrapper" : "form-wrapper disabled"}>
                        <div className="input-wrapper">
                            <label>Zgoda na udział</label>
                            <input type="checkbox" checked={consent} onChange={() => setConsent(!consent)} />
                        </div>
                    </div>
                    <div className="button-wrapper between">
                        <button 
                            type="button" 
                            className={!loader ? "button-icon button-danger" : "button-icon button-disabled"}
                            onClick={() => removeParticipant(postParams, setLoader, setToastMessage, refreshPage)}>
                            <i className="bi bi-trash3"></i>Usuń z projektu
                        </button>
                        <div className="button-wrapper">
                            <button
                                type="button"
                                className={!loader ? "button-secondary" : "button-primary button-disabled"}
                                onClick={() => setModalOpened(false)}>
                                Anuluj
                            </button>
                            <button
                                type="button"
                                className={!loader ? "button-primary" : "button-primary button-disabled"}
                                onClick={() => updateParticipant(postParams, setLoader, setToastMessage, refreshPage, setModalOpened)}>
                                Zapisz
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
