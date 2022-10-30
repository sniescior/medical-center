import React, { useEffect } from 'react'
import NavBar from '../components/utility/NavBar';

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
        <div>
            <NavBar currentPage='dashboard' />
            <h2>Podsumowanie</h2>
        </div>
    );
}