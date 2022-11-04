import React, { useEffect, useState } from "react";
import PatientList from "../components/patients/PatientList";
import Pagination from "../components/utility/Pagination";
import Dropdown from "../components/utility/Dropdown";
import PatientModal from "../components/utility/PatientModal";
import { fetchPatients, getPatientsCount } from "../database/query";
import Toast from "../components/utility/Toast";
import EmptyTable from "../components/utility/EmptyTable";

export default function PatientsView() {

    const [pagesCount, setPagesCount] = useState(0);
    const [pages, setPages] = useState([]);
    const [patients, setPatients] = useState([]);
    const [patientsCount, setPatientsCount] = useState(1);

    // toast messages
    const [toastMessage, setToastMessage] = useState('');
    
    // queries parameters
    const [orderByColumn, setOrderByColumn] = useState('id');
    const [order, setOrder] = useState('ASC');
    const [pageNumber, setPageNumber] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    // patient details modal states
    const [modalOpened, setModalOpened] = useState(false);

    const defaultModalData = { id: '', first_name: '', last_name: '', email: '', address: '', city: '', country: '', date_of_birth: '' }
    const [modalData, setModalData] = useState(
        defaultModalData
    );

    // additional queries parameters
    const [idQuery, setIdQuery] = useState('');
    const [first_nameQuery, setFirst_nameQuery] = useState('');
    const [last_nameQuery, setLast_nameQuery] = useState('');
    const [emailQuery, setEmailQuery] = useState('');
    const [addressQuery, setAddressQuery] = useState('');
    const [cityQuery, setCityQuery] = useState('');
    const [countryQuery, setCountryQuery] = useState('');
    const [date_of_birthQuery, setDate_of_birthQuery] = useState('');

    const searchParams = new URLSearchParams({
        page: pageNumber,               // requested page number (handled by server)
        count: itemsPerPage,            // patients number to return on single page
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
    })

    useEffect(() => {
        getPatientsCount(searchParams, setPatientsCount);
    });
        
    useEffect(() => {
        setPagesCount(Math.ceil(patientsCount/itemsPerPage));
    }, [patientsCount, itemsPerPage]);

    useEffect(() => {
        var array = [];
        for(var i = 0; i < pagesCount; i++) array.push(i);
        setPages(array);
    }, [pagesCount, itemsPerPage, patients]);

    const refreshPatientsList = () => {
        fetchPatients(searchParams, setPatients);
    }
    
    useEffect(() => {
        // If page would be empty -> go back
        if(patients.length == 0 && pageNumber > 0) {
            setPageNumber(pageNumber - 1);
        }
    }, [patients]);

    const [fetched, setFetched] = useState(false);

    useEffect(() => {
        fetchPatients(searchParams, setPatients, setFetched);
    }, [itemsPerPage, pageNumber, orderByColumn, order, idQuery, first_nameQuery, last_nameQuery, emailQuery, addressQuery, cityQuery, countryQuery, date_of_birthQuery]);

    useEffect(() => {
        setPageNumber(0);
    }, [itemsPerPage]);

    return (
        <div>
            <div className="content">
                <div className="content-header">
                    <h2>Pacjenci</h2>
                    <button className="button-secondary" onClick={() => { setModalData(defaultModalData); setModalOpened(true); }}>
                        Dodaj pacjenta
                    </button>
                </div>

                {patients.length > 0 ?
                <>
                    <PatientList 
                        setModalOpened={setModalOpened}
                        setModalData={setModalData}
                        modalData={modalData}

                        orderByColumn={orderByColumn} 
                        setOrderByColumn={setOrderByColumn} 
                        setPageNumber={setPageNumber}

                        idQuery={idQuery}
                        first_nameQuery={first_nameQuery}
                        last_nameQuery={last_nameQuery}
                        emailQuery={emailQuery}
                        addressQuery={addressQuery}
                        cityQuery={cityQuery}
                        countryQuery={countryQuery}
                        date_of_birthQuery={date_of_birthQuery}

                        setIdQuery={setIdQuery}
                        setFirst_nameQuery={setFirst_nameQuery}
                        setLast_nameQuery={setLast_nameQuery}
                        setEmailQuery={setEmailQuery}
                        setAddressQuery={setAddressQuery}
                        setCityQuery={setCityQuery}
                        setCountryQuery={setCountryQuery}
                        setDate_of_birthQuery={setDate_of_birthQuery}

                        order={order} 
                        setOrder={setOrder} 
                        patients={patients} 
                        patientsCount={patientsCount}
                        itemsPerPage={itemsPerPage}
                    />
                    <div className="table-summary">
                        <p className="found">
                            {patients.length * (pageNumber + 1)} z {patientsCount}
                        </p>
                        <div className="dropdown-wrapper">
                            <p>Wyników na stronie</p>
                            <Dropdown title={itemsPerPage} handler={setItemsPerPage} defaultValue={itemsPerPage} values={[5, 10, 20]} />
                        </div>
                    </div>
                    <Pagination setPageNumber={setPageNumber} pages={pages} currentPage={pageNumber} pagesCount={pagesCount} itemsPerPage={itemsPerPage} />
                </>
                : fetched ?
                    <EmptyTable message={"Nie zarejestrowano żadnego pacjenta"} />
                    : ""
                }
                <PatientModal setToastMessage={setToastMessage} refreshPatientsList={refreshPatientsList} modalData={modalData} setModalData={setModalData} modalOpened={modalOpened} setModalOpened={setModalOpened} />
                <Toast message={toastMessage} setToastMessage={setToastMessage} />
            </div>
        </div>
    );
}