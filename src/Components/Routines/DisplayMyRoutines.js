import React, { useState, useEffect } from 'react';
import AddActivityToRoutine from './AddActivityToRoutine';
import UpdateRoutine from './UpdateRoutine';
import DeleteRoutine from './DeleteRoutine'
import './DisplayMyRoutines.css'
import UpdateRoutineActivity from './UpdateRoutineActivity';

export default function DisplayMyRoutines() {
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    const localToken = window.localStorage.getItem('token');
    setToken(localToken);
    if (localToken) {
      setIsLoggedIn(true);
    }
    const localUsername = window.localStorage.getItem('username');
    if (localUsername) {
      setUsername(localUsername);
      fetch(`http://fitnesstrac-kr.herokuapp.com/api/users/${localUsername}/routines`, {
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localToken}`,
        },
      })
        .then((response) => response.json())
        .then((result) => {
        const userRoutines = result.reverse();
          setRoutines(userRoutines);
        })
        .catch((error) => console.log(error));
    } else {
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
            setUsername(username);
            window.localStorage.setItem('username', username);
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
          })
          .catch((error) => console.log(error));
      }
    }
  }, [token]);

  return (
    <div className="my-routine-container">
      <h1 className="my-routine-title">My Routines</h1>
      {routines.map((routine) => (
        <div key={routine.id} className="my-routine-card">
          <h3>{routine.name}</h3>
          <p>Goal: {routine.goal}</p>
          <p>Public: {routine.isPublic ? 'Yes' : 'No'}</p>
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
          {isLoggedIn && (
            <AddActivityToRoutine
              routineId={routine.id}
              activities={routine.activities}
              onActivityAdded={(newActivity) => {
                const updatedActivities = [...routine.activities, newActivity];
                  const updatedRoutines = routines.map((r) => {
                  if (r.id === routine.id) {
                    return {
                      ...r,
                      activities: updatedActivities,
                    };
                  }
                  return r;
                });
                setRoutines(updatedRoutines);
              }}
            />
          )}
          <UpdateRoutine token={token} routineId={routine.id} />
          <ul>
            {routine.activities.map((activity) => {
              return (
              <li key={activity.id}>
                {activity.name} - 
                {activity.description}
                <UpdateRoutineActivity routineActivityId={activity.routineActivityId}/>
                </li>
                );
                })}
                </ul>
                <DeleteRoutine 
          token={token}
          routineId={routine.id}
          onRoutineDeleted={() => {
            const updatedRoutines = routines.filter((r) => r.id !== routine.id);
            setRoutines(updatedRoutines);
            }}
            />
            </div>
            ))}
            </div>
            );
}