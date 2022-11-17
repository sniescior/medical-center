import React from 'react';

export default function AlertModal(props) {

    const { modalData, action, modalOpened, setModalOpened, loader } = props;
    return (
        <div className={props.modalOpened ? "overlay" : "overlay hidden"}>
            <div className="modal alert">
                <div className="modal-header">
                    <h2>
                        {modalData.title}
                        <span>
                            {modalData.subtitle}
                        </span>
                    </h2>
                    <button 
                        className="close-modal-button"
                        onClick={() => { props.setModalOpened(false); }}>
                        <i className="bi bi-x-lg"></i>
                    </button>
                    <span className={loader ? "loader spinning" : "loader none"}></span>
                </div>
                <div className="button-wrapper">
                    <button className={!loader? "button-secondary" : "button-secondary button-disabled"} onClick={() => { props.setModalOpened(false); }}>Anuluj</button>
                    <button className={!loader? "button-primary" : "button-primary button-disabled"} onClick={() => { props.action(); }}>Zapisz</button>
                </div>
            </div>
        </div>
    );
};
