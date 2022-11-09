import React from "react";
import TableHeaderRow from "../utility/TableHeaderRow";
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

                    <tbody>
                        {props.items.map((element, key) => {
                            return (
                                <ExaminationRow onClickAction={props.onClickAction} key={key} element={element} />
                            );
                        })}
                    </tbody>
                    <tfoot></tfoot>
                </table>
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
}
