import React, { useEffect, useState } from 'react';
import '../styles/dashboard/dashboard.css';

export default function DashboardView(props) {

    const [patientsCount, setPatientsCount] = useState(null);
    const [projectsCount, setProjectsCount] = useState(null);

    useEffect(() => {
        fetch('/api/patients/count-patients').then(
            response => response.json()
        ).then(
            data => { setPatientsCount(data.data.patientsCount); }
        );

        fetch('/api/projects/count-projects').then(
            response => response.json()
        ).then(
            data => { setProjectsCount(data.data.projectsCount); }
        );
    }, []);

    return (
        <div className='content'>
            <h2>Podsumowanie</h2>
            <div className='summary-wrapper'>
                <div className={patientsCount ? 'card tile' : 'card tile loading'}>
                    <div className='header'>
                        <h3>Pacjenci</h3>
                        <button onClick={() => { props.setCurrentPage('patients'); }}>
                            <i class="bi bi-arrow-right-short"></i>
                        </button>
                    </div>
                    <span className='divider'></span>
                    <div className='details'>
                        <h2>{patientsCount}</h2>
                        <h2 className='text-danger dummy'>-10</h2>
                    </div>
                </div>
                <div className={projectsCount ? 'card tile' : 'card tile loading'}>
                    <div className='header'>
                        <h3>Projekty</h3>
                        <button onClick={() => { props.setCurrentPage('projects'); }}>
                            <i class="bi bi-arrow-right-short"></i>
                        </button>
                    </div>
                    <span className='divider'></span>
                    <div className='details'>
                        <h2>{projectsCount}</h2>
                        <h2 className='text-success dummy'>+56</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}