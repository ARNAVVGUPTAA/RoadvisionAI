import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Real-time Traffic Analytics',
        },
    },
};

const AnalyticsChart = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [],
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/analytics');
                const result = await response.json();
                const data = result.data;

                const labels = data.map(item => item.timestamp);
                const vehicleCounts = data.map(item => item.vehicle_count);
                const pedestrianCounts = data.map(item => item.pedestrian_count);

                setChartData({
                    labels,
                    datasets: [
                        {
                            label: 'Vehicle Count',
                            data: vehicleCounts,
                            borderColor: 'rgb(255, 99, 132)',
                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        },
                        {
                            label: 'Pedestrian Count',
                            data: pedestrianCounts,
                            borderColor: 'rgb(53, 162, 235)',
                            backgroundColor: 'rgba(53, 162, 235, 0.5)',
                        },
                    ],
                });
                setLoading(false);
            } catch (error) {
                console.error('Error fetching analytics data:', error);
                setLoading(false);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 5000); // Poll every 5 seconds

        return () => clearInterval(interval);
    }, []);

    if (loading) return <div>Loading Analytics...</div>;

    return <Line options={options} data={chartData} />;
};

export default AnalyticsChart;
