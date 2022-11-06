import React from "react";

export default function TableHeaderRow(props) {
    return (
        <tr>
            {props.headerData.map(headerRow => {
                return (
                    <th key={headerRow.key}>
                        <div 
                            className="table-header-wrapper" 
                            onClick={() => {
                                props.setOrderByColumn(headerRow.key);
                                if(props.order === 'DESC') {
                                    props.setOrder('ASC');
                                } else {
                                    props.setOrder('DESC');
                                }
                            }}>
                            {headerRow.title}
                            <div className="control-icons">
                                <button className={props.orderByColumn === headerRow.key ? 'expand-button hidden' : 'expand-button'}>
                                    <i className="bi bi-chevron-expand"></i>
                                </button>
                                <div className={props.orderByColumn === headerRow.key ? '' : 'hidden'}>
                                    <i className={props.order === 'DESC' ? 'bi bi-caret-down-fill' : 'bi bi-caret-up-fill'}></i>
                                </div>
                            </div>
                        </div>
                    </th>
                );
            })}
        </tr>
    )
};
