import React, { useState, useEffect } from "react";
import ModalForm from "../utility/ModalForm";

export default function ExaminationModal(props) {

  	const { modalData, modalOpened, setModalOpened } = props;

  	const [examinationID, setExaminationID] = useState(null);
  	const [title, setTitle] = useState('');
  	const [description, setDescription] = useState('');
  
  	const [loader, setLoader] = useState(false);

  	useEffect(() => {
    	setExaminationID(modalData.examination_id);
    	setTitle(modalData.examination_title);
    	setDescription(modalData.examination_description);
  	}, [modalData]);

  	const inputs = [
    	{
			label: 'Nazwa',
			state: title,
			setState: setTitle,
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
		console.log('Deleting examination', examinationID, title);
	}
	
	const saveExamination = () => {
		console.log('Saving examination', examinationID, title);
	}

	return (
		<div className={modalOpened ? "overlay" : "overlay hidden"}>
			<div className="modal">
				<div className="modal-header">
					<h2>{modalData.examination_title}</h2>
					<button 
						className={loader ? "hidden" : ""}
						onClick={() => { setModalOpened(false); }}>
						<i className="bi bi-x-lg"></i>
					</button>
					<span className={loader ? "loader spinning" : "loader none"}></span>
				</div>
				<span className="divider"></span>
				<ModalForm saveAction={saveExamination} deleteAction={deleteExamination} setModalOpened={setModalOpened} elementIDState={examinationID} loader={loader} inputs={inputs} />
			</div>
		</div>
	);
}
