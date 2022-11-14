import React from "react";

export default function ModalButtons(props) {
    const { elementIDState, setModalOpened, loader, deleteAction, saveAction } = props;

    return (
        <div className="button-wrapper">
            <button 
                type="button" 
                className={elementIDState ? (!loader ? "button-icon button-danger" : "button-icon button-disabled") : "button hidden"} 
                onClick={() => deleteAction()}>
                    <i className="bi bi-trash3"></i>
                    <span>Usuń</span>
            </button>

            <div className="button-wrapper between">
                <button type="button" className={!loader ? "button-secondary" : "button-secondary button-disabled"} onClick={() => { setModalOpened(false); }}>Odrzuć zmiany</button>
                <button type="submit" className={!loader ? "button-primary" : "button-primary button-disabled"}>Zapisz</button>
            </div>
        </div>
    );
}