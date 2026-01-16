import React, { useState, useEffect } from 'react';
import AnalyticsChart from './components/AnalyticsChart';
import MapDisplay from './components/MapDisplay';
import StatsCard from './components/StatsCard';
import IncidentChart from './components/IncidentChart';
import ActivityFeed from './components/ActivityFeed';
import './index.css';

function App() {
    const [gisData, setGisData] = useState(null);

    useEffect(() => {
        // Fetch GIS data for the Incident Chart
        fetch('/api/gis')
            .then(res => res.json())
            .then(data => setGisData(data))
            .catch(err => console.error("Error fetching GIS data:", err));
    }, []);

    return (
        <div className="app-container">
            <header className="app-header">
                <h1>RoadVision AI Dashboard</h1>
                <p>Real-time Traffic & Analytics Monitor</p>
            </header>

            {/* Stats Row */}
            <div className="stats-grid">
                <StatsCard
                    title="Avg. Traffic Flow"
                    value="1,245"
                    trend="up"
                    trendValue="12%"
                    icon="🚗"
                />
                <StatsCard
                    title="Active Incidents"
                    value={gisData?.features ? gisData.features.length : 0}
                    trend="down"
                    trendValue="5%"
                    icon="⚠️"
                />
                <StatsCard
                    title="Camera Status"
                    value="98.5%"
                    trend="up"
                    trendValue="0.2%"
                    icon="📹"
                />
                <StatsCard
                    title="Air Quality"
                    value="Good"
                    icon="🍃"
                />
            </div>

            <main className="dashboard-grid">
                {/* Analytics & Incident Distribution */}
                <section className="card analytics-section">
                    <h2>Analytics Overview</h2>
                    <div className="chart-container">
                        <AnalyticsChart />
                    </div>
                </section>

                <section className="card incident-section">
                    <h2>Incident Severity</h2>
                    <IncidentChart data={gisData} />
                </section>

                {/* Map & Activity Feed */}
                <section className="card map-section">
                    <h2>Live GIS Map</h2>
                    <div className="map-container">
                        <MapDisplay />
                    </div>
                </section>

                <section className="card feed-section">
                    <h2>Live Activity Feed</h2>
                    <ActivityFeed />
                </section>
            </main>
        </div>
    );
}

export default App;
