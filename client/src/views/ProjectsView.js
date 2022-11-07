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
    const [projects, setProjects] = useState([]);
    const [projectsCount, setProjectsCount] = useState(1);
    
    // queries parameters
    const [orderByColumn, setOrderByColumn] = useState('id');
    const [order, setOrder] = useState('ASC');
    const [pageNumber, setPageNumber] = useState(0);
    const [pageSize, setPageSize] = useState(2);

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
        count: pageSize,            // projects number to return on single page
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
    }, [searchParams]);

    useEffect(() => {
        refreshProjectList();
    }, [pageSize, pageNumber, orderByColumn, order, idQuery, nameQuery, participantsCountQuery]);

    useEffect(() => {
        setPagesCount(Math.ceil(projectsCount / pageSize));
    }, [projectsCount, pageSize]);

    useEffect(() => {
        setPageNumber(0);
    }, [pageSize]);

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
                    itemsPerPage={pageSize}

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
                                <Dropdown title={pageSize} handler={setPageSize} defaultValue={pageSize} values={[5, 10, 20]} />
                            </div>
                        </div>
                        <Pagination pagesCount={pagesCount} totalCount={projectsCount} setPageNumber={setPageNumber} currentPage={pageNumber} pageSize={pageSize} />
                    </> : <EmptyTable message={"Nie znaleziono wyników spełniających podane kryteria"} />
                }
                
                <ProjectModal setProjectID={props.setProjectID} modalOpened={modalOpened} setModalOpened={setModalOpened} modalData={modalData} setModalData={setModalData} setToastMessage={props.setToastMessage} />
                <Toast message={props.toastMessage} setToastMessage={props.setToastMessage} />
            </div>
        </div>
    );
}
