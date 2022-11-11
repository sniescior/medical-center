import React, { useEffect } from "react";
import ModalForm from "./ModalForm";
import ModalHeader from "./ModalHeader";
import TabsHeader from "./TabsHeader";
import ModalButtons from "./ModalButtons";

function ExaminationsTab(props) {
    return (
        <div className="modal-content-wrapper">
            Badania
        </div>
    );
}

export default function ModalBody(props) {
    const { title, loader, subtitle, setModalOpened, saveAction, deleteAction, elementIDState, inputs, tabs, activeTab, setActiveTab } = props;

    if(!tabs) {
        return (
            <div className="modal">
                <ModalHeader title={title} subtitle={subtitle} setModalOpened={setModalOpened} loader={loader} />
                <ModalForm saveAction={saveAction} deleteAction={deleteAction} setModalOpened={setModalOpened} elementIDState={elementIDState} inputs={inputs} loader={loader} />
            </div>
        );
    } else {
        return (
            <div className="modal high">
                <ModalHeader title={title} subtitle={subtitle} setModalOpened={setModalOpened} loader={loader} />
                <div className="modal-tabs-wrapper">
                    <TabsHeader tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
                    <div className={activeTab == 0 ? "tab-wrapper" : "tab-wrapper active"}>
                        <ExaminationsTab />
                    </div>
                    <div className={activeTab == 1 ? "tab-wrapper" : "tab-wrapper active"}>
                        <ModalForm tabs={tabs} saveAction={saveAction} deleteAction={deleteAction} setModalOpened={setModalOpened} elementIDState={elementIDState} inputs={inputs} loader={loader} />
                    </div>
                </div>
                <ModalButtons saveAction={saveAction} deleteAction={deleteAction} elementIDState={elementIDState} setModalOpened={setModalOpened} loader={loader} />
            </div>
        );
    }
}
