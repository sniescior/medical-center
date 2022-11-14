import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/dashboard/dashboard.css';

export default function DashboardView(props) {

    const navigate = useNavigate();

    const [patientsCount, setPatientsCount] = useState(null);
    const [projectsCount, setProjectsCount] = useState(null);
    const [ordersCount, setOrdersCount] = useState(null);
    const [examinationsCount, setExaminationsCount] = useState(null);

    useEffect(() => {
        fetch('/api/patients/count-patients').then(
            response => response.json()
        ).then(
            data => { setPatientsCount(data.data.count); }
        );

        fetch('/api/projects/count-projects').then(
            response => response.json()
        ).then(
            data => { setProjectsCount(data.data.projectsCount); }
        );
        
        fetch('/api/orders/count').then(
            response => response.json()
        ).then(
            data => { setOrdersCount(data.data.count); }
        );

        fetch('/api/examinations/count-examinations').then(
            response => response.json()
        ).then(
            data => { setExaminationsCount(data.data.examinationsCount); }
        );

    }, []);

    return (
        <div className='content'>
            <h2>Podsumowanie</h2>
            <div className='summary-wrapper'>
                <div className={patientsCount ? 'card tile' : 'card tile loading'}>
                    <div className='header'>
                        <h3>Pacjenci</h3>
                        <button onClick={() => { navigate('/patients') }}>
                            <i className="bi bi-arrow-right-short"></i>
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
                        <button onClick={() => { navigate('/projects') }}>
                            <i className="bi bi-arrow-right-short"></i>
                        </button>
                    </div>
                    <span className='divider'></span>
                    <div className='details'>
                        <h2>{projectsCount}</h2>
                        <h2 className='text-success dummy'>+56</h2>
                    </div>
                </div>
                <div className={examinationsCount ? 'card tile' : 'card tile loading'}>
                    <div className='header'>
                        <h3>Badania</h3>
                        <button onClick={() => { navigate('/examinations') }}>
                            <i className="bi bi-arrow-right-short"></i>
                        </button>
                    </div>
                    <span className='divider'></span>
                    <div className='details'>
                        <h2>{examinationsCount}</h2>
                        <h2 className='text-success dummy'>+56</h2>
                    </div>
                </div>
                <div className={ordersCount ? 'card tile' : 'card tile loading'}>
                    <div className='header'>
                        <h3>Zlecenia</h3>
                        <button className="hidden">
                            <i className="bi bi-arrow-right-short"></i>
                        </button>
                    </div>
                    <span className='divider'></span>
                    <div className='details'>
                        <h2>{ordersCount}</h2>
                        <h2 className='text-success dummy'>+56</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}