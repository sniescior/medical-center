import React from 'react';
import { useNavigate } from 'react-router-dom';


export default function ProjectRow(props) {

    const navigate = useNavigate()

    return (
        <tr onClick={() => { navigate(`/projects/${props.element.id}`) }} >
            <td> {props.element.id} </td>
            <td> {props.element.name} </td>
            <td> {props.element.participantsCount} </td>
        </tr>
    );
};
