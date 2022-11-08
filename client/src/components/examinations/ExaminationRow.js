import React from "react";

export default function ExaminationRow(props) {
    return (
        <tr onClick={() => props.onClickAction(props.element)}>
            <td>{props.element.examination_id}</td>
            <td>{props.element.title}</td>
        </tr>
    );
};
