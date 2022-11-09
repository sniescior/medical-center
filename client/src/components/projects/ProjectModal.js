import React, { useEffect, useState } from "react";
import '../../styles/modal/modal.css';
import { addProject, deleteProject, editProject } from "../../database/projectsQuery";
import { useParams } from "react-router-dom";
import ModalBody from "../utility/ModalBody";

export default function ProjectModal(props) {
    const params = useParams()
    const { modalData, modalOpened, setModalOpened, setModalData, setToastMessage } = props;

    const [projectID, setProjectID] = useState(null);
    const [name, setName] = useState('');

    const [modalTitle, setModalTitle] = useState(`Edycja danych projektu`);

    const [loader, setLoader] = useState(false);

    useEffect(() => {
        setProjectID(modalData.id);
        setName(modalData.name);

        if(projectID) {
            setModalTitle('Edycja danych projektu');
        } else {
            setModalTitle('Dodaj nowy projekt');
        }
    }, [modalData]);

    const inputs = [
        {
            label: 'Nazwa',
            state: name,
            setState: setName,
            inputElement: 'input',
            type: 'text',
            placeholder: 'Nazwa'
        }
    ];

    const deleteProjectAction = () => { deleteProject(modalData.id, setLoader, setToastMessage); }

    const saveProjectAction = () => {
        if(projectID) {
            editProject(projectID, { name: name }, setLoader, setToastMessage);
        } else {
            addProject({ name: name }, setLoader, setToastMessage);
        }
    }

    return (
        <div className={modalOpened ? "overlay" : "overlay hidden"}>
            <ModalBody title={modalTitle} saveAction={saveProjectAction} deleteAction={deleteProjectAction} setModalOpened={setModalOpened} elementIDState={projectID} inputs={inputs} loader={loader}  />
        </div>
    );
};
