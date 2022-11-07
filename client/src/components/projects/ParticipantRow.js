import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { removeParticipant, updateParticipant } from "../../database/projectsQuery";

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
                        <li key={key} onClick={() => {action.action()}}><i className={action.icon}></i> {action.name}</li>
                    );
                })}
            </ul>
        </button>
    );
}

export default function ParticipantRow(props) {
    const { element, setLoader, setToastMessage, refreshPage } = props;
    const [consent, setConsent] = useState(props.element.consent);
    const [opened, setOpened] = useState(false);

    const params = useParams();

    const postParams = {
        consent: !element.consent,
        patientID: element.id,
        projectID: params.projectID
    }

    var actions = [
        {
            name: 'Usuń z projektu',
            icon: 'bi bi-person-dash',
            action: () => { removeParticipant(postParams, setLoader, setToastMessage, refreshPage); }
        },
        {
            name: 'Zmień zgodę',
            icon: 'bi bi-person-rolodex',
            action: () => { updateParticipant(postParams, setLoader, setToastMessage, refreshPage) }
        },
    ];

    return (
        <tr className={element.consent ? "non-hover bg-success" : "non-hover bg-danger"}>
            <td> {element.id} </td>
            <td> {element.first_name} </td>
            <td> {element.last_name} </td>
            <td> {element.consent == 1 ? <span className="badge success">tak</span> : <span className="badge danger">nie</span>} </td>
            <td> 
                <ActionButton postParams={postParams} opened={opened} setOpened={setOpened} onClickOutside={() => { setOpened(false); }} actions={actions} />
            </td>
        </tr>
    );
};
