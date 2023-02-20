import React, { useState, useEffect } from 'react';
import AddActivityToRoutine from './AddActivityToRoutine';
import UpdateRoutine from './UpdateRoutine';
import DeleteRoutine from './DeleteRoutine'
import './DisplayMyRoutines.css'
import UpdateRoutineActivity from './UpdateRoutineActivity';
import DeleteRoutineActivity from './DeleteRoutineActivity';
import CreateRoutine from './CreateRoutine'

export default function DisplayMyRoutines() {
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [updateClicked, setUpdateClicked] = useState(false)
  const [username, setUsername] = useState(null);
  const [routines, setRoutines] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    const localToken = window.localStorage.getItem('token');
    setToken(localToken);
    if (localToken) {
      setIsLoggedIn(true);
    }
    const localUsername = window.localStorage.getItem('username');
    if (localUsername) {
      setUsername(localUsername);
      fetch(`HTTPS://fitnesstrac-kr.herokuapp.com/api/users/${localUsername}/routines`, {
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
        fetch('HTTPS://fitnesstrac-kr.herokuapp.com/api/users/me', {
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
            fetch(`HTTPS://fitnesstrac-kr.herokuapp.com/api/users/${username}/routines`, {
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

  const handleActivityUpdated = (updatedActivity) => {
    const updatedRoutines = routines.map((routine) => {
      if (routine.id === updatedActivity.routineId) {
        const updatedActivities = routine.activities.map((activity) => {
          if (activity.routineActivityId === updatedActivity.id) {
            return {
              ...activity,
              name: updatedActivity.name,
              description: updatedActivity.description,
              duration: updatedActivity.duration,
              count: updatedActivity.count,
            };
          }
          return activity;
        });
        return {
          ...routine,
          activities: updatedActivities,
        };
      }
      return routine;
    });
    setRoutines(updatedRoutines);
  };

  return (
    <div className="my-routine-list">
      <h2 className="routine-list-title">MY ROUTINES</h2>
      <div className="my-routines-search-box">
        <input
          type="text"
          placeholder="Search routines by name"
          value={searchQuery}
          onChange={handleSearchQuery}
        />
      </div>
      <button className='create-routine-modal-button' onClick={() => setIsModalOpen(true)}>Create New Routine</button>

      <div className="my-routine-list-container">
        {filteredRoutines.map((routine) => (
          <div key={routine.id} className="my-card">
            <div className="my-routine-card">
              <CreateRoutine
                token={token}
                routineId={routine.id}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                onRoutineCreated={() => {
                  fetch(`http://fitnesstrac-kr.herokuapp.com/api/users/${username}/routines`, {
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token}`,
                    },
                  })
                    .then((response) => response.json())
                    .then((result) => {
                      const userRoutines = result.reverse();
                      setRoutines(userRoutines);
                    })
                    .catch((error) => console.log(error));
                }}
              />
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
                        <UpdateRoutineActivity 
                        routineActivityId={activity.routineActivityId} 
                        token={token} 
                        onActivityUpdated={handleActivityUpdated} />
                     <DeleteRoutineActivity 
                      routineActivityId={activity.routineActivityId} 
                      token={token}
                      onRoutineActivityDeleted={() => {
                        const updatedRoutines = routines.map((r) => {
                          if (r.id === routine.id) {
                            return {
                              ...r,
                              activities: r.activities.filter((a) => a.routineActivityId !== activity.routineActivityId)
                            }
                          }
                          return r;
                        });
                        setRoutines(updatedRoutines);
                      }}
                    />
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