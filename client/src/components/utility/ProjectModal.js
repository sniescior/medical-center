import React, { useEffect, useState } from "react";
import '../../styles/modal/modal.css';
import { deleteProject, addProject } from "../../database/projectsQuery";

export default function ProjectModal(props) {

    // Edit patient or add a new patient
    const [projectID, setProjectID] = useState(null);
    const [name, setName] = useState('');

    // Action loader
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        setProjectID(props.modalData.id);
        setName(props.modalData.name);
    }, [props.modalData]);

    const defaultFieldValues = { name: '' }
    const [postParams, setPostParams] = useState(
        defaultFieldValues
    );

    const formFullyFilled = () => {
        if(postParams.name === '') {
            return false;
        }

        return true;
    }

    return (
        <div className={props.modalOpened ? "overlay" : "overlay hidden"}>
            <div className="modal">
                <div className="modal-header">
                    <h2>{projectID ? 'Edycja danych projektu' : 'Dodaj projekt'}</h2>
                    <button 
                        className={loader ? "hidden" : ""}
                        onClick={() => { props.setModalOpened(false); }}>
                        <i className="bi bi-x-lg"></i>
                    </button>
                    <span className={loader ? "loader spinning" : "loader none"}></span>
                </div>
                <span className="divider"></span>
                <form>
                    <div className={!loader ? "form-wrapper" : "form-wrapper disabled"}>
                        <div className="input-wrapper">
                            <label>Nazwa</label>
                            <input type="text" placeholder="Nazwa projektu" value={name} onChange={(e) => { setName(e.target.value); }} required />
                        </div>
                    </div>
                    <div className="button-wrapper between">
                        <button type="button" className={projectID ? (!loader ? "button-icon button-danger" : "button-icon button-disabled") : "button hidden"} onClick={(e) => { e.preventDefault(); deleteProject(props.modalData.id, props.refreshProjectsList, props.setModalOpened, setLoader, props.setToastMessage); }}><i className="bi bi-trash3"></i>Usuń</button>
                        <div className="button-wrapper">
                            <button type="button" className={!loader ? "button-secondary" : "button-secondary button-disabled"} onClick={(e) => { e.preventDefault(); props.setModalOpened(false);  }}>{projectID ? "Odrzuć zmiany" : "Anuluj"}</button>
                            <button
                                type="button"
                                className={!loader ? "button-primary" : "button-primary button-disabled"}
                                onClick={(e) => {
                                    e.preventDefault();
                                    if(!projectID) {    // no id -> means we are creating a brand new object
                                        if(formFullyFilled()) {
                                            const finalPostParams = { name: name }
                                            addProject(finalPostParams, props.refreshProjectsList, props.setModalOpened, setLoader, props.setToastMessage);
                                        }
                                    } else {
                                        console.log('Updating patient');
                                    }
                                }}
                                >
                                    {projectID ? "Zapisz" : "Dodaj"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
