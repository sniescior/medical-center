import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { INPUT_ELEMENTS, INPUT_TYPES } from "../../constants/inputs";
import { deleteItem } from "../../database/ordersQuery";
import '../../styles/modal/modal.css';
import ModalBody from "../utility/ModalBody";

const tabs = [
    {
        id: 0,
        title: 'Ogólne',
        icon: 'bi bi-list-nested'
    },
    {
        id: 1,
        title: 'Badania',
        icon: 'bi bi-activity'
    },
];

export default function OrderModal(props) {
    const params = useParams();
    const navigate = useNavigate();
    const { modalData, setModalOpened, setToastMessage } = props;
    
    const [projectID, setProjectID] = useState(params.projectID);
    const [name, setName] = useState(false);
    const [completionDate, setCompletionDate] = useState('');

    const [modalTitle, setModalTitle] = useState(`Modyfikacja zlecenia`);
    const [modalSubtitle, setModalSubtitle] = useState('Podtytuł');
    
    const [loader, setLoader] = useState(false);

    const deleteOrderAction = () => { 
        deleteItem(`/api/orders/${modalData.order_id}`, { orderID: modalData.order_id }, setToastMessage, setLoader);
        setToastMessage("Deleting");
    }

    const saveOrderAction = () => { 
        if(modalData.order_id) {
            console.log('Updating order', name, completionDate);
        } else {
            console.log('Adding new order', name, completionDate);
        }
    }

    useEffect(() => {
        if(modalData.order_id !== '') {
            setModalTitle('Modyfikacja zlecenia');
            setName(modalData.title);
            setModalSubtitle(modalData.title);
            setCompletionDate(modalData.completion_date);
        } else {
            setName('');
            setCompletionDate('');
            setModalTitle('Dodaj zlecenie');
            setModalSubtitle('');
        }
    }, [modalData]);

    const [activeTab, setActiveTab] = useState(0);

    const inputs = [
        {
            label: 'Nazwa zlecenia',
            state: name,
            placeholder: 'Nazwa zlecenia',
            setState: setName,
            inputElement: INPUT_ELEMENTS.INPUT,
            type: INPUT_TYPES.TEXT
        },
        {
            label: 'Data realizacji',
            state: completionDate,
            placeholder: 'Nazwa zlecenia',
            setState: setCompletionDate,
            inputElement: INPUT_ELEMENTS.INPUT,
            type: INPUT_TYPES.DATE
        }
    ];

    return (
        <div className={props.modalOpened ? "overlay" : "overlay hidden"}>
            <ModalBody tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} title={modalTitle} subtitle={modalSubtitle} saveAction={saveOrderAction} deleteAction={deleteOrderAction} setModalOpened={setModalOpened} elementIDState={modalData.order_id} inputs={inputs} loader={loader} />
        </div>
    );
};
