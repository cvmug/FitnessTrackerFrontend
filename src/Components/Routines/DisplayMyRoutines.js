import React, { useState, useEffect } from 'react';
import AddActivityToRoutine from './AddActivityToRoutine';
import UpdateRoutine from './UpdateRoutine';
import DeleteRoutine from './DeleteRoutine'
import './DisplayMyRoutines.css'
import UpdateRoutineActivity from './UpdateRoutineActivity';
import DeleteRoutineActivity from './DeleteRoutineActivity';

export default function DisplayMyRoutines() {
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [updateClicked, setUpdateClicked] = useState(false)
  const [username, setUsername] = useState(null);
  const [routines, setRoutines] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleSearchQuery = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const updateBtn = () => {
    setUpdateClicked(!updateClicked)
  }

  const filteredRoutines = routines.filter((routine) => {
    const routineName = routine.name.toLowerCase();
    return routineName.includes(searchQuery);
  });

  return (
    <div className="my-routine-list">
      <h2 className="my-routine-list-title">MY ROUTINES</h2>

      <div className="my-routines-search-box">
        <input
          type="text"
          placeholder="Search routines by name"
          value={searchQuery}
          onChange={handleSearchQuery}
        />
      </div>

      <div className="my-routine-list-container">
        {filteredRoutines.map((routine) => (
          <div key={routine.id} className="my-card">
            <div className="my-routine-card">
              <DeleteRoutine
                token={token}
                routineId={routine.id}
                onRoutineDeleted={() => {
                  const updatedRoutines = routines.filter((r) => r.id !== routine.id);
                  setRoutines(updatedRoutines);
                }}
              />
              <UpdateRoutine token={token} routineId={routine.id} routineName={routine.name} routineGoal={routine.goal} routineIsPublic={routine.isPublic} />
              <ul className="my-routine-activities-list">
                {routine.activities.map((activity) => (
                  <li key={activity.id} className="my-routine-activity-item">
                    <h4 className='activityName'>{activity.name}</h4>
                    <p>{activity.description}</p>
                    <p>Duration: {activity.duration} minutes</p>
                    <p>Count: {activity.count}</p>
                    <button className='updateActivity' onClick={() => { updateBtn() }}>Update Activity</button>
                    {
                      updateClicked &&
                      <section>
                        <UpdateRoutineActivity routineActivityId={activity.routineActivityId} token={token} />
                        <DeleteRoutineActivity routineActivityId={activity.routineActivityId} token={token} />
                      </section>
                    }
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}