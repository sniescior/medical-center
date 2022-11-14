import React, { useState, useEffect } from "react";
import { INPUT_ELEMENTS, INPUT_TYPES } from "../../constants/inputs";
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
			title: 'examinationname',
			label: 'Nazwa',
			state: examinationTitle,
			setState: setExaminationTitle,
			placeholder: 'Nazwa badania',
			inputElement: INPUT_ELEMENTS.INPUT,
			type: INPUT_TYPES.TEXT,
			required: true
    	},
		{
			title: 'examinationdescription',
			label: 'Opis',
			state: examinationDescription,
			setState: setExaminationDescription,
			placeholder: 'Opis badania',
			inputElement: INPUT_ELEMENTS.TEXTAREA,
			type: INPUT_TYPES.NONE,
			required: false
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
