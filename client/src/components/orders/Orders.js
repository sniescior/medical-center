import React, { useState, useEffect } from "react";
import { getArrayQuery, getItemsCount } from "../../database/ordersQuery";
import OrderTable from "./OrderTable";

export default function Orders(props) {

    const { tableRefresh } = props;

    const [pagesCount, setPagesCount] = useState(0);
    const [orders, setOrders] = useState([]);
    const [ordersCount, setOrdersCount] = useState(5);

    const [orderByColumn, setOrderByColumn] = useState('order_id');
    const [order, setOrder] = useState('ASC');
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    const [idQuery, setIdQuery] = useState('');
    const [titleQuery, setTitleQuery] = useState('');
    const [addDateQuery, setAddDateQuery] = useState('');
    const [completionDateQuery, setCompletionDateQuery] = useState('');

    const [tableLoader, setTableLoader] = useState(true);
    const [paginationLoader, setPaginationLoader] = useState(false);

    const searchParams = new URLSearchParams({
        page: pageNumber - 1,               // requested page number (handled by server)
        count: pageSize,                    // patients number to return on single page
        orderByColumn: orderByColumn,
        order: order,
        idQuery: idQuery,
        titleQuery: titleQuery,
        addDateQuery: addDateQuery,
        completionDateQuery: completionDateQuery
    });

    var defaultHeaderData = [
        {
            title: 'ID',
            placeholder: 'ID',
            key: 'order_id',
            query: idQuery,
            setQuery: setIdQuery,
            sort: true
        },
        {
            title: 'Nazwa zlecenia',
            placeholder: 'Nazwa zlecenia',
            key: 'title',
            query: titleQuery,
            setQuery: setTitleQuery,
            sort: true
        },
        {
            title: 'Data dodania',
            placeholder: 'Data dodania',
            key: 'add_date',
            query: addDateQuery,
            setQuery: setAddDateQuery,
            sort: true
        },
        {
            title: 'Data realizacji',
            placeholder: 'Data realizacji',
            key: 'completion_date',
            query: completionDateQuery,
            setQuery: setCompletionDateQuery,
            sort: true
        }
    ];

    const [headerData, setHeaderData] = useState(defaultHeaderData);

    useEffect(() => {
        setTableLoader(true);
        getItemsCount(`/api/orders/count/${props.projectID}/${props.patientID}?`, searchParams, setOrdersCount, props.setError, setPaginationLoader);
        getArrayQuery(`/api/orders/${props.projectID}/${props.patientID}?`, searchParams, props.setError, () => {})
        .then((data) => {
            setOrders(data);
            setTableLoader(false);
        });
    }, [tableRefresh]);

    useEffect(() => {
        let size = localStorage.getItem('pageSize')
        if(size) { setPageSize(size); }
    }, []);
    
    useEffect(() => {
        setPagesCount(Math.ceil(ordersCount / pageSize));
        setPageNumber(1);
    }, [ordersCount, pageSize]);
    
    useEffect(() => {
        let ignore = false;
        
        if(!ignore) { setTableLoader(true); }

        getArrayQuery(`/api/orders/${props.projectID}/${props.patientID}?`, searchParams, props.setError, () => {})
        .then((data) => {
            if(!ignore) {
                setOrders(data);
                setTableLoader(false);
            }
        });

        return () => { ignore = true; }
    }, [pageSize, pageNumber, orderByColumn, order, idQuery, titleQuery, addDateQuery, completionDateQuery]);
    
    useEffect(() => {
        setPagesCount(Math.ceil(ordersCount / pageSize));
        setPageNumber(1);
    }, [ordersCount, pageSize]);

    const setSize = (value) => {
        setPageSize(value);
        localStorage.setItem('pageSize', value);
    }

    return (
        <OrderTable
            tableLoader={tableLoader}
            paginationLoader={paginationLoader}

            headerData={headerData}

            orderByColumn={orderByColumn}
            setOrderByColumn={setOrderByColumn}
            
            pagesCount={pagesCount}
            totalCount={ordersCount}
            setPageNumber={setPageNumber}
            currentPage={pageNumber}
            pageSize={pageSize}
            
            setPageSize={setSize}

            order={order}
            setOrder={setOrder}
            items={orders}
            itemsPerPage={pageSize}
            openModal={props.openModal} />
    );
}
