import React, { useState, useEffect } from "react";
import ProjectList from "../components/projects/ProjectList";
import Dropdown from "../components/utility/Dropdown";
import Pagination from "../components/utility/Pagination";
import EmptyTable from "../components/utility/EmptyTable";
import Toast from "../components/utility/Toast";
import { fetchProjects, getProjectsCount } from "../database/projectsQuery";

export default function ProjectsView(props) {

    const [pagesCount, setPagesCount] = useState(0);
    const [pages, setPages] = useState([]);
    const [projects, setProjects] = useState([]);
    const [projectsCount, setProjectsCount] = useState(1);

    // toast messages
    const [toastMessage, setToastMessage] = useState('');
    
    // queries parameters
    const [orderByColumn, setOrderByColumn] = useState('id');
    const [order, setOrder] = useState('ASC');
    const [pageNumber, setPageNumber] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(2);

    // project details modal states
    const [modalOpened, setModalOpened] = useState(false);

    const defaultModalData = { id: '', name: '' }
    const [modalData, setModalData] = useState(
        defaultModalData
    );

    // additional queries parameters
    const [idQuery, setIdQuery] = useState('');
    const [nameQuery, setNameQuery] = useState('');
    const [participantsCountQuery, setParticipantsCountQuery] = useState('');

    const searchParams = new URLSearchParams({
        page: pageNumber,               // requested page number (handled by server)
        count: itemsPerPage,            // projects number to return on single page
        orderByColumn: orderByColumn,
        order: order,
        idQuery: idQuery,
        nameQuery: nameQuery,
        participantsCountQuery: participantsCountQuery
    })
    
    useEffect(() => {
        getProjectsCount(searchParams, setProjectsCount);
    });

    useEffect(() => {
        fetchProjects(searchParams, setProjects);
    }, [itemsPerPage, pageNumber, orderByColumn, order, idQuery, nameQuery, participantsCountQuery]);

    useEffect(() => {
        setPagesCount(Math.ceil(projectsCount/itemsPerPage));
    }, [projectsCount, itemsPerPage]);

    useEffect(() => {
        var array = [];
        for(var i = 0; i < pagesCount; i++) array.push(i);
        setPages(array);
    }, [pagesCount, itemsPerPage, projects]);

    useEffect(() => {
        // If page would be empty -> go back
        if(projects.length == 0 && pageNumber > 0) {
            setPageNumber(pageNumber - 1);
        }
    }, [projects]);

    useEffect(() => {
        setPageNumber(0);
    }, [itemsPerPage]);

    return (
        <div>
            <div className="content">
                <div className="content-header">
                    <h2>Projekty</h2>
                    <button className="button-secondary" onClick={() => { setModalData(defaultModalData); setModalOpened(true); }}>
                        Dodaj projekt
                    </button>
                </div>
                    <ProjectList
                        setModalOpened={setModalOpened}
                        setModalData={setModalData}

                        idQuery={idQuery}
                        setIdQuery={setIdQuery}

                        nameQuery={nameQuery}
                        setNameQuery={setNameQuery}

                        participantsCountQuery={participantsCountQuery}
                        setParticipantsCountQuery={setParticipantsCountQuery}
                        
                        projects={projects}
                        projectsCount={projectsCount}
                        itemsPerPage={itemsPerPage}

                        orderByColumn={orderByColumn}
                        setOrderByColumn={setOrderByColumn}
                        order={order}
                        setOrder={setOrder}
                        setPageNumber={setPageNumber}

                        setProjectID={props.setProjectID}
                    />
                    {projects.length !== 0 ? 
                        <>
                            <div className="table-summary">
                                <p className="found">
                                    
                                </p>
                                <div className="dropdown-wrapper">
                                    <p>Wyników na stronie</p>
                                    <Dropdown title={itemsPerPage} handler={setItemsPerPage} defaultValue={itemsPerPage} values={[5, 10, 20]} />
                                </div>
                            </div>
                            <Pagination setPageNumber={setPageNumber} pages={pages} currentPage={pageNumber} pagesCount={pagesCount} itemsPerPage={itemsPerPage} />
                        </> : <EmptyTable message={"Nie znaleziono wyników spełniających podane kryteria"} />
                    }
                <Toast message={toastMessage} setToastMessage={setToastMessage} />
            </div>
        </div>
    );
}
