import React, { useState, useEffect } from 'react';

export default function AddActivityToRoutine({ routineId, setDisplayModal }) {
  const [token, setToken] = useState(null);
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [count, setCount] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const localToken = window.localStorage.getItem('token');
    setToken(localToken);

    fetch('http://fitnesstrac-kr.herokuapp.com/api/activities', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setActivities(result);
      })
      .catch((error) => console.log(error));
  }, []);

  function handleActivityChange(event) {
    setSelectedActivity(event.target.value);
  }

  function handleCountChange(event) {
    setCount(event.target.value);
  }

  function handleDurationChange(event) {
    setDuration(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    fetch(`http://fitnesstrac-kr.herokuapp.com/api/routines/${routineId}/activities`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        activityId: selectedActivity,
        count: count,
        duration: duration
      })
    })
      .then((response) => {
        if (response.ok) {
          setDisplayModal(false);
        } else {
          setError('Failed to add activity to routine');
        }
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className='add-activity-to-routine-container'>
      <form className='add-activity-to-routine-form' onSubmit={handleSubmit}>
        <h2>Add Activity to Routine</h2>
        <label>
          Select activity:
          <select value={selectedActivity} onChange={handleActivityChange}>
            <option value=''>Select an activity</option>
            {activities.map((activity) => (
              <option key={activity.id} value={activity.id}>
                {activity.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Count:
          <input type='number' value={count} onChange={handleCountChange} />
        </label>
        <label>
          Duration (minutes):
          <input type='number' value={duration} onChange={handleDurationChange} />
        </label>
        {error && <p className='error'>{error}</p>}
        <div className='add-activity-to-routine-buttons'>
          <button type='submit'>Add Activity</button>
          <button type='button' onClick={() => setDisplayModal(false)}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
