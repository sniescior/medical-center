import React from 'react';

export default function EmptyTable(props) {
    return (
        <div className="empty-table">
            <img src="empty-set.png" />
            <h2>{props.message ? props.message : "Nie znaleziono rekordów spełniających kryteria xd"}</h2>
        </div>
    );
};
