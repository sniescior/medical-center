import React from "react";
import ModalForm from "./ModalForm";
import ModalHeader from "./ModalHeader";
import TabsHeader from "./TabsHeader";

export default function ModalBody(props) {
    const { deleteDisabled, saveDisabled, modalMessage, title, loader, subtitle, setModalOpened, saveAction, deleteAction, elementIDState, inputs, tabs, activeTab, setActiveTab } = props;

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
                <ModalHeader tabs={true} setActiveTab={setActiveTab} title={title} subtitle={subtitle} setModalOpened={setModalOpened} loader={loader} />
                <div className="modal-tabs-wrapper">
                    <TabsHeader tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
                    {tabs.map((tab, key) => {
                        return (
                            <div key={key} className={activeTab === tab.id ? "tab-wrapper active" : "tab-wrapper"}>
                                {tab.component}
                            </div>
                        );
                    })}
                </div>
                <div>
                    <div className={modalMessage !== '' ? "modal-message" : "modal-message hidden"}>
                        {modalMessage}
                    </div>
                    <div className="button-wrapper between">
                        {elementIDState ? 
                            <button 
                                className={deleteDisabled === false ? "button-secondary button-danger button-icon" : "button-secondary button-icon button-disabled"} 
                                onClick={() => { deleteAction(); }}>
                                    <i className="bi bi-trash3"></i>
                                    Usuń
                                    <span className={deleteDisabled === false ? "tooltip hidden" : "tooltip top"}>
                                        {props.deleteTooltip}
                                    </span>
                            </button>
                            : <></>
                        }
                        <div className="button-wrapper">
                            <button className="button-secondary" onClick={() => { setModalOpened(false); setActiveTab(0); }}>Odrzuć zmiany</button>
                            <button className={saveDisabled === 0 ? "button-primary button-disabled" : "button-primary"} onClick={() => { saveAction(); }}>Zapisz</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
