import React from 'react';

export default function ProjectRow(props) {
    return (
        <tr onClick={() => { props.setProjectID(props.element.id); }} >
            <td> {props.element.id} </td>
            <td> {props.element.name} </td>
            <td> {props.element.participantsCount} </td>
        </tr>
    );
};
