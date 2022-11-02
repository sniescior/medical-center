import React, { forwardRef, useEffect, useRef, useState } from "react";
import PatientList from "../components/patients/PatientList";
import Pagination from "../components/utility/Pagination";
import Dropdown from "../components/utility/Dropdown";
import PatientModal from "../components/utility/PatientModal";

export default function PatientsView() {

    const [pagesCount, setPagesCount] = useState(0);
    const [pages, setPages] = useState([]);
    const [patients, setPatients] = useState([]);
    const [patientsCount, setPatientsCount] = useState(1);
    
    // queries parameters
    const [orderByColumn, setOrderByColumn] = useState('id');
    const [order, setOrder] = useState('ASC');
    const [pageNumber, setPageNumber] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    // additional queries parameters
    const [idQuery, setIdQuery] = useState('');
    const [first_nameQuery, setFirst_nameQuery] = useState('');
    const [last_nameQuery, setLast_nameQuery] = useState('');
    const [emailQuery, setEmailQuery] = useState('');
    const [addressQuery, setAddressQuery] = useState('');
    const [cityQuery, setCityQuery] = useState('');
    const [countryQuery, setCountryQuery] = useState('');
    const [date_of_birthQuery, setDate_of_birthQuery] = useState('');

    // detailed modal states
    const [modalOpened, setModalOpened] = useState(false);
    const [modalData, setModalData] = useState(
        { id: '', first_name: '', last_name: '', email: '', address: '', city: '', country: '', date_of_birth: '' }
    );

    // { id: element.id, first_name: element.first_name, last_name: element.last_name, email: element.email, address: element.address, city: element.city, country: element.country }); 
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

    const fetchPatients = () => {
        fetch('/api/patients?' + searchParams).then(
            response => response.json()
        ).then(
            data => {
                setPatients(data.data.patients);
            }
        );
    }

    useEffect(() => {
        fetch('/api/patients/count-patients?' + searchParams).then(
            response => response.json()
        ).then(
            data => {
                setPatientsCount(data.data.patientsCount);
            }
        );
    });
        
    useEffect(() => {
        setPagesCount(Math.ceil(patientsCount/itemsPerPage));
    }, [patientsCount, itemsPerPage]);

    useEffect(() => {
        var array = [];
        for(var i = 0; i < pagesCount; i++) array.push(i);
        setPages(array);
    }, [pagesCount, itemsPerPage]);

    useEffect(() => {
        fetchPatients();
    }, [itemsPerPage, pageNumber, orderByColumn, order, idQuery, first_nameQuery, last_nameQuery, emailQuery, addressQuery, cityQuery, countryQuery, date_of_birthQuery]);

    return (
        <div>
            <div className="content">
                <h2>Pacjenci</h2>
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
                <PatientModal modalData={modalData} setModalData={setModalData} modalOpened={modalOpened} setModalOpened={setModalOpened} />
                <Pagination setPageNumber={setPageNumber} pages={pages} currentPage={pageNumber} pagesCount={pagesCount} itemsPerPage={itemsPerPage} />
            </div>
        </div>
    );
}