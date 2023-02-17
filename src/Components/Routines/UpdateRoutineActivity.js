import React, { useState, useEffect } from 'react';

export default function UpdateRoutineActivity({ token, routineActivityId }) {
  const [updatedActivity, setUpdatedActivity] = useState({
    count: 0,
    duration: 0,
  });
  const [error, setError] = useState(null);
  const [activities, setActivities] = useState([]);

  function handleSubmit(event) {
    event.preventDefault();
    alert('Activity updated successfully!');

    fetch(`http://fitnesstrac-kr.herokuapp.com/api/routine_activities/${routineActivityId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          count: updatedActivity.count,
          duration: updatedActivity.duration
        }),
      })
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => setError('Failed to update routine activity'));      
  }

  function handleCountChange(event) {
    const count = parseInt(event.target.value);
    if (Number.isInteger(count)) {
      setUpdatedActivity({ ...updatedActivity, count });
    }
  }

  function handleDurationChange(event) {
    const duration = parseInt(event.target.value);
    if (Number.isInteger(duration)) {
      setUpdatedActivity({ ...updatedActivity, duration });
    }
  }

  useEffect(() => {
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

  return (
    <div className='update-routine-activity-container'>
      <form className='update-routine-activity-form' onSubmit={handleSubmit}>
        <label>
          Count:
          <input type='number' value={updatedActivity.count} onChange={handleCountChange} />
        </label>
        <label>
          Duration (in minutes):
          <input type='number' value={updatedActivity.duration} onChange={handleDurationChange} />
        </label>
        {error && <p className='error'>{error}</p>}
        <div className='update-routine-activity-buttons'>
          <button type='submit'>Update Activity</button>
        </div>
      </form>
    </div>
  );
}
