import React from "react";
import EmptyTable from "../utility/EmptyTable";
import ParticipantRow from "../projects/ParticipantRow";
import PatientRow from "./PatientRow";
import TableHeaderRow from "../utility/TableHeaderRow";

function TableBody(props) {
    if(props.participants) {
        return (
            <tbody>
                {props.items.map((element, key) => {
                    return (
                        <ParticipantRow setLoader={props.setLoader} setToastMessage={props.setToastMessage} refreshPage={props.refreshPage} element={element} key={key} />
                    );
                })}
            </tbody>
        );
    } else if(props.patients) {
        return (
            <tbody>
                {props.items.map((element, key) => {
                    return (
                        <PatientRow element={element} key={key} />
                    );
                })}
            </tbody>
        );
    }
};

export default function PatientsTable(props) {
    return (
        <div className="table-wrapper">
            <table>
                <thead>
                    <TableHeaderRow noSort={props.noSort} order={props.order} setOrder={props.setOrder} orderByColumn={props.orderByColumn} setOrderByColumn={props.setOrderByColumn} headerData={props.headerData} />
                </thead>
                    <TableBody setLoader={props.setLoader} setToastMessage={props.setToastMessage} refreshPage={props.refreshPage} participants={props.participants} patients={props.patients} items={props.items} />
            </table>
            {props.items.length == 0 ? <EmptyTable /> : <></> }
        </div>
    );
};
