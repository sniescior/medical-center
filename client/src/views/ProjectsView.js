import React, { useState, useEffect } from "react";
import ProjectList from "../components/projects/ProjectList";
import Dropdown from "../components/utility/Dropdown";
import Pagination from "../components/utility/Pagination";
import EmptyTable from "../components/utility/EmptyTable";
import Toast from "../components/utility/Toast";
import { fetchProjects, getProjectsCount } from "../database/projectsQuery";
import LoaderPage from "../components/utility/LoaderPage";
import ProjectModal from "../components/projects/ProjectModal";

export default function ProjectsView(props) {
    const [loader, setLoader] = useState(true);

    const [pagesCount, setPagesCount] = useState(0);
    const [pages, setPages] = useState([]);
    const [projects, setProjects] = useState([]);
    const [projectsCount, setProjectsCount] = useState(1);
    
    // queries parameters
    const [orderByColumn, setOrderByColumn] = useState('id');
    const [order, setOrder] = useState('ASC');
    const [pageNumber, setPageNumber] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(5);

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
    });

    const headerData = [
        {
            title: 'ID',
            key: 'id',
            query: idQuery,
            setQuery: setIdQuery
        },
        {
            title: 'Nazwa',
            key: 'name',
            query: nameQuery,
            setQuery: setNameQuery
        },
        {
            title: 'Liczba uczestników',
            key: 'participantsCount',
            query: participantsCountQuery,
            setQuery: setParticipantsCountQuery
        }
    ];

    const refreshProjectList = () => {
        fetchProjects(searchParams, setProjects, setLoader);
    }
    
    useEffect(() => {
        getProjectsCount(searchParams, setProjectsCount, setLoader);
    }, []);

    useEffect(() => {
        refreshProjectList();
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
                <ProjectList
                    headerData={headerData}
                    
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
                
                <ProjectModal setProjectID={props.setProjectID} modalOpened={modalOpened} setModalOpened={setModalOpened} modalData={modalData} setModalData={setModalData} setToastMessage={props.setToastMessage} />
                <Toast message={props.toastMessage} setToastMessage={props.setToastMessage} />
            </div>
        </div>
    );
}
