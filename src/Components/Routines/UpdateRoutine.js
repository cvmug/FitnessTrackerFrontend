import React, { useState } from 'react';

export default function UpdateRoutine({ token, routineId }) {
  const [updatedRoutine, setUpdatedRoutine] = useState({
    name: '',
    goal: '',
    isPublic: null,
  });
  const [error, setError] = useState(null);

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

  function handleSubmit(event) {
    event.preventDefault();
    alert('Routine updated successfully!');
    // window.location.reload();

    fetch(`http://fitnesstrac-kr.herokuapp.com/api/routines/${routineId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => setError('Failed to update routine'));
  }

  return (
    <div className='update-routine-container'>
      <form className='update-routine-form' onSubmit={handleSubmit}>
        <label>
          Name:
          <input type='text' value={updatedRoutine.name} onChange={handleNameChange} />
        </label>
        <label>
          Goal:
          <input type='text' value={updatedRoutine.goal} onChange={handleGoalChange} />
        </label>
        <label>
          Is Public?
          <select value={updatedRoutine.isPublic} onChange={handleIsPublicChange}>
            <option value=''>Select an option</option>
            <option value='true'>Yes</option>
            <option value='false'>No</option>
          </select>
        </label>
        {error && <p className='error'>{error}</p>}
        <div className='update-routine-buttons'>
          <button type='submit'>Update Routine</button>
        </div>
      </form>
    </div>
  );
}
