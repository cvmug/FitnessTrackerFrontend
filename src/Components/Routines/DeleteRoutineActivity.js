import React, { useState } from 'react';

function DeleteRoutineActivity({ routineActivityId, token, onDelete }) {
  const [isDeleted, setIsDeleted] = useState(false);

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
        setIsDeleted(true);
        if (onDelete) {
          onDelete();
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  if (isDeleted) {
    alert('Activity deleted successfully!');
  }

  return (
    <button className='deleteActivity' onClick={handleDelete}>
      Delete Activity
    </button>
  );
}

export default DeleteRoutineActivity;
