import React from "react";

export default function OrderRow(props) {
    const raw_add_date = new Date(props.element.add_date);
    const add_date = { year: raw_add_date.getFullYear(), month: raw_add_date.getMonth(), date: raw_add_date.getDate() };
    
    return (
        <tr onClick={() => { props.openModal(props.element); }} >
            <td>{props.element.order_id}</td>
            <td>{props.element.title}</td>
            <td>{add_date.year}-{add_date.month}-{add_date.date}</td>
            <td>{props.element.completion_date}</td>
        </tr>
    );
};
