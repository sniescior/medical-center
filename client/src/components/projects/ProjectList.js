import React from "react";
import ProjectRow from "./ProjectRow";
import TableHeaderRow from "../utility/TableHeaderRow";
import TableSearchRow from "../utility/TableSearchRow";

export default function ProjectList(props) {
    return (
        <div className="table-wrapper">
            <table>
                <thead>
                    <TableHeaderRow headerData={props.headerData} setOrderByColumn={props.setOrderByColumn} orderByColumn={props.orderByColumn} order={props.order} setOrder={props.setOrder} />   
                    <TableSearchRow headerData={props.headerData} />
                </thead>

                <tbody>
                    {props.projects.map(element => {
                        return (
                            <ProjectRow key={element.id} element={element} setModalOpened={props.setModalOpened} setProjectID={props.setProjectID} setModalData={props.setModalData} />
                        );
                    })}
                </tbody>
                <tfoot></tfoot>
            </table>
        </div>
    );
}