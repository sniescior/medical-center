import React from "react";
import PatientRow from "./PatientRow";
import TableHeaderRow from "../utility/TableHeaderRow";
import TableSummary from "../utility/TableSummary";
import TableSearchRow from "../utility/TableSearchRow";
import ParticipantRow from "../participants/ParticipantRow";
import TableLoader from "../utility/TableLoader";
import EmptyTable from "../utility/EmptyTable";

export default function PatientTable(props) {
    return (
        <>
            <div className="table-wrapper">
                <table>
                    <thead>
                        <TableHeaderRow noSort={props.noSort} order={props.order} setOrder={props.setOrder} orderByColumn={props.orderByColumn} setOrderByColumn={props.setOrderByColumn} headerData={props.headerData} />
                        <TableSearchRow headerData={props.headerData} />
                    </thead>

                    <TableLoader
                        headerData={props.headerData}
                        tableLoader={props.tableLoader} 
                        pageSize={props.pageSize} />

                    <tbody className={props.tableLoader ? "hide" : ""}>
                        {props.items.map((element, key) => {
                            if(!props.participants) {
                                return ( <PatientRow onClickAction={props.onClickAction} element={element} key={key} /> );
                            } else {
                                return ( <ParticipantRow onClickAction={props.onClickAction} element={element} key={key} /> );
                            }
                        })}
                    </tbody>
                </table>

                {props.items.length < 1 && !props.tableLoader &&  <EmptyTable message={"Nie znaleziono badań"} />}

            </div>
            
            <TableSummary
                tableLoader={props.tableLoader}
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

