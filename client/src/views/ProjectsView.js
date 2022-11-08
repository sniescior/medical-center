import React, { useState } from "react";
import { fetchProjects } from "../database/projectsQuery";
import LoaderPage from "../components/utility/LoaderPage";
import ProjectModal from "../components/projects/ProjectModal";
import Projects from "../components/projects/Projects";
import ErrorPage from "../components/utility/ErrorPage";

export default function ProjectsView(props) {
    const [loader, setLoader] = useState(true);

    const [modalOpened, setModalOpened] = useState(false);

    const defaultModalData = { id: '', name: '' }
    const [modalData, setModalData] = useState( defaultModalData );

    const [error, setError] = useState({});
    
    const refreshProjects = (searchParams, setProjects) => {  
        fetchProjects(searchParams, setProjects, setLoader, setError);
    }

    if(error.statusCode) {
        return ( <ErrorPage error={error} /> );
    } else {
        return (
            <div>
                <div className="content">
                    <LoaderPage loader={loader} />
                    <div className="content-header">
                        <h2>Projekty</h2>
                        <button 
                            className="button-secondary" 
                            onClick={() => { 
                                setModalData(defaultModalData);
                                setModalOpened(true);
                            }}>
                            Dodaj projekt
                        </button>
                    </div>
                    
                    <Projects 
                        onClickAction={() => {}} 
                        refreshAction={refreshProjects} 
                        setLoader={setLoader} 
                        setError={setError} />
                    
                    <ProjectModal setProjectID={props.setProjectID} modalOpened={modalOpened} setModalOpened={setModalOpened} modalData={modalData} setModalData={setModalData} setToastMessage={props.setToastMessage} />
                </div>
            </div>
        );
    }
}
