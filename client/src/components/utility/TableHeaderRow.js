import React from "react";

export default function TableHeaderRow(props) {
    return (
        <tr>
            {props.headerData.map((headerRow, key) => {
                return (
                    <th key={key} className={props.noSort ? `${headerRow.class} non-hover` : headerRow.class}>
                        <div 
                            className={"table-header-wrapper "}
                            onClick={() => {
                                if(!props.noSort) {
                                    props.setOrderByColumn(headerRow.key);
                                    if(props.order === 'DESC') {
                                        props.setOrder('ASC');
                                    } else {
                                        props.setOrder('DESC');
                                    }
                                }
                            }}>
                            {headerRow.title}
                                {!props.noSort ?
                            <div className="control-icons">
                                <button className={props.orderByColumn === headerRow.key ? 'expand-button hidden' : 'expand-button'}>
                                    <i className="bi bi-chevron-expand"></i>
                                </button>
                                <div className={props.orderByColumn === headerRow.key ? '' : 'hidden'}>
                                    <i className={props.order === 'DESC' ? 'bi bi-caret-down-fill' : 'bi bi-caret-up-fill'}></i>
                                </div>
                            </div>
                                :
                                <>
                                </>
                                }
                        </div>
                    </th>
                );
            })}
        </tr>
    )
};
