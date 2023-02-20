import React, { useState, useEffect } from 'react';
import './AddActivityToRoutine.css'

export default function AddActivityToRoutine({ routineId }) {

  const [token, setToken] = useState(null);
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [count, setCount] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState(null);

  const [showForm, setShowForm] = useState(false);
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

          setShowForm(false);
        } else {
          setError('Failed to add activity to routine');
        }
      })
      .catch((error) => console.log(error));
  }
  function handleCancel() {
    setShowForm(false)
  }

  return (
    <div className='add-activity-to-routine-container'>
      <button className='addActivityBtn' onClick={() => setShowForm(!showForm)}>Add Activity</button>
      {showForm && (
        <form className='add-activity-to-routine-form' onSubmit={handleSubmit}>
          <label>
            Select activity:
            <select className='optionSec' value={selectedActivity} onChange={handleActivityChange}>
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
            <input className='countInput' type='number' value={count} onChange={handleCountChange} />
          </label>
          <label>
            Duration (minutes):
            <input className='durationInput' type='number' value={duration} onChange={handleDurationChange} />
          </label>
          {error && <p className='error'>{error}</p>}
          <div className='add-activity-to-routine-buttons'>
            <button className='addActivityBtn' type='submit'>Add Activity</button>
            <button className='addActivityBtn' type='button' onClick={handleCancel}>Cancel</button>

          </div>
        </form>
      )}
    </div>
  );
}