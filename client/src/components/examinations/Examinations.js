import React, { useState, useEffect } from "react";
import ExaminationTable from "./ExaminationTable";
import { getArrayQuery } from "../../database/ordersQuery";

export default function Examinations(props) {
    const [pagesCount, setPagesCount] = useState(0);
    const [examinations, setExaminations] = useState([]);
    const [examinationsCount, setExaminationsCount] = useState(1);

    // queries parameters
    const [orderByColumn, setOrderByColumn] = useState('examination_id');
    const [order, setOrder] = useState('ASC');
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    // additional queries parameters
    const [idQuery, setIdQuery] = useState('');
    const [titleQuery, setTitleQuery] = useState('');

    const [tableLoader, setTableLoader] = useState(true);

    const searchParams = new URLSearchParams({
        page: pageNumber - 1,
        count: pageSize,
        orderByColumn: orderByColumn,
        order: order,
        idQuery: idQuery,
        titleQuery: titleQuery
    });

    useEffect(() => {
        props.countAction(searchParams, setExaminationsCount);

        let size = localStorage.getItem('pageSize')
        if(size) { setPageSize(size); }
    }, []);

    useEffect(() => {
        setPagesCount(Math.ceil(examinationsCount / pageSize));
        setPageNumber(1);
    }, [examinationsCount, pageSize]);

    useEffect(() => {
        let ignore = false;
        
        if(!ignore) { setTableLoader(true); }

        getArrayQuery('/api/examinations/get-examinations?', searchParams, props.setError, () => {})
        .then((data) => {
            if(!ignore) { 
                setExaminations(data);
                setTableLoader(false);
            }
        });

        return () => { ignore = true; }
    }, [pageSize, pageNumber, orderByColumn, order, idQuery, titleQuery, props.tableRefresh]);

    const headerData = [
        {
            title: 'ID',
            key: 'examination_id',
            query: idQuery,
            setQuery: setIdQuery,
            sort: true
        },
        {
            title: 'Tytu?? badania',
            key: 'title',
            query: titleQuery,
            setQuery: setTitleQuery,
            sort: true
        }
    ];

    const setSize = (value) => {
        setPageSize(value);
        localStorage.setItem('pageSize', value);
    }

    return (
        <ExaminationTable
            tableLoader={tableLoader}
            headerData={headerData}

            orderByColumn={orderByColumn}
            setOrderByColumn={setOrderByColumn}
            
            pagesCount={pagesCount}
            totalCount={examinationsCount}
            setPageNumber={setPageNumber}
            currentPage={pageNumber}
            pageSize={pageSize}
            
            setPageSize={setSize}

            order={order}
            setOrder={setOrder}
            items={examinations}
            itemsPerPage={pageSize}

            onClickAction={props.onClickAction}
        />
    );
}
