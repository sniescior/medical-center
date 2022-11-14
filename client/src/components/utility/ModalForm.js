import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { INPUT_TYPES, INPUT_ELEMENTS } from "../../constants/inputs";
import ModalButtons from "./ModalButtons";

function Input(props) {
    return (
        <input type="text" />
    );
}

function SwitchRender(props) {
    const { input, register, errors, control } = props;
    const title = input.title;

    switch (input.inputElement) {
        case INPUT_ELEMENTS.INPUT:
            switch (input.type) {
                
                case INPUT_TYPES.CHECKBOX:
                    return (
                        <input type="checkbox" checked={input.state} onChange={(e) => input.setState(!input.state)} />
                    );
            
                default:
                    return (
                        <input 
                            className={errors.title ? "error" : "no-error"} {...register(title, { required: input.required, pattern: input.pattern })} 
                            placeholder={input.placeholder} type={input.type} value={input.state? input.state : ''} 
                            onChange={(e) => { input.setState(e.target.value)} }
                            aria-invalid={errors.title ? "true" : "false"} />
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
    const { input, register, errors, control } = props;

    return (
        <div className="input-wrapper">
            <label>{input.label}</label>
            <SwitchRender control={control} errors={errors} register={register} input={input} />
        </div>
    );
}

export default function ModalForm(props) {
    const { tabs, setModalOpened, elementIDState, inputs, loader, saveAction, deleteAction } = props;

    const { control, register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = (data) => { saveAction(); }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={!loader ? "modal-content-wrapper" : "modal-content-wrapper disabled"}>
                {inputs.map((input, key) => {
                    return (
                        <InputWrapper control={control} errors={errors} register={register} key={key} input={input} />
                        );
                    })}
            </div>
            {tabs? <></> :
                <ModalButtons saveAction={saveAction} deleteAction={deleteAction} elementIDState={elementIDState} setModalOpened={setModalOpened} loader={loader} />
            }
        </form>
    )
}
