import React, { useState, useEffect } from "react";
import { addExamination, editExamination, deleteExamination } from "../../database/examinationsQuery";
import ModalBody from "../utility/ModalBody";

export default function ExaminationModal(props) {

  	const { modalData, modalOpened, setModalOpened, setToastMessage } = props;

  	const [examinationID, setExaminationID] = useState(null);
  	const [examinationTitle, setExaminationTitle] = useState('');
  	const [examinationDescription, setExaminationDescription] = useState('');

	const [modalTitle, setModalTitle] = useState("Edycja danych badania");
  
  	const [loader, setLoader] = useState(false);

  	useEffect(() => {
    	setExaminationID(modalData.examination_id);
    	setExaminationTitle(modalData.examination_title);
    	setExaminationDescription(modalData.examination_description);
  	}, [modalData]);

  	const inputs = [
    	{
			label: 'Nazwa',
			state: examinationTitle,
			setState: setExaminationTitle,
			inputElement: 'input',
			type: 'text'
    	},
		{
			label: 'Description',
			state: examinationDescription,
			setState: setExaminationDescription,
			inputElement: 'textarea',
			type: ''
		}
  	];

	const deleteExaminationAction = () => { deleteExamination({ examinationID: examinationID }, setLoader, setToastMessage); }
	
	const saveExaminationAction = () => {
		if(examinationID) {
			editExamination({ examinationID: examinationID, examinationTitle: examinationTitle, examinationDescription: examinationDescription }, setLoader, setToastMessage);
		} else {
			addExamination({ examinationTitle: examinationTitle, examinationDescription: examinationDescription }, setLoader, setToastMessage);
		}
	}

	useEffect(() => {
		if(examinationID) {
			setModalTitle("Edycja danych badania");
		} else {
			setModalTitle("Dodaj badanie");
		}
	}, [examinationID]);

	return (
		<div className={modalOpened ? "overlay" : "overlay hidden"}>
			<ModalBody title={modalTitle} saveAction={saveExaminationAction} deleteAction={deleteExaminationAction} setModalOpened={setModalOpened} elementIDState={examinationID} inputs={inputs} loader={loader} />
		</div>
	);
}
