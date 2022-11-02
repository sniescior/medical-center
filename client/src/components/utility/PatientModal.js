import React, { useEffect, useState } from "react";
import '../../styles/modal/modal.css';

export default function PatientModal(props) {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');

    useEffect(() => {
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

            setDateOfBirth(year + '-' + month + '-' + day);
        } catch(err) {}
        
    }, [props.modalData]);

    return (
        <div className={props.modalOpened ? "overlay" : "overlay hidden"}>
            <div className="modal">
                <div className="modal-header">
                    <h2>{firstName ? 'Edycja danych pacjenta' : 'Dodaj pacjenta'}</h2>
                    <button onClick={() => { props.setModalOpened(false); }}>
                        <i className="bi bi-x-lg"></i>
                    </button>
                </div>
                <span className="divider"></span>
                <div className="form-wrapper">
                    <div className="input-wrapper">
                        <label>Imię</label>
                        <input type="text" placeholder="John" value={firstName} onChange={(e) => { setFirstName(e.target.value); }} />
                    </div>
                    <div className="input-wrapper">
                        <label>Nazwisko</label>
                        <input type="text" placeholder="Smith" value={lastName} onChange={(e) => { setLastName(e.target.value); }} />
                    </div>
                    <div className="input-wrapper">
                        <label>E-mail</label>
                        <input type="text" placeholder="john.smith@example.com" value={email} onChange={(e) => { setEmail(e.target.value); }} />
                    </div>
                    <div className="input-wrapper">
                        <label>Adres</label>
                        <input type="text" placeholder="Stary Rynek 25" value={address} onChange={(e) => { setAddress(e.target.value); }} />
                    </div>
                    <div className="input-wrapper">
                        <label>Miasto</label>
                        <input type="text" placeholder="Poznań" value={city} onChange={(e) => { setCity(e.target.value); }} />
                    </div>
                    <div className="input-wrapper">
                        <label>Państwo</label>
                        <input type="text" placeholder="Polska" value={country} onChange={(e) => { setCountry(e.target.value); }} />
                    </div>
                    <div className="input-wrapper date">
                        <label>Data urodzenia</label>
                        <input className="day" min="1800-01-01" max="2030-12-31" type="date" value={dateOfBirth} onChange={(e) => { setDateOfBirth(e.target.value); }} />
                    </div>
                </div>
                <div className="button-wrapper">
                    <button className="button-secondary" onClick={() => { props.setModalOpened(false); }}>Odrzuć zmiany</button>
                    <button className="button-primary">Zapisz</button>
                </div>
            </div>
        </div>
    )
};
