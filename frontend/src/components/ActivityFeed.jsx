import React from 'react';

const events = [
    { id: 1, time: '2 mins ago', msg: 'High congestion detected at Main St.', type: 'alert' },
    { id: 2, time: '5 mins ago', msg: 'Camera #04 connectivity restored.', type: 'info' },
    { id: 3, time: '12 mins ago', msg: 'Incident #42 reported: Minor collision.', type: 'warning' },
    { id: 4, time: '25 mins ago', msg: 'System backup completed successfully.', type: 'success' },
    { id: 5, time: '40 mins ago', msg: 'Air quality index updated.', type: 'info' },
];

const ActivityFeed = () => {
    return (
        <div className="feed-container">
            <ul className="feed-list">
                {events.map((event) => (
                    <li key={event.id} className={`feed-item ${event.type}`}>
                        <span className="feed-time">{event.time}</span>
                        <span className="feed-msg">{event.msg}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ActivityFeed;
