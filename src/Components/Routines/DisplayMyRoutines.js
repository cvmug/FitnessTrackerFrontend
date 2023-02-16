import React, { useState, useEffect } from 'react';
import './DisplayMyRoutines.css'

export default function DisplayMyRoutines() {
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    const localToken = window.localStorage.getItem('token');
    setToken(localToken);
    if (localToken) {
      setIsLoggedIn(true);
    }
    if (token) {
      fetch('http://fitnesstrac-kr.herokuapp.com/api/users/me', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localToken}`,
        },
      })
        .then((response) => response.json())
        .then((result) => {
        const username = result.username;
          console.log()
          setUser(username);
          if (username) {
            fetch(`http://fitnesstrac-kr.herokuapp.com/api/users/${username}/routines`, {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localToken}`,
              },
            })
              .then((response) => response.json())
              .then((result) => {
                const userRoutines = result;
                setRoutines(userRoutines);
              })
              .catch((error) => console.log(error));
          }
        })
        .catch((error) => console.log(error));
    }
  }, []);

  return (
    <div className='my-routine-container'>
        <h1 className='my-routine-title'> My Routines </h1>
      {routines.map((routine) => (
        <div key={routine.id} className = "my-routine-card">
       <h3>{routine.name}</h3>
                  <p>Goal: {routine.goal}</p>
                  <ul className="activities-list">
                    {routine.activities.map((activity) => (
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
  );
      }

