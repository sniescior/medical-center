import React from "react";

export default function PatientRow(props) {
    const date_of_birth = new Date(props.element.date_of_birth);
    const year = date_of_birth.getFullYear();
    const month = date_of_birth.getMonth();
    const date = date_of_birth.getDate();
    return (
        <tr onClick={() => props.onClickAction(props.element)}>
            <td>{props.element.id}</td>
            <td>{props.element.first_name}</td>
            <td>{props.element.last_name}</td>
            <td>{props.element.email}</td>
            <td>{props.element.address}</td>
            <td>{props.element.city}</td>
            <td>{props.element.country}</td>
            <td>{date}-{(month + 1).toString().length > 1 ? (month + 1) : '0' + (month + 1)}-{year}</td>
        </tr>
    );
};
