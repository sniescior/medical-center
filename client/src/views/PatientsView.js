import React, { useEffect, useState } from "react";
import PatientModal from "../components/patients/PatientModal";
import { fetchPatients, getPatientsCount } from "../database/patientsQuery";
import Toast from "../components/utility/Toast";
import LoaderPage from "../components/utility/LoaderPage";
import PatientTable from "../components/patients/PatientTable";

export default function PatientsView() {
    const [loader, setLoader] = useState(true);

    const [pagesCount, setPagesCount] = useState(0);
    const [patients, setPatients] = useState([]);
    const [patientsCount, setPatientsCount] = useState(5);

    // toast messages
    const [toastMessage, setToastMessage] = useState('');
    
    // queries parameters
    const [orderByColumn, setOrderByColumn] = useState('id');
    const [order, setOrder] = useState('ASC');
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(5);

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
        page: pageNumber - 1,               // requested page number (handled by server)
        count: pageSize,            // patients number to return on single page
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
        getPatientsCount(searchParams, setPatientsCount, setLoader);
    });
        
    useEffect(() => {
        setPagesCount(Math.ceil(patientsCount / pageSize));
        setPageNumber(1);
    }, [patientsCount, pageSize]);

    const refreshPatientsList = () => { fetchPatients(searchParams, setPatients, setLoader); }

    useEffect(() => {
        fetchPatients(searchParams, setPatients, setLoader);
    }, [pageSize, pageNumber, orderByColumn, order, idQuery, first_nameQuery, last_nameQuery, emailQuery, addressQuery, cityQuery, countryQuery, date_of_birthQuery]);

    useEffect(() => { setPageNumber(1); }, [pageSize]);

    const headerData = [
        {
            title: 'ID',
            placeholder: 'ID',
            key: 'id',
            query: idQuery,
            setQuery: setIdQuery
        },
        {
            title: 'Imię',
            placeholder: 'Imię',
            key: 'first_name',
            query: first_nameQuery,
            setQuery: setFirst_nameQuery
        },
        {
            title: 'Nazwisko',
            placeholder: 'Nazwisko',
            key: 'last_name',
            query: last_nameQuery,
            setQuery: setLast_nameQuery
        },
        {
            title: 'E-mail',
            placeholder: 'mail@example.com',
            key: 'email',
            query: emailQuery,
            setQuery: setEmailQuery
        },
        {
            title: 'Adres',
            placeholder: 'Adres',
            key: 'address',
            query: addressQuery,
            setQuery: setAddressQuery
        },
        {
            title: 'Miasto',
            placeholder: 'Miasto',
            key: 'city',
            query: cityQuery,
            setQuery: setCityQuery
        },
        {
            title: 'Państwo',
            placeholder: 'Państwo',
            key: 'country',
            query: countryQuery,
            setQuery: setCountryQuery
        },
        {
            title: 'Data urodzenia',
            placeholder: 'dd-mm-yyyy',
            key: 'date_of_birth',
            query: date_of_birthQuery,
            setQuery: setDate_of_birthQuery
        },
    ];

    return (
        <div>
            <div className="content">
                <LoaderPage loader={loader} />
                <div className="content-header">
                    <h2>Pacjenci</h2>
                    <button className="button-secondary" onClick={() => { setModalData(defaultModalData); setModalOpened(true); }}>
                        Dodaj pacjenta
                    </button>
                </div>
                <PatientTable
                    headerData={headerData}
                    setModalOpened={setModalOpened}
                    setModalData={setModalData}
                    modalData={modalData}

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
                />
                <PatientModal setToastMessage={setToastMessage} refreshPatientsList={refreshPatientsList} modalData={modalData} setModalData={setModalData} modalOpened={modalOpened} setModalOpened={setModalOpened} />
                <Toast message={toastMessage} setToastMessage={setToastMessage} />
            </div>
        </div>
    );
}