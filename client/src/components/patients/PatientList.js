import React from "react";
import '../../styles/table/table.css';
import PatientRow from "./PatientRow";
import TableHeaderRow from "../utility/TableHeaderRow";
import TableSearchRow from "../utility/TableSearchRow";

export default function PatientList(props) {
    return (
        <div className="table-wrapper">
            <table>
                <thead>
                    <TableHeaderRow headerData={props.headerData} setOrderByColumn={props.setOrderByColumn} orderByColumn={props.orderByColumn} order={props.order} setOrder={props.setOrder} />
                    <TableSearchRow headerData={props.headerData} />
                </thead>
                <tbody>
                    {props.patients.map((element, key) => {
                        return ( <PatientRow element={element} key={key} onClickAction={() => props.setModalOpened(true)} setModalData={props.setModalData} /> );
                    })}
                </tbody>
                <tfoot></tfoot>
            </table>
        </div>
    );
}