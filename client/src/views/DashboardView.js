import React, { useEffect, useState } from 'react';
import '../styles/dashboard/dashboard.css';
import { getArrayQuery } from '../database/ordersQuery';
import PatientsChart from '../components/charts/PatientsChart';

export default function DashboardView(props) {

    const [projectsCount, setProjectsCount] = useState(null);
    const [ordersCount, setOrdersCount] = useState(null);
    const [examinationsCount, setExaminationsCount] = useState(null);

    const [patientsData, setPatientsData] = useState([]);

    useEffect(() => {
        fetch('/api/projects/count-projects').then(
            response => response.json()
        ).then(
            data => { setProjectsCount(data.data.count); }
        );
        
        fetch('/api/orders/count').then(
            response => response.json()
        ).then(
            data => { setOrdersCount(data.data.count); }
        );

        fetch('/api/examinations/count-examinations').then(
            response => response.json()
        ).then(
            data => { setExaminationsCount(data.data.count); }
        );

    }, []);

    return (
        <div className='content dashboard'>
            <h2>Podsumowanie</h2>
            <div className='summary-wrapper'>
                <PatientsChart />
            </div>
        </div>
    );
}