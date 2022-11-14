import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { INPUT_ELEMENTS, INPUT_TYPES } from "../../constants/inputs";
import { removeParticipant, updateParticipant } from "../../database/projectsQuery";
import '../../styles/modal/modal.css';
import ModalBody from "../utility/ModalBody";

function ParticipantForm(props) {
    const { consent, setConsent } = props;
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="modal-content-wrapper">
                <div className="input-wrapper">
                    <label>Zgoda</label>
                    <input checked={consent} onClick={() => { setConsent(!consent); console.log(consent); }} type="checkbox" {...register("consent_field")}></input>
                </div>

            </div>
            <div className="button-wrapper">
                <button type="button" className="button-secondary">Anuluj</button>
                <button type="submit" className="button-primary">Zapisz</button>
            </div>
        </form>
    );
}

export default function ParticipantModal(props) {
    const params = useParams();
    const navigate = useNavigate();
    const { modalData, setModalOpened, setToastMessage } = props;
    
    const [projectID, setProjectID] = useState(params.projectID);
    const [consent, setConsent] = useState(false);

    const [modalTitle, setModalTitle] = useState(`Edycja danych uczestnika projektu`);
    const [modalSubtitle, setModalSubtitle] = useState('');
    
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        setConsent(modalData.consent ? true : false);
        setModalTitle(`Edycja danych uczestnika projektu`);
        setModalSubtitle(`${modalData.first_name} ${modalData.last_name}`);
    }, [modalData]);

    const inputs = [
        {
            title: 'consent',
            label: 'Zgoda na udział',
			state: consent,
			setState: setConsent,
			inputElement: INPUT_ELEMENTS.INPUT,
			type: INPUT_TYPES.CHECKBOX,
            required: false
        }
    ];

    const deleteParticipantAction = () => { 
        removeParticipant({ projectID: projectID, patientID: modalData.patient_id, consent: consent }, setLoader, setToastMessage); 
        navigate(`/projects/${projectID}`);
    }

    const saveParticipantAction = () => { 
        updateParticipant({ projectID: projectID, patientID: modalData.patient_id, consent: consent }, setLoader, setToastMessage); 
    }

    return (
        <div className={props.modalOpened ? "overlay" : "overlay hidden"}>
            {/* <ModalBody form={form} title={modalTitle} subtitle={modalSubtitle} saveAction={saveParticipantAction} deleteAction={deleteParticipantAction} setModalOpened={setModalOpened} elementIDState={projectID} loader={loader} /> */}
            <ModalBody title={modalTitle} subtitle={modalSubtitle} saveAction={saveParticipantAction} deleteAction={deleteParticipantAction} setModalOpened={setModalOpened} elementIDState={projectID} loader={loader} inputs={inputs} />
        </div>
    );
};
