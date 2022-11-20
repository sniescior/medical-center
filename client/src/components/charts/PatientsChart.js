import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from 'chart.js/auto';

import { getArrayQuery, getItemsCount } from "../../database/ordersQuery";
import { useNavigate } from "react-router-dom";

export default function PatientsChart(props) {

    const { setError } = props;

    const navigate = useNavigate();

    const [patientsChart, setPatientsChart] = useState([]);
    const [participantsChart, setParticipantsChart] = useState([]);
    const [patientsCount, setPatientsCount] = useState(0);

    useEffect(() => {
        getArrayQuery('/api/summary/patients?', new URLSearchParams({ byYear: 1, byMonth: 0 }), setError, () => {})
            .then((data) => {
                setPatientsChart(data);
            });

        getItemsCount('/api/patients/count-patients?', new URLSearchParams({}), setPatientsCount, setError, () => {})

        getArrayQuery('/api/summary/participants?', new URLSearchParams({ byYear: 1, byMonth: 0 }), setError, () => {})
            .then((data) => {
                setParticipantsChart(data);
            });
    }, []);

    // #0d6efd
    const [selectedChart, setSelectedChart] = useState(2);

    var data = {
        labels: patientsChart?.map(_ => _.label),
        datasets: [{
            label: 'Wszyscy',
            data: patientsChart?.map(_ => _.value),
            backgroundColor: [ selectedChart !== 0 ? '#0d6efd' : '#0d6dfd00' ],
            borderColor: [ selectedChart !== 0 ? '#0d6efd' : '#0d6dfd00' ],
            borderWidth: 3
        }, {
            label: 'Zarejestrowani',
            data: participantsChart?.map(_ => _.value),
            backgroundColor: [  selectedChart !== 1 ? '#00BFA6' : '#00bfa600' ],
            borderColor: [ selectedChart !== 1 ? '#00BFA6' : '#00bfa600' ],
            borderWidth: 3
        }]
    };

    var options = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
        },
        scales: {
            x: {
                grid: {
                    display: true
                }
            },
            y: {
                grid: {
                    display: true
                },
                ticks: {
                    callback: (value) => { if (value % 1 === 0) { return value; } }
                }
            },
        }
    };

    return (
        <>
        <div className="chart-card" id="patientsChart">
            <div className="chart-wrapper">
                <div className="card-header">
                    <div className="action-header">
                        <h2>Pacjenci</h2>
                        <button className="button-action-right" onClick={() => navigate('/patients')}><i className="bi bi-arrow-right"></i></button>
                    </div>
                    <p>Jak zmieniało się zainteresowanie programem na przełomie czasu?</p>
                    <div className="custom-legend">
                        <div className="legend-item" onMouseOver={() => { setSelectedChart(1) }} onMouseLeave={() => { setSelectedChart(2) }}>
                            <span className="color-blue"></span>
                            <p>Wszyscy pacjenci</p>
                        </div>
                        <div className="legend-item" onMouseOver={() => { setSelectedChart(0) }} onMouseLeave={() => { setSelectedChart(2) }}>
                            <span className="color-green"></span>
                            <p>Zarejestrowani</p>
                        </div>
                    </div>
                </div>
                <Line data={data} options={options} />

                <div className="additional-summary">
                    <h3>
                        Łącznie pacjentów: {patientsCount}
                    </h3>
                </div>
            </div>
        </div>
        </>
    );
}