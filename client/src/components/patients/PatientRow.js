import React from 'react'

export default function PatientRow(props) {
    const date_of_birth = new Date(props.element.date_of_birth);
    const year = date_of_birth.getFullYear();
    const month = date_of_birth.getMonth();
    const date = date_of_birth.getDate();
    return (
        <tr 
            onClick={() => {
                props.setModalData({
                    id: props.element.id,
                    first_name: props.element.first_name,
                    last_name: props.element.last_name,
                    email: props.element.email,
                    address: props.element.address,
                    city: props.element.city,
                    country: props.element.country,
                    date_of_birth: props.element.date_of_birth, });
            }} >
            <td onClick={props.onClickAction}>{props.element.id}</td>
            <td onClick={props.onClickAction}>{props.element.first_name}</td>
            <td onClick={props.onClickAction}>{props.element.last_name}</td>
            <td onClick={props.onClickAction}>{props.element.email}</td>
            <td onClick={props.onClickAction}>{props.element.address}</td>
            <td onClick={props.onClickAction}>{props.element.city}</td>
            <td onClick={props.onClickAction}>{props.element.country}</td>
            <td onClick={props.onClickAction}>{date}.{(month + 1).toString().length > 1 ? (month + 1) : '0' + (month + 1)}.{year}</td>
        </tr>
    );
};
