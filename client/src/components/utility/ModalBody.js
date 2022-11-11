import React from "react";
import ModalForm from "./ModalForm";
import ModalHeader from "./ModalHeader";

export default function ModalBody(props) {
    const { title, loader, subtitle, setModalOpened, saveAction, deleteAction, elementIDState, inputs } = props;

    return (
        <div className="modal">
            <ModalHeader title={title} subtitle={subtitle} setModalOpened={setModalOpened} loader={loader} />
            <ModalForm saveAction={saveAction} deleteAction={deleteAction} setModalOpened={setModalOpened} elementIDState={elementIDState} inputs={inputs} loader={loader} />
        </div>
    );
}
