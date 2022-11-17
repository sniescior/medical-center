import React from "react";
import EmptyTable from "../utility/EmptyTable";
import TableHeaderRow from "../utility/TableHeaderRow";
import TableLoader from "../utility/TableLoader";
import TableSearchRow from "../utility/TableSearchRow";
import TableSummary from "../utility/TableSummary";
import ExaminationRow from "./ExaminationRow";

export default function ExaminationTable(props) {
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
                                <ExaminationRow onClickAction={props.onClickAction} key={key} element={element} />
                            );
                        })}
                    </tbody>
                    <tfoot></tfoot>
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
}
