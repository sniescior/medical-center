import React, { useEffect } from 'react'
import NavBar from '../components/utility/NavBar';
import '../styles/index/index.css'

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
        <div className='content'>
            <h2>Podsumowanie</h2>
        </div>
    );
}