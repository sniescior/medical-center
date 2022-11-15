import React from "react";
import Dropdown from "./Dropdown";
import Pagination from "./Pagination";

export default function TableSummary(props) {
    const { items } = props;
    if(items.length !== 0) {
        return (
            <>
                <div className="table-summary">
                    <p className="found">
                    </p>
                    <div className="dropdown-wrapper">
                        <p>Wyników na stronie</p>
                        <Dropdown 
                            title={props.pageSize} 
                            handler={props.setPageSize} 
                            defaultValue={props.pageSize} 
                            />
                    </div>
                </div>
                <Pagination
                    pagesCount={props.pagesCount}
                    totalCount={props.totalCount}
                    setPageNumber={props.setPageNumber}
                    currentPage={props.currentPage}
                    pageSize={props.pageSize}
                />
            </>
        );
    }
}
