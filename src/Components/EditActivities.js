import React, { useState } from 'react';

export default function EditActivities({ activityId, token }) {
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://fitnesstrac-kr.herokuapp.com/api/activities/${activityId}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          description
        })
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='updateActivityForm'>
      <label>
        Name:
        <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
      </label>
      <label>
        Description:
        <input type="text" value={description} onChange={(event) => setDescription(event.target.value)} />
      </label>
      <button className='updateActivity' type='button' onClick={handleUpdate}>Update</button>
    </div>
  );
}