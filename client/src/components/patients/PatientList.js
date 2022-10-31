import React from "react";
import '../../styles/table/table.css';

export default function PatientList(props) {

    const headerData = [
        {
            title: 'ID',
            key: 'id'
        },
        {
            title: 'Imię',
            key: 'first_name'
        },
        {
            title: 'Nazwisko',
            key: 'last_name'
        },
        {
            title: 'E-mail',
            key: 'email'
        },
        {
            title: 'Adres',
            key: 'address'
        },
        {
            title: 'Miasto',
            key: 'city'
        },
        {
            title: 'Państwo',
            key: 'country'
        },
        {
            title: 'Data urodzenia',
            key: 'date_of_birth'
        },
    ]

    return (
        <div className="table-wrapper">
            <table>
                <thead>
                    <tr>
                        {headerData.map(headerRow => {
                            return (
                                <th>
                                    <div 
                                        className="table-header-wrapper" 
                                        onClick={() => {
                                            props.setOrderByColumn(headerRow.key);
                                            if(props.order === 'DESC') {
                                                props.setOrder('ASC');
                                            } else {
                                                props.setOrder('DESC');
                                            }
                                        }}>
                                        {headerRow.title}
                                        <div className="control-icons">
                                            <button className={props.orderByColumn === headerRow.key ? 'expand-button hidden' : 'expand-button'}>
                                                <i className="bi bi-chevron-expand"></i>
                                            </button>
                                            <div className={props.orderByColumn === headerRow.key ? '' : 'hidden'}>
                                                <i className={props.order === 'DESC' ? 'bi bi-caret-down-fill' : 'bi bi-caret-up-fill'}></i>
                                            </div>
                                        </div>
                                    </div>
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>
                    {props.patients.map(element => {
                        const date_of_birth = new Date(element.date_of_birth);
                        const year = date_of_birth.getFullYear();
                        return (
                            <tr>
                                <td>{element.id}</td>
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