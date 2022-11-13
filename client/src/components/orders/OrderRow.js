import React from "react";

export default function OrderRow(props) {
    const raw_add_date = new Date(props.element.add_date);
    const add_date = { year: raw_add_date.getFullYear(), month: raw_add_date.getMonth() + 1, date: raw_add_date.getDate() };

    if(props.element.completion_date) {
        const raw_compl_date = new Date(props.element.completion_date);
        const compl_date = { year: raw_compl_date.getFullYear(), month: raw_compl_date.getMonth() + 1, date: raw_compl_date.getDate() };

        return (
            <tr onClick={() => { props.openModal(props.element); }} >
                <td>{props.element.order_id}</td>
                <td>{props.element.title}</td>
                <td>{add_date.year}-{add_date.month}-{add_date.date}</td>
                <td>{compl_date.year}-{compl_date.month}-{compl_date.date}</td>
            </tr>
        );
    } else {
        return (
            <tr onClick={() => { props.openModal(props.element); }} >
                <td>{props.element.order_id}</td>
                <td>{props.element.title}</td>
                <td>{add_date.year}-{add_date.month}-{add_date.date}</td>
                <td></td>
            </tr>
        );
    }
};
