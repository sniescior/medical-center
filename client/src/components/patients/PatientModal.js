import React, { useEffect, useState } from "react";
import '../../styles/modal/modal.css';
import { deletePatient, addPatient, editPatient } from "../../database/patientsQuery";
import ModalBody from "../utility/ModalBody";

export default function PatientModal(props) {

    const { modalData, modalOpened, setModalOpened, setToastMessage } = props;

    const [patientID, setPatientID] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');

    const [modalTitle, setModalTitle] = useState("Edycja danych pacjenta");
    
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        setPatientID(modalData.id);
        setFirstName(modalData.first_name);
        setLastName(modalData.last_name);
        setEmail(modalData.email);
        setAddress(modalData.address);
        setCity(modalData.city);
        setCountry(modalData.country);

        try {
            const date = new Date(props.modalData.date_of_birth).toLocaleDateString();
            
            var [day, month, year] = date.split('.');
            if(month.length < 2) { month = '0' + month; }
            if(day.length < 2) { day = '0' + day; }
            
            setDateOfBirth(`${year}-${month}-${day}`);
        } catch(err) {}
        
    }, [modalData]);

    const inputs = [
        {
            label: 'Imię',
            state: firstName,
            setState: setFirstName,
            inputElement: 'input',
            type: 'text'
        },
        {
            label: 'Nazwisko',
            state: lastName,
            setState: setLastName,
            inputElement: 'input',
            type: 'text'
        },
        {
            label: 'E-mail',
            state: email,
            setState: setEmail,
            inputElement: 'input',
            type: 'email'
        },
        {
            label: 'Adres',
            state: address,
            setState: setAddress,
            inputElement: 'input',
            type: 'text'
        },
        {
            label: 'Miasto',
            state: city,
            setState: setCity,
            inputElement: 'input',
            type: 'text'
        },
        {
            label: 'Państwo',
            state: country,
            setState: setCountry,
            inputElement: 'input',
            type: 'text'
        },
        {
            label: 'Data urodzenia',
            state: dateOfBirth,
            setState: setDateOfBirth,
            inputElement: 'input',
            type: 'date'
        },
    ]

    const deletePatientAction = () => {
        deletePatient(props.modalData.id, setLoader, props.setToastMessage);
    }
    
    const savePatientAction = () => {
        const params = { firstName: firstName, lastName: lastName, email: email, address: address, city: city, country: country, dateOfBirth: dateOfBirth };
        if(patientID) {
            editPatient(patientID, params, setLoader, setToastMessage);
        } else {
            addPatient(params, setLoader, setToastMessage);
        }
    }

    useEffect(() => {
		if(patientID) {
			setModalTitle("Edycja danych pacjenta");
		} else {
			setModalTitle("Dodaj pacjenta");
		}
	}, [patientID]);


    return (
        <div className={modalOpened ? "overlay" : "overlay hidden"}>
            <ModalBody title={modalTitle} saveAction={savePatientAction} deleteAction={deletePatientAction} setModalOpened={setModalOpened} elementIDState={patientID} inputs={inputs} loader={loader} />
        </div>
    );
};
