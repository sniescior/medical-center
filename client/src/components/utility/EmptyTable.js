import React from 'react';

export default function EmptyTable(props) {
    return (
        <div className="empty-table">
            <img src="search.svg" alt='empty queryset' />
            <h2>{props.message ? props.message : "Nie znaleziono rekordów spełniających kryteria"}</h2>
        </div>
    );
};
