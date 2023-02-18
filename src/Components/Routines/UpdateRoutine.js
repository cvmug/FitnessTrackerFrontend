import React, { useState } from 'react';

export default function UpdateRoutine({ token, routineId, routineName, routineGoal, routineIsPublic }) {
  const [showUpdate, setShowUpdate] = useState(false)
  const [updatedRoutine, setUpdatedRoutine] = useState({
    name: '',
    goal: '',
    isPublic: null,
  });
  const [error, setError] = useState(null);


  if (!updatedRoutine.name) {
    setUpdatedRoutine({ ...updatedRoutine, name: routineName })
  }
  if (!updatedRoutine.goal) {
    setUpdatedRoutine({ ...updatedRoutine, goal: routineGoal })
  }

  function handleNameChange(event) {
    setUpdatedRoutine({ ...updatedRoutine, name: event.target.value });
  }

  function handleGoalChange(event) {
    setUpdatedRoutine({ ...updatedRoutine, goal: event.target.value });
  }

  function handleIsPublicChange(event) {
    const isPublic = event.target.value === 'true';
    setUpdatedRoutine({ ...updatedRoutine, isPublic: isPublic });
  }

  function updateClicked() {
    setShowUpdate(true)
    console.log(showUpdate)
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!updatedRoutine.name && !updatedRoutine.goal && updatedRoutine.isPublic === null) {
      setError('Please update at least one field');
      return;
    }



    fetch(`http://fitnesstrac-kr.herokuapp.com/api/routines/${routineId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(updatedRoutine)
    })
      .then((response) => response.json())
      .then((result) => {
        alert('Routine updated successfully!');
        // window.location.reload();
      })
      .catch((error) => setError('Failed to update routine'));
  }

  return (
    <div className='update-routine-container'>
      <form className='update-routine-form' onSubmit={handleSubmit}>
        <section className='topSec'>
          <input className='UpdateRoutineInput inputNameUpdate' type='text' value={updatedRoutine.name} onChange={handleNameChange} />
          <span className='pop'>Click to UPDATE routine</span>
          <label className='labelGoalUpdate'>Goal: </label>
          <input className='UpdateRoutineInput inputGoalUpdate' type='text' value={updatedRoutine.goal} onChange={handleGoalChange} />
          <p className='publicP'>Public: {routineIsPublic ? 'Yes' : 'No'}</p>
          <section className='hideUpdate' onClick={() => { updateClicked() }}>
            <select className='optionSec' value={updatedRoutine.isPublic} onChange={handleIsPublicChange}>
              <option className='optionPub' value=''>Public?</option>
              <option className='optionPub' value='true'>Yes</option>
              <option className='optionPub' value='false'>No</option>
            </select>
            {error && <p className='error'>{error}</p>}
            <div className='update-routine-buttons'>
              <button className='updateRoutineBtn' type='submit'>Update</button>
            </div>
          </section>
        </section>
      </form>
    </div>
  );
}
