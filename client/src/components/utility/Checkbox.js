import React from "react";

export default function Checkbox(props) {
    return (
        <input
            className="checkbox"
            type="checkbox"
            name={props.name}
            checked={props.checked}
            onChange={() => { props.onChange(props.id); }}
        />
    );
}