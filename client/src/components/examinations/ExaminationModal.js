import React, { useState, useEffect } from "react";
import { INPUT_ELEMENTS, INPUT_TYPES } from "../../constants/inputs";
import { addItem, deleteItem, updateItem } from "../../database/ordersQuery";
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

	const deleteExaminationAction = () => { 
		deleteItem('api/examinations/delete-examination', { examinationID: examinationID }, setToastMessage, setLoader)
			.then((data) => {
				setToastMessage(data.data);
				setLoader(false);
				setModalOpened(false);
				props.setTableRefresh(!props.tableRefresh);
			});
	}
	
	const saveExaminationAction = () => {
		if(examinationID) {
			updateItem('/api/examinations/edit-examination', { examinationID: examinationID, examinationTitle: examinationTitle, examinationDescription: examinationDescription }, setLoader, setToastMessage)
				.then((data) => {
					setToastMessage(data.data);
					setLoader(false);
					setModalOpened(false);
					props.setTableRefresh(!props.tableRefresh);
				});
		} else {
			addItem('/api/examinations/add-examination', { examinationTitle: examinationTitle, examinationDescription: examinationDescription }, setToastMessage, setLoader)
				.then((data) => {
					setToastMessage(data.data);
					setLoader(false);
					setModalOpened(false);
					props.setTableRefresh(!props.tableRefresh);
				});
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
