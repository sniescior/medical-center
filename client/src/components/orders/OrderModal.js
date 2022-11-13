import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { INPUT_ELEMENTS, INPUT_TYPES } from "../../constants/inputs";
import { addItem, deleteItem, getArrayQuery } from "../../database/ordersQuery";
import '../../styles/modal/modal.css';
import ModalBody from "../utility/ModalBody";
import ModalForm from "../utility/ModalForm";
import SelectableList from "../utility/SelectableList";

function ExaminationsTab(props) {
    const { modalOpened, elementIDState, selectedItems, setSelectedItems, setActiveTab } = props;

    const [titleQuery, setTitleQuery] = useState('');

    // For fetching data
    const [addedItems, setAddedItems] = useState([]);
    const [items, setItems] = useState([]);
    const [elementID, setElementID] = useState(elementIDState);

    // For displaying converted data in selectable list
    const [listItems, setListItems] = useState([]);
    const [addedListItems, setAddedListItems] = useState([]);

    useEffect(() => {
        if(!modalOpened) { 
            setElementID(null);
            setTitleQuery('');
            setSelectedItems(new Set());
        }
    }, [modalOpened]);

    useEffect(() => {
        var convertedItems = [];
        
        // Converting item list to make selectable list universal 
        convertedItems = items.map(item => {
            return {
                id: item.examination_id,
                title: item.title
            }
        });

        setListItems(convertedItems);

        if(elementIDState) {
            convertedItems = [];

            convertedItems = addedItems.map(item => {
                return {
                    id: item.examination_id,
                    title: item.title
                }
            });

            setAddedListItems(convertedItems);
        }

    }, [items, addedItems, titleQuery, modalOpened]);

    const refreshList = (setLoader, setError) => {
        if(elementIDState) {
            getArrayQuery(`/api/orders/examinations/${elementIDState}?`, new URLSearchParams({ titleQuery: titleQuery, assigned: 1 }), setError, setLoader)
                .then((data) => {
                    setAddedItems(data);
                });

            getArrayQuery(`/api/orders/examinations/${elementIDState}?`, new URLSearchParams({ titleQuery: titleQuery, assigned: 0 }), setError, setLoader)
                .then((data) => {
                    setItems(data);
                });
        } else {
            getArrayQuery('/api/examinations/get-examinations?', new URLSearchParams({ titleQuery: titleQuery }), setError, setLoader)
                .then((data) => {
                    setItems(data);
                });

            setAddedListItems([]);
        }
    }

    return (
        <div className="modal-content-wrapper">
            <SelectableList 
                modalOpened={modalOpened}
                setActiveTab={setActiveTab} 
                selectedItems={selectedItems} 
                setSelectedItems={setSelectedItems} 
                elementIDState={elementIDState} 
                titleQuery={titleQuery}
                setTitleQuery={setTitleQuery}
                addedItems={addedListItems}
                setAddedItems={setAddedListItems}
                items={listItems}
                setItems={setItems} 
                refreshList={refreshList} />
        </div>
    );
}

export default function OrderModal(props) {
    const params = useParams();
    const navigate = useNavigate();
    const { modalOpened, modalData, setModalOpened, setToastMessage, participantID } = props;
    
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
            console.log('Updating order', name, completionDate, selectedItems);
            console.log(selectedItems);
        } else {
            console.log('Adding new order', name, completionDate, selectedItems);
            const params = { title: name, completionDate: completionDate, examinations: Array.from(selectedItems), participantID: participantID };
            addItem('/api/orders/add?', params, setToastMessage, setLoader);
            console.log(selectedItems);
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
    const [selectedItems, setSelectedItems] = useState(new Set());

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

    const tabs = [
        {
            id: 0,
            title: 'Ogólne',
            icon: 'bi bi-pen',
            component: <ModalForm tabs={[]} saveAction={saveOrderAction} deleteAction={deleteOrderAction} setModalOpened={setModalOpened} elementIDState={modalData.order_id} inputs={inputs} loader={loader} />
        },
        {
            id: 1,
            title: 'Badania',
            icon: 'bi bi-activity',
            component: <ExaminationsTab modalOpened={modalOpened} setActiveTab={setActiveTab} selectedItems={selectedItems} setSelectedItems={setSelectedItems} elementIDState={modalData.order_id} />
        },
    ];

    return (
        <div className={props.modalOpened ? "overlay" : "overlay hidden"}>
            <ModalBody selectedItems={selectedItems} setSelectedItems={setSelectedItems} tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} title={modalTitle} subtitle={modalSubtitle} saveAction={saveOrderAction} deleteAction={deleteOrderAction} setModalOpened={setModalOpened} elementIDState={modalData.order_id} inputs={inputs} loader={loader} />
        </div>
    );
};
