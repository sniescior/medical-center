import React from "react";
import { INPUT_TYPES, INPUT_ELEMENTS } from "../../constants/inputs";
import ModalButtons from "./ModalButtons";

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
    const { tabs, setModalOpened, elementIDState, inputs, loader, saveAction, deleteAction } = props;

    return (
        <form onSubmit={(e) => { e.preventDefault(); }}>
            <div className={!loader ? "modal-content-wrapper" : "modal-content-wrapper disabled"}>
                {inputs.map((input, key) => {
                    return (
                        <InputWrapper key={key} input={input} />
                    );
                })}
            </div>
            {tabs? <></> :
                <ModalButtons saveAction={saveAction} deleteAction={deleteAction} elementIDState={elementIDState} setModalOpened={setModalOpened} loader={loader} />
            }
        </form>
    )
}
