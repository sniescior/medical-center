import React, { useEffect, useRef, useState } from "react";

export default function Dropdown(props) {

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
                {props.values.map(value => {
                    return (
                        <option value={value} onClick={() => { props.handler(5); }}>{value}</option>
                    );
                })}
            </select>
        </div>
    );
};
