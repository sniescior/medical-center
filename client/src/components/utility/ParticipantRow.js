import React from "react";

export default function ParticipantRow(props) {
    return (
        <tr>
            <td> {props.element.id} </td>
            <td> {props.element.first_name} </td>
            <td> {props.element.last_name} </td>
        </tr>
    );
};
