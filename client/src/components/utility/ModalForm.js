import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { INPUT_TYPES, INPUT_ELEMENTS } from "../../constants/inputs";
import ModalButtons from "./ModalButtons";

function SwitchRender(props) {
    const { input, register, errors } = props;
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
                        <div className="input-error-wrapper">
                            <input 
                                defaultValue={input.state}
                                className={errors[title] ? "error" : "no-error"} 
                                {...register(title, { required: input.required, pattern: input.pattern })} 
                                placeholder={input.placeholder} 
                                type={input.type} />
                            <span className={errors[title] ? "error" : "no-error"}>To pole jest wymagane</span>
                        </div>
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
    const { input, register, errors } = props;

    return (
        <div className="input-wrapper">
            <label>{input.label}</label>
            <SwitchRender errors={errors} register={register} input={input} />
        </div>
    );
}

export default function ModalForm(props) {
    const { modalOpened, setModalOpened, elementIDState, inputs, loader, saveAction, deleteAction } = props;

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const onSubmit = (data) => { saveAction(data); }

    useEffect(() => {
        reset();
    }, [modalOpened]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={!loader ? "modal-content-wrapper" : "modal-content-wrapper disabled"}>
                {inputs.map((input, key) => {
                    return (
                        <InputWrapper errors={errors} register={register} key={key} input={input} />
                        );
                    })}
            </div>
            <ModalButtons reset={reset} saveAction={saveAction} deleteAction={deleteAction} elementIDState={elementIDState} setModalOpened={setModalOpened} loader={loader} />
        </form>
    )
}
