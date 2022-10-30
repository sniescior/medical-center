import React, { useEffect } from 'react'

export default function DashboardView() {

    useEffect(() => {
        fetch('/api').then(
            response => response.text()
        ).then(
            data => {
                console.log(data);
            }
        )
    }, []);

    return (
        <h2>Podsumowanie</h2>
    )
}