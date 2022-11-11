import React from "react"

export default function ModalHeader(props) {
    const { title, subtitle, loader, setModalOpened } = props;
    return (
        <div className="modal-header">
            <div className="header-text">
                <h2>{title}</h2>
                <h4>{subtitle}</h4>
            </div>
            <button 
                className={loader ? "hidden" : ""}
				onClick={() => { setModalOpened(false); }}>
                    <i className="bi bi-x-lg"></i>
            </button>
            <span className={loader ? "loader spinning" : "loader none"}></span>
        </div>
    );
}
