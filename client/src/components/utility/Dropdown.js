import React from "react";

export default function Dropdown(props) {
    const values = [5, 10, 15];
    return (
        <div className="dropdown">
            <button className="dropdown-button">
                {props.title}
                <i className="bi bi-chevron-down"></i>
            </button>
            <select 
                value={props.defaultValue} 
                onChange={(event) => {
                    props.handler(event.target.value);
                }}
            >
                {values.map(value => {
                    return (
                        <option key={value} value={value} onClick={() => { props.handler(5); }}>{value}</option>
                    );
                })}
            </select>
        </div>
    );
};
