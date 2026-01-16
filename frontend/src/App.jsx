import React from 'react';
import AnalyticsChart from './components/AnalyticsChart';
import MapDisplay from './components/MapDisplay';
import './index.css';

function App() {
    return (
        <div className="app-container">
            <header className="app-header">
                <h1>RoadVision AI Dashboard</h1>
                <p>Real-time Traffic & Analytics Monitor</p>
            </header>

            <main className="dashboard-grid">
                <section className="card analytics-section">
                    <h2>Analytics Overview</h2>
                    <div className="chart-container">
                        <AnalyticsChart />
                    </div>
                </section>

                <section className="card map-section">
                    <h2>Live GIS Map</h2>
                    <div className="map-container">
                        <MapDisplay />
                    </div>
                </section>
            </main>
        </div>
    );
}

export default App;
