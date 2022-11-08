import React from "react";

export default function TableSearchRow(props) {
    return (
        <tr className="search-row">
            {props.headerData.map((headerRow, key) => {
                if(headerRow.sort) {
                    return (
                        <th key={key}>
                            <div 
                                className="table-header-wrapper">
                                <input 
                                    type="text" 
                                    onChange={(e) => { headerRow.setQuery(e.target.value); }}
                                    placeholder={headerRow.title} />
                            </div>
                        </th>
                    );
                } else {
                    return (
                        <th key={key} className="dummy"></th>
                    );
                }
            })}
        </tr>
    );
};
