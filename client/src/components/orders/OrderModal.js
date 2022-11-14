import React, { useState, useEffect } from "react";
import { INPUT_ELEMENTS, INPUT_TYPES } from "../../constants/inputs";
import { addItem, deleteItem, getArrayQuery, updateItem } from "../../database/ordersQuery";
import '../../styles/modal/modal.css';
import ModalBody from "../utility/ModalBody";
import ModalForm from "../utility/ModalForm";
import SelectableList from "../utility/SelectableList";

function ResultsTab(props) {
    const { elementIDState } = props;

    if(elementIDState === '') {
        return (
            <div className="modal-content-wrapper center">
                <img className="modal-image" src="submit.svg"></img>
                <p>Zatwierdź zlecenie aby zarejestrować wyniki badań</p>
            </div>
        );
    } else {
        return (
            <div className="modal-content-wrapper">
                <p>Wprowadź resultat poszczególnych badań w ramach zlecenia</p>
            </div>
        );
    }
}

function ExaminationsTab(props) {
    const { consent, setToastMessage, modalOpened, elementIDState, selectedItems, setSelectedItems, setActiveTab } = props;

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

    const [refreshState, setRefreshState] = useState(true);

    const deleteExaminationFromOrder = (examination) => {
        deleteItem('/api/orders/delete-exam-ord', { examinationID: examination.id, orderID: elementIDState }, setToastMessage, () => {})
        .then((data) => {
            setToastMessage(data.message);
            setRefreshState(!refreshState);
        });
    }

    return (
        <div className="modal-content-wrapper">
            <SelectableList 
                editable={consent}
                refreshState={refreshState}
                deleteItemAction={deleteExaminationFromOrder}
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
    const { modalOpened, modalData, setModalOpened, setToastMessage, participantID } = props;
    
    const [name, setName] = useState(false);
    const [completionDate, setCompletionDate] = useState('');
    const [consent, setConsent] = useState(1);

    const [modalTitle, setModalTitle] = useState(`Modyfikacja zlecenia`);
    const [modalSubtitle, setModalSubtitle] = useState('Podtytuł');
    
    const [loader, setLoader] = useState(false);

    const [completed, setCompleted] = useState(true);

    const [modalMessage, setModalMessage] = useState("");
    const deleteTooltip = "Nie można usunąć. Zlecenie zostało wykonane";

    const orderCompleted = (date) => {
        // date <- order's completion date
        const today = new Date();
        const raw_compl_date = new Date(date);

        if(today.getTime() > raw_compl_date.getTime()) {
            return true;    // Order is already completed
        }
        
        return false;
    }

    const deleteOrderAction = () => {
        if(!orderCompleted(modalData.completion_date)) {
            deleteItem(`/api/orders/${modalData.order_id}`, { orderID: modalData.order_id }, setToastMessage, setLoader)
            .then((data) => { 
                setToastMessage("Usunięto zlecenie");
                window.location.reload();
            });
        }
    }

    const saveOrderAction = () => { 
        if(modalData.order_id) {
            if(modalData.consent !== 0) {
                updateItem('/api/orders/update-order', { orderID: modalData.order_id, title: name, completionDate: completionDate, examinations: Array.from(selectedItems) }, setToastMessage, setLoader)
                .then((data) => {
                    setToastMessage(data.message);
                    window.location.reload();
                });
            }
            
        } else {
            const params = { title: name, completionDate: completionDate, examinations: Array.from(selectedItems), participantID: participantID };
            addItem('/api/orders/add?', params, setToastMessage, setLoader);
        }
    }

    useEffect(() => {
        console.log(modalData);
        if(modalData.order_id !== '') {
            setModalTitle('Modyfikacja zlecenia');
            setName(modalData.title);
            setModalSubtitle(modalData.title);

            try {
                if(modalData.completion_date) {

                    const date = new Date(modalData.completion_date).toLocaleDateString();
                    
                    var [day, month, year] = date.split('.');
                    if(month.length < 2) { month = '0' + month; }
                    if(day.length < 2) { day = '0' + day; }
                    
                    setCompletionDate(`${year}-${month}-${day}`);
                    
                    // If an order has been completed set deleteState as false 
                    // to disable delete buttons
                    setCompleted(orderCompleted(modalData.completion_date));
                } else {
                    setCompletionDate('');
                    setCompleted(false);
                }
            } catch(err) {}

        } else {
            setName('');
            setCompletionDate('');
            setModalTitle('Dodaj zlecenie');
            setModalSubtitle('');
        }
    }, [modalData]);

    useEffect(() => {
        if(modalData.consent === 0) {
            setModalMessage("Nie można zapisać zmian. Brak zgody pacjenta.");
            setConsent(0);
        } else { setModalMessage(""); }
    }, [modalOpened]);

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
            component: <ExaminationsTab consent={consent} completed={completed} setToastMessage={setToastMessage} modalOpened={modalOpened} setActiveTab={setActiveTab} selectedItems={selectedItems} setSelectedItems={setSelectedItems} elementIDState={modalData.order_id} />
        },
        {
            id: 2,
            title: 'Wyniki',
            icon: 'bi bi-file-spreadsheet',
            component: <ResultsTab modalOpened={modalOpened} setActiveTab={setActiveTab} elementIDState={modalData.order_id} />
        },
    ];

    return (
        <div className={props.modalOpened ? "overlay" : "overlay hidden"}>
            <ModalBody
                deleteDisabled={completed}
                deleteTooltip={completed ? deleteTooltip : ""}
                modalMessage={modalMessage}
                saveDisabled={modalData.consent}
                saveTooltip={"Nie można zapisać"}
                selectedItems={selectedItems}
                setSelectedItems={setSelectedItems}
                tabs={tabs} activeTab={activeTab}
                setActiveTab={setActiveTab}
                title={modalTitle}
                subtitle={modalSubtitle}
                saveAction={saveOrderAction}
                deleteAction={deleteOrderAction}
                setModalOpened={setModalOpened}
                elementIDState={modalData.order_id}
                inputs={inputs}
                loader={loader} />
        </div>
    );
};
