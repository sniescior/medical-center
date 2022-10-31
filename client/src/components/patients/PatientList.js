import React from "react";
import '../../styles/table/table.css';

export default function PatientList(props) {
    return (
        <div className="table-wrapper">
            <table>
                <thead>
                    <tr>
                        <th>
                            <div className="table-header-wrapper">
                                Imię
                                <button className="expand-button">
                                    <i class="bi bi-chevron-expand"></i>
                                </button>
                            </div>
                        </th>
                        <th>
                            <div className="table-header-wrapper">
                                Nazwisko
                                <button className='expand-button'>
                                    <i class="bi bi-chevron-expand"></i>
                                </button>
                            </div>
                        </th>
                        <th>
                            <div className="table-header-wrapper">
                                E-mail
                                <button className='expand-button'>
                                    <i class="bi bi-chevron-expand"></i>
                                </button>
                            </div>
                        </th>
                        <th>
                            <div className="table-header-wrapper">
                                Adres
                                <button className='expand-button'>
                                    <i class="bi bi-chevron-expand"></i>
                                </button>
                            </div>
                        </th>
                        <th>
                            <div className="table-header-wrapper">
                                Miasto
                                <button className='expand-button'>
                                    <i class="bi bi-chevron-expand"></i>
                                </button>    
                            </div>
                        </th>
                        <th>
                            <div className="table-header-wrapper">
                                Państwo
                                <button className='expand-button'>
                                    <i class="bi bi-chevron-expand"></i>
                                </button>
                            </div>
                        </th>
                        <th>
                            <div className="table-header-wrapper">
                                Data urodzenia
                                <button className='expand-button'>
                                    <i class="bi bi-chevron-expand"></i>
                                </button>
                            </div>
                        </th>
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