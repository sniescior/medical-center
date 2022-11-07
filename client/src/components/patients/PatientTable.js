import React from "react";
import EmptyTable from "../utility/EmptyTable";
import PatientRow from "./PatientRow";
import TableHeaderRow from "../utility/TableHeaderRow";
import TableSummary from "../utility/TableSummary";

export default function PatientTable(props) {
    return (
        <>
            <div className="table-wrapper">
                <table>
                    <thead>
                        <TableHeaderRow noSort={props.noSort} order={props.order} setOrder={props.setOrder} orderByColumn={props.orderByColumn} setOrderByColumn={props.setOrderByColumn} headerData={props.headerData} />
                    </thead>
                    <tbody>
                        {props.items.map((element, key) => {
                            return (
                                <PatientRow element={element} key={key} />
                            );
                        })}
                    </tbody>
                </table>
                {props.items.length == 0 ? <EmptyTable /> : <></> }
            </div>
            <TableSummary
                    pagesCount={props.pagesCount}
                    totalCount={props.totalCount}
                    setPageNumber={props.setPageNumber}
                    currentPage={props.currentPage}
                    pageSize={props.pageSize}

                    items={props.items}
                    setPageSize={props.setPageSize}
                    defaultValue={props.pageSize}
            />
        </>
    );
};

