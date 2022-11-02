import React from 'react';  

export default function AlertModal(props) {

    return (
        <div className={props.modalOpened ? "overlay" : "overlay hidden"}>
            <div className="modal alert">
                <div className="modal-header">
                    <h2>{props.title}</h2>
                </div>
                <div className="button-wrapper">
                    <button className="button-secondary" onClick={() => { props.setModalOpened(false); }}>Anuluj</button>
                    <button className="button-primary danger">Usuń</button>
                </div>
            </div>
        </div>
    );
};
