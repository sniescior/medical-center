import React, { useState, useEffect } from "react";
import ProjectTable from "../components/projects/ProjectTable";
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
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(5);

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
        page: pageNumber - 1,               // requested page number (handled by server)
        count: pageSize,            // projects number to return on single page
        orderByColumn: orderByColumn,
        order: order,
        idQuery: idQuery,
        nameQuery: nameQuery,
        participantsCountQuery: participantsCountQuery
    });
    
    useEffect(() => {
        getProjectsCount(searchParams, setProjectsCount, setLoader);
    }, [searchParams]);
    
    useEffect(() => {
        setPagesCount(Math.ceil(projectsCount / pageSize));
        setPageNumber(1);
    }, [projectsCount, pageSize]);
    
    const refreshProjectList = () => { fetchProjects(searchParams, setProjects, setLoader); }

    useEffect(() => {
        refreshProjectList();
    }, [pageSize, pageNumber, orderByColumn, order, idQuery, nameQuery, participantsCountQuery]);

    useEffect(() => { setPageNumber(1); }, [pageSize]);

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
                <ProjectTable
                    headerData={headerData}
                    
                    items={projects}
                    
                    pagesCount={pagesCount}
                    totalCount={projectsCount}
                    setPageNumber={setPageNumber}
                    currentPage={pageNumber}
                    pageSize={pageSize}
                    
                    setPageSize={setPageSize}

                    orderByColumn={orderByColumn}
                    setOrderByColumn={setOrderByColumn}
                    order={order}
                    setOrder={setOrder}

                    setProjectID={props.setProjectID}
                />
                
                <ProjectModal setProjectID={props.setProjectID} modalOpened={modalOpened} setModalOpened={setModalOpened} modalData={modalData} setModalData={setModalData} setToastMessage={props.setToastMessage} />
            </div>
        </div>
    );
}
