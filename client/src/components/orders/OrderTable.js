import React from "react";
import TableHeaderRow from "../utility/TableHeaderRow";
import TableSearchRow from "../utility/TableSearchRow";
import TableSummary from "../utility/TableSummary";
import OrderRow from "./OrderRow";
import TableLoader from "../utility/TableLoader";

export default function OrderTable(props) {
    return (
        <>
            <div className="table-wrapper">
                <table>
                    <thead>
                        <TableHeaderRow headerData={props.headerData} setOrderByColumn={props.setOrderByColumn} orderByColumn={props.orderByColumn} order={props.order} setOrder={props.setOrder} />   
                        <TableSearchRow headerData={props.headerData} />
                    </thead>

                    <TableLoader
                        headerData={props.headerData}
                        tableLoader={props.tableLoader} 
                        pageSize={props.pageSize} />

                    <tbody className={props.tableLoader ? "hide" : ""}>
                        {props.items.map((element, key) => {
                            return (
                                <OrderRow key={key} element={element} openModal={props.openModal} setProjectID={props.setProjectID} />
                            );
                        })}
                    </tbody>

                </table>
                <TableSummary
                    tableLoader={props.tableLoader}
                    pagesCount={props.pagesCount}
                    totalCount={props.totalCount}
                    setPageNumber={props.setPageNumber}
                    currentPage={props.currentPage}
                    pageSize={props.pageSize}

                    items={props.items}
                    setPageSize={props.setPageSize}
                    defaultValue={props.pageSize} />
            </div>
        </>
    );
}
