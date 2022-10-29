import { React, useEffect, useState } from 'react'

export default function DashboardView() {

    const [welcomeMessage, setWelcomeMessage] = useState([{}])

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
    );
}