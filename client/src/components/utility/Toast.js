import React, { useEffect } from "react";
import '../../styles/toast/toast.css';

export default function Toast(props) {
    return (
        <div className={props.message ? "toast-wrapper": "toast-wrapper hidden"}>
            <h4>
                {props.message}
            </h4>
            <button className="button-icon" onClick={() => { props.setToastMessage(''); }}>
                <i className="bi bi-x-lg"></i>
            </button>
        </div>
    );
};
