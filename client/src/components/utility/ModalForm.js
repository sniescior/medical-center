import React from "react";

function ModalButtons(props) {
    const { elementIDState, setModalOpened, loader } = props;

    return (
        <div className="button-wrapper">
            <button 
                type="button" 
                className={elementIDState ? (!loader ? "button-icon button-danger" : "button-icon button-disabled") : "button hidden"} 
                onClick={() => { console.log('Delete element'); }}>
                    <i className="bi bi-trash3"></i>
                    Usuń
            </button>

            <div className="button-wrapper between">
                <button type="button" className={!loader ? "button-secondary" : "button-secondary button-disabled"} onClick={() => { setModalOpened(false); }}>Odrzuć zmiany</button>
                <button 
                    type="button" 
                    className={!loader ? "button-primary" : "button-primary button-disabled"}
                    onClick={(e) => { console.log('Submit modal form action goes here'); }}>
                        Zapisz
                </button>
            </div>
        </div>
    );
}

function switchRender(input) {
    switch (input.inputElement) {
        case 'input':
            return (
                <input type={input.type} value={input.state} onChange={(e) => input.setState(e.target.value)} />
            );

        case 'textarea':
            return (
                <textarea value={input.state} onChange={(e) => input.setState(e.target.value)} />
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
    const { setModalOpened, elementIDState, inputs, loader } = props;

    return (
        <form onSubmit={(e) => { e.preventDefault(); }}>
            <div className={!loader ? "form-wrapper" : "form-wrapper disabled"}>
                {inputs.map((input, key) => {
                    return (
                        <InputWrapper key={key} input={input} />
                    );
                })}
            </div>
            <ModalButtons elementIDState={elementIDState} setModalOpened={setModalOpened} loader={loader} />
        </form>
    )
}
