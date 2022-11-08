import React, { useState, useEffect } from "react";
import ExaminationTable from "./ExaminationTable";
import { getExaminations, getExaminationsCount } from "../../database/examinationsQuery";

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
    }, []);

    useEffect(() => {
        setPagesCount(Math.ceil(examinationsCount / pageSize));
        setPageNumber(1);
    }, [examinationsCount, pageSize]);

    useEffect(() => {
        props.refreshAction(searchParams, setExaminations);
    }, [pageSize, pageNumber, orderByColumn, order, idQuery, titleQuery]);

    const headerData = [
        {
            title: 'ID',
            key: 'examination_id',
            query: idQuery,
            setQuery: setIdQuery,
            sort: true
        },
        {
            title: 'Tytuł badania',
            key: 'title',
            query: titleQuery,
            setQuery: setTitleQuery,
            sort: true
        }
    ];

    return (
        <ExaminationTable
            headerData={headerData}

            orderByColumn={orderByColumn}
            setOrderByColumn={setOrderByColumn}
            
            pagesCount={pagesCount}
            totalCount={examinationsCount}
            setPageNumber={setPageNumber}
            currentPage={pageNumber}
            pageSize={pageSize}
            
            setPageSize={setPageSize}

            order={order}
            setOrder={setOrder}
            items={examinations}
            itemsPerPage={pageSize}

            onClickAction={props.onClickAction}
        />
    );
}
