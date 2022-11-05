import React from "react";

export default function ProjectList(props) {

    const headerData = [
        {
            title: 'ID',
            key: 'id',
            query: props.idQuery,
            setQuery: props.setIdQuery
        },
        {
            title: 'Nazwa',
            key: 'name',
            query: props.nameQuery,
            setQuery: props.setNameQuery
        },
        {
            title: 'Liczba uczestników',
            key: 'participantsCount',
            query: props.participantsCountQuery,
            setQuery: props.setParticipantsCountQuery
        }
    ];

    return (
        <div className="table-wrapper">
            <table>
                <thead>
                    <tr>
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
                    {props.projects.map(element => {
                        return (
                            <tr 
                                key={element.id}
                                onClick={() => {
                                    props.setProjectID(element.id);
                                }} >

                                <td onClick={() => { props.setModalOpened(true); }}>
                                    {element.id}
                                </td>
                                <td onClick={() => { props.setModalOpened(true); }}>
                                    {element.name}
                                </td>
                                <td onClick={() => { props.setModalOpened(true); }}>
                                    {element.participantsCount}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>

                <tfoot></tfoot>
            </table>

            

        </div>
    );
}