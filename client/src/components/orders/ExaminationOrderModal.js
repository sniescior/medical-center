import React, { useEffect, useState } from "react";
import { INPUT_ELEMENTS, INPUT_TYPES } from "../../constants/inputs";
import { deleteItem, updateItem } from "../../database/ordersQuery";
import ModalBody from "../utility/ModalBody";

export default function ExaminationOrderModal(props) {
    const { modalData, setModalOpened, refreshState, setRefreshState, setToastMessage } = props;
    const [loader, setLoader] = useState(false);
    const modalTitle = "Wyniki badania";
    const [modalSubtitle, setModalSubtitle] = useState("");

    const [result, setResult] = useState("");

    useEffect(() => {
        setModalSubtitle(modalData.title);
        setResult(modalData.result);
    }, [modalData]);

    const inputs = [
        {
            title: 'examinationresult',
            label: 'Wynik badania',
            state: result,
            placeholder: 'Wynik badania',
            setState: setResult,
            inputElement: INPUT_ELEMENTS.TEXTAREA,
            type: INPUT_TYPES.TEXT,
            required: false
        }
    ];

    const deleteExaminationFromOrder = () => {
        deleteItem('/api/orders/delete-exam-ord', { examinationID: modalData.examination_id, orderID: modalData.order_id }, setToastMessage, setLoader)
        .then((data) => {
            setToastMessage(data.message);
            setRefreshState(!refreshState);
            setModalOpened(false);
            setLoader(false);
        });
    }

    const updateExaminationOrder = () => {
        updateItem('/api/orders/update-exam-order', { examinationID: modalData.examination_id, orderID: modalData.order_id, result: result }, setToastMessage, setLoader)
        .then((data) => {
            setToastMessage(data.message);
            setRefreshState(!refreshState);
            setModalOpened(false);
            setLoader(false);
        })
    }

    return (
        <div className={props.modalOpened ? "overlay" : "overlay hidden"}>
            <ModalBody loader={loader} deleteAction={deleteExaminationFromOrder} saveAction={updateExaminationOrder} elementIDState={true} title={modalTitle} subtitle={modalSubtitle} inputs={inputs} setModalOpened={setModalOpened} />
        </div>
    );
}