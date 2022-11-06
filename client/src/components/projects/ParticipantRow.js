import React, { useState, useRef, useEffect } from "react";

function ActionButton(props) {

    const ref = useRef(null);
    const { onClickOutside, opened, setOpened, actions } = props;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                onClickOutside();
            }
        };
        
        document.addEventListener('click', handleClickOutside, true);
        
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };

    }, [onClickOutside]);
    

    return (
        <button ref={ref} className={opened ? "action-button opened" : "action-button"} onClick={() => {
            setOpened(!opened);
        }}>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <ul className="action-menu">
                {actions.map((action, key) => {
                    return (
                        <li key={key}><i className={action.icon}></i> {action.name}</li>
                    );
                })}
            </ul>
        </button>
    );
}

export default function ParticipantRow(props) {

    const [consent, setConsent] = useState(props.element.consent);
    const [opened, setOpened] = useState(false);

    var actions = [];
    if(consent) {
        actions = [
            {
                name: 'Usuń z projektu',
                icon: 'bi bi-person-dash',
                action: () => { console.log('Usuwanie pacjenta z projektu'); }
            },
            {
                name: 'Usuń zgodę',
                icon: 'bi bi-x-circle',
                action: () => { console.log('Zmiana informacji o zgodzie'); }
            },
        ];
    } else {
        actions = [
            {
                name: 'Usuń z projektu',
                icon: 'bi bi-person-dash',
                action: () => { console.log('Usuwanie pacjenta z projektu'); }
            },
            {
                name: 'Dodaj zgodę',
                icon: 'bi bi-check-circle',
                action: () => { console.log('Zmiana informacji o zgodzie'); }
            },
        ];
    }

    return (
        <tr className={props.element.consent ? "non-hover bg-success" : "non-hover bg-danger"}>
            <td> {props.element.id} </td>
            <td> {props.element.first_name} </td>
            <td> {props.element.last_name} </td>
            <td> {props.element.consent == 1 ? <span className="badge success">tak</span> : <span className="badge danger">nie</span>} </td>
            <td> 
                <ActionButton opened={opened} setOpened={setOpened} onClickOutside={() => { setOpened(false); }} actions={actions} />
            </td>
        </tr>
    );
};
