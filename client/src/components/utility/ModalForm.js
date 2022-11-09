import React from "react";
import { INPUT_TYPES, INPUT_ELEMENTS } from "../../constants/inputs";

function ModalButtons(props) {
    const { elementIDState, setModalOpened, loader, deleteAction, saveAction } = props;

    return (
        <div className="button-wrapper">
            <button 
                type="button" 
                className={elementIDState ? (!loader ? "button-icon button-danger" : "button-icon button-disabled") : "button hidden"} 
                onClick={() => deleteAction()}>
                    <i className="bi bi-trash3"></i>
                    Usuń
            </button>

            <div className="button-wrapper between">
                <button type="button" className={!loader ? "button-secondary" : "button-secondary button-disabled"} onClick={() => { setModalOpened(false); }}>Odrzuć zmiany</button>
                <button 
                    type="button" 
                    className={!loader ? "button-primary" : "button-primary button-disabled"}
                    onClick={(e) => saveAction()}>
                        Zapisz
                </button>
            </div>
        </div>
    );
}

function switchRender(input) {
    switch (input.inputElement) {
        case INPUT_ELEMENTS.INPUT:
            switch (input.type) {
                case INPUT_TYPES.CHECKBOX:
                    return (
                        <input type="checkbox" checked={input.state} onChange={(e) => input.setState(!input.state)} />
                    );
            
                default:
                    return (
                        <input placeholder={input.placeholder} type={input.type} value={input.state? input.state : ''} onChange={(e) => input.setState(e.target.value)} />
                    );
            }

        case INPUT_ELEMENTS.TEXTAREA:
            return (
                <textarea placeholder={input.placeholder} value={input.state? input.state : ''} onChange={(e) => input.setState(e.target.value)} />
            );
    
        default:
            break;
    }
}

function InputWrapper(props) {
    const { input } = props;

    return (
        <div className="input-wrapper">
            <label>{input.label}</label>
            {switchRender(input)}
        </div>
    );
}

export default function ModalForm(props) {
    const { setModalOpened, elementIDState, inputs, loader, saveAction, deleteAction } = props;

    return (
        <form onSubmit={(e) => { e.preventDefault(); }}>
            <div className={!loader ? "form-wrapper" : "form-wrapper disabled"}>
                {inputs.map((input, key) => {
                    return (
                        <InputWrapper key={key} input={input} />
                    );
                })}
            </div>
            <ModalButtons saveAction={saveAction} deleteAction={deleteAction} elementIDState={elementIDState} setModalOpened={setModalOpened} loader={loader} />
        </form>
    )
}
