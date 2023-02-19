import { useState } from 'react';

export default function DeleteRoutine({ token, routineId }) {
  const [error, setError] = useState(null);

  function handleDelete() {
    fetch(`http://fitnesstrac-kr.herokuapp.com/api/routines/${routineId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert('Routine deleted successfully!');
        window.location.reload();
      })
      .catch((error) => setError('Failed to delete routine'));
  }

  return (
    <div className='delete-routine-container'>
      {error && <p className='error'>{error}</p>}
      <button className='deleteRoutineBtn' type='button' onClick={handleDelete}>X</button>
    </div>
  );
}
