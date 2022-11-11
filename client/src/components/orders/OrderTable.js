import React from "react";
import TableHeaderRow from "../utility/TableHeaderRow";
import TableSearchRow from "../utility/TableSearchRow";
import TableSummary from "../utility/TableSummary";
import OrderRow from "./OrderRow";

export default function OrderTable(props) {
    
    return (
        <>
            <div className="table-wrapper">
                <table>
                    <thead>
                        <TableHeaderRow headerData={props.headerData} setOrderByColumn={props.setOrderByColumn} orderByColumn={props.orderByColumn} order={props.order} setOrder={props.setOrder} />   
                        <TableSearchRow headerData={props.headerData} />
                    </thead>

                    <tbody>
                        {props.items.map((element, key) => {
                            return (
                                <OrderRow key={key} element={element} openModal={props.openModal} setProjectID={props.setProjectID} />
                            );
                        })}
                    </tbody>
                    <tfoot></tfoot>
                </table>
                <TableSummary
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
