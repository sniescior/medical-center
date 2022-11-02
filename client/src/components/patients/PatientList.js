import React, { useEffect, useState } from "react";
import '../../styles/table/table.css';
import Checkbox from '../utility/Checkbox';

export default function PatientList(props, ref) {

    const headerData = [
        {
            title: 'ID',
            key: 'id',
            query: props.idQuery,
            setQuery: props.setIdQuery
        },
        {
            title: 'Imię',
            key: 'first_name',
            query: props.first_nameQuery,
            setQuery: props.setFirst_nameQuery
        },
        {
            title: 'Nazwisko',
            key: 'last_name',
            query: props.last_nameQuery,
            setQuery: props.setLast_nameQuery
        },
        {
            title: 'E-mail',
            key: 'email',
            query: props.emailQuer,
            setQuery: props.setEmailQuery
        },
        {
            title: 'Adres',
            key: 'address',
            query: props.addressQuery,
            setQuery: props.setAddressQuery
        },
        {
            title: 'Miasto',
            key: 'city',
            query: props.cityQuer,
            setQuery: props.setCityQuery
        },
        {
            title: 'Państwo',
            key: 'country',
            query: props.countryQuery,
            setQuery: props.setCountryQuery
        },
        {
            title: 'Data urodzenia',
            key: 'date_of_birth',
            query: props.date_of_birthQuery,
            setQuery: props.setDate_of_birthQuery
        },
    ]

    const handleOnChangeAll = () => {
        props.setCheckedState(
            new Array(11).fill(!props.checkedState[0])
        );
    }

    useEffect(() => {
        props.setCheckedState(
            new Array(11).fill(false)
        );
    }, [props.itemsPerPage, props.idQuery, props.first_nameQuery, props.last_nameQuery, props.emailQuer, props.addressQuery, props.cityQuery, props.countryQuery, props.date_of_birthQuery]);

    const handleOnChange = (position) => {
        const nextCheckedState = props.checkedState.map((item, index) => {
            if(index === position) {
                return !item
            } else {
                return item
            }
        });
        props.setCheckedState(nextCheckedState);
    }

    return (
        <>
            <div className="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th className="table-checkbox">
                                <input type="checkbox" checked={props.checkedState[0]} onChange={() => { handleOnChangeAll(); }} />
                            </th>
                            {headerData.map(headerRow => {
                                return (
                                    <th key={headerRow.key}>
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
                        <tr className="search-row">
                            <th>
                                <i className="bi bi-search"></i>
                            </th>
                            {headerData.map(headerRow => {
                                return (
                                    <th key={headerRow.key}>
                                        <div 
                                            className="table-header-wrapper">
                                                <input 
                                                    type="text" 
                                                    onChange={(e) => {
                                                        headerRow.setQuery(e.target.value);
                                                        props.setPageNumber(0);
                                                    }} 
                                                    placeholder={headerRow.title} 
                                                />
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
                            const month = date_of_birth.getMonth();
                            const date = date_of_birth.getDate();
                            return (
                                <tr 
                                    key={element.id}
                                    onClick={() => {
                                        props.setModalData({
                                            first_name: element.first_name,
                                            last_name: element.last_name,
                                            email: element.email,
                                            address: element.address,
                                            city: element.city,
                                            country: element.country,
                                            date_of_birth: element.date_of_birth, });
                                    }} >
                                    <th onClick={() => { props.setModalOpened(false); }}>
                                        <Checkbox name={"patients-table-checkbox-" + element.id} checked={props.checkedState[element.id]} onChange={handleOnChange} id={element.id} />
                                    </th>
                                    <td onClick={() => { props.setModalOpened(true); }}>{element.id}</td>
                                    <td onClick={() => { props.setModalOpened(true); }}>{element.first_name}</td>
                                    <td onClick={() => { props.setModalOpened(true); }}>{element.last_name}</td>
                                    <td onClick={() => { props.setModalOpened(true); }}>{element.email}</td>
                                    <td onClick={() => { props.setModalOpened(true); }}>{element.address}</td>
                                    <td onClick={() => { props.setModalOpened(true); }}>{element.city}</td>
                                    <td onClick={() => { props.setModalOpened(true); }}>{element.country}</td>
                                    <td onClick={() => { props.setModalOpened(true); }}>{date}.{(month + 1).toString().length > 1 ? (month + 1) : '0' + (month + 1)}.{year}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                    <tfoot></tfoot>
                </table>
            </div>
        </>
    );
}