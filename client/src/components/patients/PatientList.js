import React from "react";
import '../../styles/table/table.css';

export default function PatientList(props) {
    return (
        <div className="table-wrapper">
            <table>
                <thead>
                    <tr>
                        <th>Imię</th>
                        <th>Nazwisko</th>
                        <th>E-mail</th>
                        <th>Adres</th>
                        <th>Miasto</th>
                        <th>Państwo</th>
                        <th>Data urodzenia</th>
                    </tr>
                </thead>
                <tbody>
                    {props.patients.map(element => {
                        const date_of_birth = new Date(element.date_of_birth);
                        const year = date_of_birth.getFullYear();
                        return (
                            <tr>
                                <td>{element.first_name}</td>
                                <td>{element.last_name}</td>
                                <td>{element.email}</td>
                                <td>{element.address}</td>
                                <td>{element.city}</td>
                                <td>{element.country}</td>
                                <td>{year}</td>
                            </tr>
                        );
                    })}
                </tbody>
                <tfoot>

                </tfoot>
            </table>
        </div>
    );
}