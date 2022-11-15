import React, { useEffect, useState } from 'react';
import '../styles/dashboard/dashboard.css';
import { getItemsCount } from '../database/ordersQuery';
import PatientsChart from '../components/charts/PatientsChart';
import { useNavigate } from 'react-router-dom';

function SummaryCard(props) {
    const { title, count, link, subtitle } = props;
    const navigate = useNavigate();
    return (
        <div className='summary-card'>
            <div className='card-header'>
                <div className='action-header'>
                    {subtitle ? 
                    <div className='extended-title'>
                        <h2>{title}</h2>
                        <h4>{subtitle}</h4>
                    </div>
                    : <h2>{title}</h2>
                    }
                    { link && <button className="button-action-right" onClick={() => navigate(link)}><i className="bi bi-arrow-right"></i></button> }
                </div>
            </div>
            <h3>{count}</h3>
        </div>
    );
}

export default function DashboardView(props) {

    const [projectsCount, setProjectsCount] = useState(0);
    const [ordersCount, setOrdersCount] = useState(0);
    const [examinationsCount, setExaminationsCount] = useState(0);

    useEffect(() => {
        getItemsCount('/api/projects/count-projects', new URLSearchParams({}), setProjectsCount, () => {}, () => {});
        
        getItemsCount('/api/orders/count', new URLSearchParams({}), setOrdersCount, () => {}, () => {});

        getItemsCount('/api/examinations/count-examinations', new URLSearchParams({}), setExaminationsCount, () => {}, () => {});
    }, []);

    return (
        <div className='content dashboard'>
            <h2>Podsumowanie</h2>
            <div className='summary-wrapper'>
                <PatientsChart />
                <SummaryCard title={"Badania"} count={examinationsCount} link={'/examinations'} />
                <SummaryCard title={"Projekty"} count={projectsCount} link={'/projects'} />
                <SummaryCard 
                    title={"Zlecenia"}
                    count={ordersCount}
                    subtitle={"Przejdź do widoku projektu, aby przeglądać zlecenia"} />
            </div>
        </div>
    );
}