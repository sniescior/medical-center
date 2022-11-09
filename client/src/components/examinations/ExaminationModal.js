import React, { useState, useEffect } from "react";
import ModalBody from "../utility/ModalBody";

export default function ExaminationModal(props) {

  	const { modalData, modalOpened, setModalOpened } = props;

  	const [examinationID, setExaminationID] = useState(null);
  	const [examinationTitle, setExaminationTitle] = useState('');
  	const [description, setDescription] = useState('');

	const [modalTitle, setModalTitle] = useState("Edycja danych badania");
  
  	const [loader, setLoader] = useState(false);

  	useEffect(() => {
    	setExaminationID(modalData.examination_id);
    	setExaminationTitle(modalData.examination_title);
    	setDescription(modalData.examination_description);
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
			state: description,
			setState: setDescription,
			inputElement: 'textarea',
			type: ''
		}
  	];

	const deleteExamination = () => {
		console.log('Deleting examination', examinationID, examinationTitle);
	}
	
	const saveExamination = () => {
		if(examinationID) {
			console.log('Saving examination', examinationID, examinationTitle);
		} else {
			console.log('Adding examination', examinationTitle);
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
			<ModalBody title={modalTitle} saveAction={saveExamination} deleteAction={deleteExamination} setModalOpened={setModalOpened} elementIDState={examinationID} inputs={inputs} loader={loader} />
		</div>
	);
}
