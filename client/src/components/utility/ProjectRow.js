import React from 'react';

export default function ProjectRow(props) {
  return (
        <tr onClick={() => { props.setProjectID(props.element.id); }} >
            <td onClick={() => { props.setModalOpened(true); }}> {props.element.id} </td>
            <td onClick={() => { props.setModalOpened(true); }}> {props.element.name} </td>
            <td onClick={() => { props.setModalOpened(true); }}> {props.element.participantsCount} </td>
        </tr>
    );
};
