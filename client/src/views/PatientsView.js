import React, { useEffect, useState } from "react";
import PatientList from "../components/patients/PatientList";
import NavBar from "../components/utility/NavBar";

export default function PatientsView() {

    const [pageNumber, setPageNumber] = useState(0);
    const [count, setCount] = useState(5);

    useEffect(() => {
        fetch('/api/patients?' + new URLSearchParams({
            page: pageNumber,   // requested page number (handled by server)
            count: count        // patients number to return on single page
        })).then(
            response => response.text()
        ).then(
            data => {
                console.log(data);
            }
        )
    }, []);

    return (
        <div>
            <NavBar currentPage="patients" />
            <PatientList  />
        </div>
    );
}