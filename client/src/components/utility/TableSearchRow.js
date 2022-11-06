import React from "react";

export default function TableSearchRow(props) {
    return (
        <tr className="search-row">
            {props.headerData.map(headerRow => {
                return (
                    <th key={headerRow.key}>
                        <div 
                            className="table-header-wrapper">
                                <input 
                                    type="text" 
                                    onChange={(e) => { headerRow.setQuery(e.target.value); props.setPageNumber(0); }}
                                    placeholder={headerRow.title} 
                                />
                        </div>
                    </th>
                );
            })}
        </tr>
    );
};
