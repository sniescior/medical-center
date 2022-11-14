import React, { useState, useEffect } from "react";
import PatientTable from "./PatientTable";
import { getArrayQuery, getItemsCount } from "../../database/ordersQuery";

export default function Patients(props) {

    const { tableRefresh, setTableRefresh } = props;

    const [pagesCount, setPagesCount] = useState(0);
    const [patients, setPatients] = useState([]);
    const [patientsCount, setPatientsCount] = useState(5); 

    // queries parameters
    const [orderByColumn, setOrderByColumn] = useState('id');
    const [order, setOrder] = useState('ASC');
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    // additional queries parameters
    const [idQuery, setIdQuery] = useState('');
    const [first_nameQuery, setFirst_nameQuery] = useState('');
    const [last_nameQuery, setLast_nameQuery] = useState('');
    const [emailQuery, setEmailQuery] = useState('');
    const [addressQuery, setAddressQuery] = useState('');
    const [cityQuery, setCityQuery] = useState('');
    const [countryQuery, setCountryQuery] = useState('');
    const [date_of_birthQuery, setDate_of_birthQuery] = useState('');

    const [tableLoader, setTableLoader] = useState(true);

    const searchParams = new URLSearchParams({
        page: pageNumber - 1,               // requested page number (handled by server)
        count: pageSize,                    // patients number to return on single page
        orderByColumn: orderByColumn,
        order: order,
        idQuery: idQuery,
        first_nameQuery: first_nameQuery,
        last_nameQuery: last_nameQuery,
        emailQuery: emailQuery,
        addressQuery: addressQuery,
        cityQuery: cityQuery,
        countryQuery: countryQuery,
        date_of_birthQuery: date_of_birthQuery
    });

    useEffect(() => {
        props.countAction(searchParams, setPatientsCount);
    }, [tableRefresh]);
    
    useEffect(() => {
        setPagesCount(Math.ceil(patientsCount / pageSize));
        setPageNumber(1);
    }, [patientsCount, pageSize]);
    
    useEffect(() => {
        let ignore = false;

        if(!ignore) { setTableLoader(true); }

        props.refreshAction(searchParams)
        .then((data) => {
            if(!ignore) {
                setPatients(data);
                setTableLoader(false);
            }
        })

        return () => { ignore = true; }
    }, [tableRefresh, pageSize, pageNumber, orderByColumn, order, idQuery, first_nameQuery, last_nameQuery, emailQuery, addressQuery, cityQuery, countryQuery, date_of_birthQuery]);

    var defaultHeaderData = [
        {
            title: 'ID',
            placeholder: 'ID',
            key: 'id',
            query: idQuery,
            setQuery: setIdQuery,
            sort: true
        },
        {
            title: 'Imię',
            placeholder: 'Imię',
            key: 'first_name',
            query: first_nameQuery,
            setQuery: setFirst_nameQuery,
            sort: true
        },
        {
            title: 'Nazwisko',
            placeholder: 'Nazwisko',
            key: 'last_name',
            query: last_nameQuery,
            setQuery: setLast_nameQuery,
            sort: true
        },
        {
            title: 'E-mail',
            placeholder: 'mail@example.com',
            key: 'email',
            query: emailQuery,
            setQuery: setEmailQuery,
            sort: true
        },
        {
            title: 'Adres',
            placeholder: 'Adres',
            key: 'address',
            query: addressQuery,
            setQuery: setAddressQuery,
            sort: true
        },
        {
            title: 'Miasto',
            placeholder: 'Miasto',
            key: 'city',
            query: cityQuery,
            setQuery: setCityQuery,
            sort: true
        },
        {
            title: 'Państwo',
            placeholder: 'Państwo',
            key: 'country',
            query: countryQuery,
            setQuery: setCountryQuery,
            sort: true
        },
        {
            title: 'Data urodzenia',
            placeholder: 'dd-mm-yyyy',
            key: 'date_of_birth',
            query: date_of_birthQuery,
            setQuery: setDate_of_birthQuery,
            sort: true
        },
    ];

    const [headerData, setHeaderData] = useState(defaultHeaderData);

    useEffect(() => {
        if(props.headerData) { 
            defaultHeaderData.unshift(props.headerData[0]);
            setHeaderData(defaultHeaderData);
        }
    }, [props.headerData]);

    return (
        <PatientTable
            tableLoader={tableLoader}
            
            headerData={headerData}

            orderByColumn={orderByColumn} 
            setOrderByColumn={setOrderByColumn} 
            
            pagesCount={pagesCount}
            totalCount={patientsCount}
            setPageNumber={setPageNumber}
            currentPage={pageNumber}
            pageSize={pageSize}
            
            setPageSize={setPageSize}

            order={order} 
            setOrder={setOrder} 
            items={patients} 
            itemsPerPage={pageSize}

            onClickAction={props.onClickAction}

            participants={props.participants}
        />
    );
}
