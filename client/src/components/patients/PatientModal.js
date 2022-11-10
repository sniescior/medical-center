import React, { useEffect, useState } from "react";
import '../../styles/modal/modal.css';
import { deletePatient, addPatient, editPatient } from "../../database/patientsQuery";
import ModalBody from "../utility/ModalBody";
import { INPUT_ELEMENTS, INPUT_TYPES } from "../../constants/inputs";

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

        if(modalData.id) {
            try {
                const date = new Date(props.modalData.date_of_birth).toLocaleDateString();
                
                var [day, month, year] = date.split('.');
                if(month.length < 2) { month = '0' + month; }
                if(day.length < 2) { day = '0' + day; }
                
                setDateOfBirth(`${year}-${month}-${day}`);
            } catch(err) {}
        } else {
            setDateOfBirth('');
        }
            
    }, [modalData]);

    const inputs = [
        {
            label: 'Imię',
            state: firstName,
            placeholder: 'Imię',
            setState: setFirstName,
            inputElement: INPUT_ELEMENTS.INPUT,
            type: INPUT_TYPES.TEXT
        },
        {
            label: 'Nazwisko',
            state: lastName,
            placeholder: 'Nazwisko',
            setState: setLastName,
            inputElement: INPUT_ELEMENTS.INPUT,
            type: INPUT_TYPES.TEXT
        },
        {
            label: 'E-mail',
            state: email,
            placeholder: 'E-mail',
            setState: setEmail,
            inputElement: INPUT_ELEMENTS.INPUT,
            type: INPUT_TYPES.EMAIL
        },
        {
            label: 'Adres',
            state: address,
            placeholder: 'Adres',
            setState: setAddress,
            inputElement: INPUT_ELEMENTS.INPUT,
            type: INPUT_TYPES.TEXT
        },
        {
            label: 'Miasto',
            state: city,
            placeholder: 'Miasto',
            setState: setCity,
            inputElement: INPUT_ELEMENTS.INPUT,
            type: INPUT_TYPES.TEXT
        },
        {
            label: 'Państwo',
            state: country,
            placeholder: 'Państwo',
            setState: setCountry,
            inputElement: INPUT_ELEMENTS.INPUT,
            type: INPUT_TYPES.TEXT
        },
        {
            label: 'Data urodzenia',
            state: dateOfBirth,
            placeholder: 'Data urodzenia',
            setState: setDateOfBirth,
            inputElement: INPUT_ELEMENTS.INPUT,
            type: INPUT_TYPES.DATE
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
