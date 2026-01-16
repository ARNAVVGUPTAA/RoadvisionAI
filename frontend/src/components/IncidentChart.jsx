import React, { useMemo } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const IncidentChart = ({ data }) => {
    const chartData = useMemo(() => {
        if (!data || !data.features) return null;

        const severityCounts = {
            Low: 0,
            Medium: 0,
            High: 0
        };

        data.features.forEach(feature => {
            const sev = feature.properties.severity;
            if (severityCounts[sev] !== undefined) {
                severityCounts[sev]++;
            }
        });

        return {
            labels: ['High', 'Medium', 'Low'],
            datasets: [
                {
                    label: '# of Incidents',
                    data: [severityCounts.High, severityCounts.Medium, severityCounts.Low],
                    backgroundColor: [
                        'rgba(239, 68, 68, 0.8)', // Red
                        'rgba(245, 158, 11, 0.8)', // Amber
                        'rgba(16, 185, 129, 0.8)', // Green
                    ],
                    borderColor: [
                        'rgba(239, 68, 68, 1)',
                        'rgba(245, 158, 11, 1)',
                        'rgba(16, 185, 129, 1)',
                    ],
                    borderWidth: 1,
                },
            ],
        };
    }, [data]);

    if (!chartData) return <div>Loading Chart...</div>;

    return (
        <div className="chart-wrapper">
            <Doughnut data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
    );
};

export default IncidentChart;
