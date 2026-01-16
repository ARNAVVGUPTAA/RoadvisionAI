import React from 'react';

const StatsCard = ({ title, value, trend, trendValue, icon }) => {
    const isPositive = trend === 'up';

    return (
        <div className="card stats-card">
            <div className="stats-header">
                <h3 className="stats-title">{title}</h3>
                {icon && <span className="stats-icon">{icon}</span>}
            </div>
            <div className="stats-value">{value}</div>
            {trendValue && (
                <div className={`stats-trend ${isPositive ? 'positive' : 'negative'}`}>
                    {isPositive ? '↑' : '↓'} {trendValue}
                    <span className="stats-trend-label">vs last hour</span>
                </div>
            )}
        </div>
    );
};

export default StatsCard;
