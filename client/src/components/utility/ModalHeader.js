import React from "react"

export default function ModalHeader(props) {
    const { title, loader, setModalOpened } = props;
    return (
        <div className="modal-header">
            <h2>{title}</h2>
            <button 
                className={loader ? "hidden" : ""}
				onClick={() => { setModalOpened(false); }}>
                    <i className="bi bi-x-lg"></i>
            </button>
            <span className={loader ? "loader spinning" : "loader none"}></span>
        </div>
    );
}
