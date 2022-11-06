import React, { useEffect, useState } from "react";
import '../../styles/modal/modal.css';
import { addProject, deleteProject, updateProject } from "../../database/projectsQuery";

export default function ProjectModal(props) {

    // Edit patient or add a new patient
    const [projectID, setProjectID] = useState(null);
    const [name, setName] = useState('');

    const defaultFieldValues = { name: name }
    const [postParams, setPostParams] = useState(
        defaultFieldValues
    );

    useEffect(() => {
        setProjectID(props.modalData.id);
        setName(props.modalData.name);
    }, [props.modalData]);

    useEffect(() => {
        setPostParams({ name: name });
    }, [name]);

    const formFullyFilled = () => {
        if(name === '') { return false; }

        return true;
    }
    
    // Action loader
    const [loader, setLoader] = useState(false);

    return (
        <div className={props.modalOpened ? "overlay" : "overlay hidden"}>
            <div className="modal">
                <div className="modal-header">
                    <h2>{projectID ? 'Edycja projektu' : 'Dodaj projekt'}</h2>
                    <button 
                        className={loader ? "hidden" : ""}
                        onClick={() => { props.setModalOpened(false);  props.setModalData({ id: '', name: '' }); }}>
                        <i className="bi bi-x-lg"></i>
                    </button>
                    <span className={loader ? "loader spinning" : "loader none"}></span>
                </div>
                <span className="divider"></span>
                <form onSubmit={(e) => {e.preventDefault();}}>
                    <div className={!loader ? "form-wrapper" : "form-wrapper disabled"}>
                        <div className="input-wrapper">
                            <label>Nazwa</label>
                            <input type="text" placeholder="Nazwa" value={name} onChange={(e) => { setName(e.target.value); }} required />
                        </div>
                    </div>
                    <div className="button-wrapper between">
                        <button 
                            type="button" 
                            className={projectID ? (!loader ? "button-icon button-danger" : "button-icon button-disabled") : "button hidden"} 
                            onClick={() => { 
                                deleteProject(props.modalData.id, props.setModalOpened, setLoader, props.setToastMessage, props.setProjectID);
                                }}>
                                <i className="bi bi-trash3"></i>Usuń
                        </button>
                        <div className="button-wrapper">
                        <button
                            type="button"
                            className={!loader ? "button-primary" : "button-primary button-disabled"}
                            onClick={() => {
                                if(!projectID) {    // no id -> means we are creating a brand new object
                                    if(formFullyFilled()) {
                                        const finalPostParams = { name: name }
                                        addProject(finalPostParams, props.setProjectID, props.setModalOpened, setLoader, props.setToastMessage);
                                    }
                                } else {
                                    const finalPutParams = { name: name }

                                    updateProject(projectID, finalPutParams, props.setProjectID, props.setModalOpened, setLoader, props.setToastMessage, props.refreshPage);
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
