import React, { useEffect, useState } from "react";
import '../../styles/modal/modal.css';
import { deletePatient, addPatient, updatePatient } from "../../database/patientsQuery";

export default function PatientModal(props) {

    // Edit patient or add a new patient
    const [patientID, setPatientID] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [monthOfBirth, setMonthOfBirth] = useState('');
    const [yearOfBirth, setYearOfBirth] = useState('');

    // Action loader
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        if(!patientID) {
            const date = new Date().toLocaleDateString();
            var [day, month, year] = date.split('.');
            if(month.length < 2) { month = '0' + month; }
            if(day.length < 2) { day = '0' + day; }

            setYearOfBirth(year);
            setMonthOfBirth(month);
            setDateOfBirth(day);
        }

        console.log('Date', dateOfBirth);
    });

    const setDate = (dateString) => {
        console.log('Default');
        var [year, month, date] = dateString.split('-');
        setDateOfBirth(date);
        setMonthOfBirth(month);
        setYearOfBirth(year);
    }

    useEffect(() => {
        setPatientID(props.modalData.id);
        setFirstName(props.modalData.first_name);
        setLastName(props.modalData.last_name);
        setEmail(props.modalData.email);
        setAddress(props.modalData.address);
        setCity(props.modalData.city);
        setCountry(props.modalData.country);

        try {
            const date = new Date(props.modalData.date_of_birth).toLocaleDateString();
            
            var [day, month, year] = date.split('.');
            if(month.length < 2) { month = '0' + month; }
            if(day.length < 2) { day = '0' + day; }

            setYearOfBirth(year);
            setMonthOfBirth(month);
            setDateOfBirth(day);
        } catch(err) {}
        
    }, [props.modalData]);
            
    const formFullyFilled = () => {
        if(firstName === '' || lastName === '' || email === '' || address === '' || city === '' || country === '' || dateOfBirth === '') {
            return false;
        }

        return true;
    }

    return (
        <div className={props.modalOpened ? "overlay" : "overlay hidden"}>
            <div className="modal">
                <div className="modal-header">
                    <h2>{patientID ? 'Edycja danych pacjenta' : 'Dodaj pacjenta'}</h2>
                    <button 
                        className={loader ? "hidden" : ""}
                        onClick={() => { props.setModalOpened(false); }}>
                        <i className="bi bi-x-lg"></i>
                    </button>
                    <span className={loader ? "loader spinning" : "loader none"}></span>
                </div>
                <span className="divider"></span>
                <form onSubmit={(e) => { e.preventDefault(); }}>
                    <div className={!loader ? "form-wrapper" : "form-wrapper disabled"}>
                        <div className="input-wrapper">
                            <label>Imię</label>
                            <input type="text" placeholder="John" value={firstName} onChange={(e) => { setFirstName(e.target.value); }} required />
                        </div>
                        <div className="input-wrapper">
                            <label>Nazwisko</label>
                            <input type="text" placeholder="Smith" value={lastName} onChange={(e) => { setLastName(e.target.value); }} required />
                        </div>
                        <div className="input-wrapper">
                            <label>E-mail</label>
                            <input type="email" placeholder="john.smith@example.com" value={email} onChange={(e) => { setEmail(e.target.value); }} required />
                        </div>
                        <div className="input-wrapper">
                            <label>Adres</label>
                            <input type="text" placeholder="Stary Rynek 25" value={address} onChange={(e) => { setAddress(e.target.value); }} required />
                        </div>
                        <div className="input-wrapper">
                            <label>Miasto</label>
                            <input type="text" placeholder="Poznań" value={city} onChange={(e) => { setCity(e.target.value); }} required />
                        </div>
                        <div className="input-wrapper">
                            <label>Państwo</label>
                            <input type="text" placeholder="Polska" value={country} onChange={(e) => { setCountry(e.target.value); }} required />
                        </div>
                        <div className="input-wrapper date">
                            <label>Data urodzenia</label>
                            <input className="day" min="1800-01-01" max="2030-12-31" type="date" value={yearOfBirth+ '-' + monthOfBirth + '-' + dateOfBirth} onChange={(e) => { console.log(dateOfBirth); setDateOfBirth(e.target.value); }} required />
                        </div>
                    </div>
                    <div className="button-wrapper between">
                        <button type="button" className={patientID ? (!loader ? "button-icon button-danger" : "button-icon button-disabled") : "button hidden"} onClick={() => { deletePatient(props.modalData.id, props.refreshPatientsList, props.setModalOpened, setLoader, props.setToastMessage); }}><i className="bi bi-trash3"></i>Usuń</button>
                        <div className="button-wrapper">
                            <button type="button" className={!loader ? "button-secondary" : "button-secondary button-disabled"} onClick={() => { props.setModalOpened(false);  }}>{patientID ? "Odrzuć zmiany" : "Anuluj"}</button>
                            <button
                                type="button"
                                className={!loader ? "button-primary" : "button-primary button-disabled"}
                                onClick={(e) => {
                                    const finalParams = { firstName: firstName, lastName: lastName, email: email, address: address, city: city, country: country, yearOfBirth: parseInt(yearOfBirth, 10), monthOfBirth: parseInt(monthOfBirth, 10), dateOfBirth: parseInt(dateOfBirth, 10) }
                                    if(!patientID) {    // no id -> means we are creating a brand new object
                                        if(formFullyFilled()) {
                                            addPatient(finalParams, props.refreshPatientsList, props.setModalOpened, setLoader, props.setToastMessage);
                                        }
                                    } else {
                                        if(formFullyFilled()) {
                                            updatePatient(patientID, finalParams, props.refreshPatientsList, props.setModalOpened, setLoader, props.setToastMessage);
                                        }
                                    }
                                }}
                                >
                                {patientID ? "Zapisz" : "Dodaj"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
