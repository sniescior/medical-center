import React, { useEffect, useState } from "react";
import PatientList from "../components/patients/PatientList";
import Pagination from "../components/utility/Pagination";

export default function PatientsView() {

    const [pageNumber, setPageNumber] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [pagesCount, setPagesCount] = useState(0);
    const [pages, setPages] = useState([]);
    const [patients, setPatients] = useState([]);
    const [orderByColumn, setOrderByColumn] = useState('id');
    const [order, setOrder] = useState('DESC');

    useEffect(() => {
        fetch('/api/patients/count-patients').then(
            response => response.json()
        ).then(
            data => {
                const patientsCount = data.data.patientsCount;
                setPagesCount(Math.ceil(patientsCount/itemsPerPage));
            }
        )
    }, []);

    useEffect(() => {
        var array = [];
        for(var i = 0; i < pagesCount; i++) {
            array.push(i);
        }
        setPages(array);
    }, [pagesCount]);

    useEffect(() => {
        fetch('/api/patients?' + new URLSearchParams({
            page: pageNumber,           // requested page number (handled by server)
            count: itemsPerPage,         // patients number to return on single page
            orderByColumn: orderByColumn,
            order: order
        })).then(
            response => response.json()
        ).then(
            data => {
                setPatients(data.data.patients);
            }
        );
    }, [pageNumber]);

    return (
        <div>
            <div className="content">
                <h2>Pacjenci</h2>
                <PatientList orderByColumn={orderByColumn} setOrderByColumn={setOrderByColumn} order={order} setOrder={setOrder} patients={patients} />
                <Pagination setPageNumber={setPageNumber} pages={pages} currentPage={pageNumber} pagesCount={pagesCount} />
            </div>
        </div>
    );
}