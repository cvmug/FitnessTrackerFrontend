import React, { useState, useEffect } from 'react';
import './Routines.css'
import Header from "./Header";

function PublicRoutines() {
    const [routines, setRoutines] = useState([]);

    useEffect(() => {
        fetch('http://fitnesstrac-kr.herokuapp.com/api/routines')
            .then(response => response.json())
            .then(data => setRoutines(data))
            .catch(error => console.error(error));
    }, []);

    return (

        <div className="routine-list">
            <Header />
            <h2 className="routine-list-title">Public Routines</h2>
            <div className="routine-list-container">
                {routines.map(routine => (
                    <div key={routine.id} className="routine-card">
                        <h3>{routine.name}</h3>
                        <p>Goal: {routine.goal}</p>
                        <p>Creator: {routine.creatorName}</p>
                        <ul className="activities-list">
                            {routine.activities.map(activity => (
                                <li key={activity.id} className="activity-item">
                                    <p>{activity.name}</p>
                                    <p>{activity.description}</p>
                                    <p>Duration: {activity.duration} minutes</p>
                                    <p>Count: {activity.count}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PublicRoutines;
