import React, { useEffect, useState } from "react";
import '../../styles/toast/toast.css';

export default function Toast(props) {
    const { message, setToastMessage } = props;
    const [toastActive, setToastActive] = useState(false);
    
    const discardToast = () => {
        setToastActive(false);
        setTimeout(() => {
            setToastMessage('');
        }, 300);
    }

    useEffect(() => {
        if(message !== '') {
            setToastActive(true);
        } else {
            setToastActive(false);
        }
    }, [message]);

    return (
        <div className={toastActive ? "toast-wrapper": "toast-wrapper hidden"}>
            <h4>
                {message}
            </h4>
            <button className="button-icon" onClick={() => { discardToast(); }}>
                <i className="bi bi-x-lg"></i>
            </button>
        </div>
    );
};
