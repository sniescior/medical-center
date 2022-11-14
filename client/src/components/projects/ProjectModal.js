import React, { useEffect, useState } from "react";
import '../../styles/modal/modal.css';
import { useNavigate, useParams } from "react-router-dom";
import ModalBody from "../utility/ModalBody";
import { INPUT_ELEMENTS, INPUT_TYPES } from "../../constants/inputs";
import { addItem, deleteItem, updateItem } from "../../database/ordersQuery";

export default function ProjectModal(props) {
    const params = useParams()
    const navigate = useNavigate();
    const { modalData, modalOpened, setModalOpened, setModalData, setToastMessage, setRefreshState, refreshState } = props;

    const [projectID, setProjectID] = useState(null);
    const [name, setName] = useState('');

    const [modalTitle, setModalTitle] = useState(`Edycja danych projektu`);

    const [loader, setLoader] = useState(false);

    useEffect(() => {
        setProjectID(modalData.id);
        setName(modalData.name);

        if(params.projectID) {
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
            inputElement: INPUT_ELEMENTS.INPUT,
            type: INPUT_TYPES.TEXT,
            placeholder: 'Nazwa'
        }
    ];

    const deleteProjectAction = () => { 
        deleteItem(`/api/projects/${modalData.id}`, {}, setToastMessage, setLoader)
        .then((data) => {
            setToastMessage(data.message);
            navigate('/projects')
        });
    }

    const saveProjectAction = () => {
        if(projectID) {
            updateItem(`/api/projects/${projectID}`, { name: name }, setToastMessage, setLoader)
            .then((data) => {
                setModalOpened(false);
                setToastMessage(data.message);
                setRefreshState(!refreshState);
            })
        } else {
            addItem('/api/projects', { name: name }, setLoader, setToastMessage)
            .then((data) => {
                setLoader(false);
                setToastMessage(data.message)
                navigate(`/projects/${data.data.itemID}`)
            })
        }
    }

    return (
        <div className={modalOpened ? "overlay" : "overlay hidden"}>
            <ModalBody title={modalTitle} saveAction={saveProjectAction} deleteAction={deleteProjectAction} setModalOpened={setModalOpened} elementIDState={projectID} inputs={inputs} loader={loader}  />
        </div>
    );
};
