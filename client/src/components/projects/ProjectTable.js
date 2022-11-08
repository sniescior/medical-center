import React from "react";
import ProjectRow from "./ProjectRow";
import TableHeaderRow from "../utility/TableHeaderRow";
import TableSearchRow from "../utility/TableSearchRow";
import '../../styles/table/table.css';
import TableSummary from "../utility/TableSummary";

export default function ProjectTable(props) {
    return (
        <>
            <div className="table-wrapper">
                <table>
                    <thead>
                        <TableHeaderRow headerData={props.headerData} setOrderByColumn={props.setOrderByColumn} orderByColumn={props.orderByColumn} order={props.order} setOrder={props.setOrder} />   
                        <TableSearchRow headerData={props.headerData} />
                    </thead>

                    <tbody>
                        {props.items.map(element => {
                            return (
                                <ProjectRow key={element.id} element={element} setModalOpened={props.setModalOpened} setProjectID={props.setProjectID} setModalData={props.setModalData} />
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