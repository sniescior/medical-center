import React from "react";

export default function ParticipantRow(props) {
    const { element } = props;

    const date_of_birth = new Date(element.date_of_birth);
    const year = date_of_birth.getFullYear();
    const month = date_of_birth.getMonth();
    const date = date_of_birth.getDate();

    return (
        <tr className={element.consent ? "bg-success" : "bg-danger"} onClick={() => props.onClickAction(props.element)}>
            <td>{element.consent == 1 ? <span className="badge success">tak</span> : <span className="badge danger">brak</span>}</td>
            <td>{element.id}</td>
            <td>{element.first_name}</td>
            <td>{element.last_name}</td>
            <td>{element.email}</td>
            <td>{element.address}</td>
            <td>{element.city}</td>
            <td>{element.country}</td>
            <td>{date}-{(month + 1).toString().length > 1 ? (month + 1) : '0' + (month + 1)}-{year}</td>
        </tr>
    );
};
