import React from 'react';

function DeleteRoutineActivity({ routineActivityId, token, onDelete }) {
  const handleDelete = () => {
    fetch(`http://fitnesstrac-kr.herokuapp.com/api/routine_activities/${routineActivityId}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(result => {
      if (onDelete) {
        onDelete();
      }
    })
    .catch(error => {
      console.error(error);
    });
  }

  return (
    <button onClick={handleDelete}>
      Delete Activity
    </button>
  );
}

export default DeleteRoutineActivity;

