import React, { useEffect, useState } from "react";
import { getProjectsCount } from "../../database/projectsQuery";
import ProjectTable from "./ProjectTable";
import { getArrayQuery, getItemsCount } from "../../database/ordersQuery";

export default function Projects(props) {

    const [pagesCount, setPagesCount] = useState(0);
    const [projects, setProjects] = useState([]);
    const [projectsCount, setProjectsCount] = useState(1);

    // queries parameters
    const [orderByColumn, setOrderByColumn] = useState('id');
    const [order, setOrder] = useState('ASC');
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    // additional queries parameters
    const [idQuery, setIdQuery] = useState('');
    const [nameQuery, setNameQuery] = useState('');
    const [participantsCountQuery, setParticipantsCountQuery] = useState('');

    const [tableLoader, setTableLoader] = useState(true);

    const searchParams = new URLSearchParams({
        page: pageNumber - 1,
        count: pageSize,
        orderByColumn: orderByColumn,
        order: order,
        idQuery: idQuery,
        nameQuery: nameQuery,
        participantsCountQuery: participantsCountQuery
    });

    useEffect(() => {
        getProjectsCount(searchParams, setProjectsCount, props.setLoader, props.setError);
    }, []);
    
    useEffect(() => {
        setPagesCount(Math.ceil(projectsCount / pageSize));
        setPageNumber(1);
    }, [projectsCount, pageSize]);

    useEffect(() => {
        let ignore = false;

        if(!ignore) { setTableLoader(true); }

        getArrayQuery('/api/projects?', searchParams, props.setError, () => {})
        .then((data) => {
            if(!ignore) { 
                setProjects(data);
                setTableLoader(false);
            }
        });

        return () => { ignore = true; }
    }, [pageSize, pageNumber, orderByColumn, order, idQuery, nameQuery, participantsCountQuery]);

    useEffect(() => { setPageNumber(1); }, [pageSize]);

    const headerData = [
        {
            title: 'ID',
            key: 'id',
            query: idQuery,
            setQuery: setIdQuery,
            sort: true
        },
        {
            title: 'Nazwa',
            key: 'name',
            query: nameQuery,
            setQuery: setNameQuery,
            sort: true
        },
        {
            title: 'Liczba uczestników',
            key: 'participantsCount',
            query: participantsCountQuery,
            setQuery: setParticipantsCountQuery,
            sort: true
        }
    ];

    return (
        <ProjectTable
            tableLoader={tableLoader}
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
    );
}
