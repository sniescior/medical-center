import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { INPUT_ELEMENTS, INPUT_TYPES } from "../../constants/inputs";
import { removeParticipant, updateParticipant } from "../../database/projectsQuery";
import '../../styles/modal/modal.css';
import ModalBody from "../utility/ModalBody";

export default function ParticipantModal(props) {
    const params = useParams();
    const { modalData, setModalOpened, setToastMessage } = props;
    
    const [projectID, setProjectID] = useState(params.projectID);
    const [consent, setConsent] = useState(false);

    const [modalTitle, setModalTitle] = useState(`Edycja danych uczestnika`);
    
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        setConsent(modalData.consent ? true : false);
        setModalTitle(`Edycja danych uczestnika (${modalData.first_name} ${modalData.last_name})`);
    }, [modalData]);

    const inputs = [
        {
            label: 'Zgoda na udział',
			state: consent,
			setState: setConsent,
			inputElement: INPUT_ELEMENTS.INPUT,
			type: INPUT_TYPES.CHECKBOX
        }
    ];

    const deleteParticipantAction = () => { removeParticipant({ projectID: projectID, patientID: modalData.id, consent: consent }, setLoader, setToastMessage); }

    const saveParticipantAction = () => { updateParticipant({ projectID: projectID, patientID: modalData.id, consent: consent }, setLoader, setToastMessage); }

    return (
        <div className={props.modalOpened ? "overlay" : "overlay hidden"}>
            <ModalBody title={modalTitle} saveAction={saveParticipantAction} deleteAction={deleteParticipantAction} setModalOpened={setModalOpened} elementIDState={projectID} inputs={inputs} loader={loader} />
        </div>
    );
};
