import { useState, useEffect } from 'react';
import './CreateRoutine.css'

export default function CreateRoutine() {
  const [name, setName] = useState('');
  const [goal, setGoal] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [token, setToken] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const localToken = window.localStorage.getItem('token');
    setToken(localToken);
    if (localToken) {
      setIsLoggedIn(true);
    }
    if (token) {
      fetch('http://fitnesstrac-kr.herokuapp.com/api/users/me', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localToken}`,
        },
      })
        .then((response) => response.json())
        .then((result) => {
          const user = result.data;
          setUser(result);
          if (user) {
            console.log(user);
          }
        })
        .catch((error) => console.log(error));
    }
  }, []);

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleGoalChange(event) {
    setGoal(event.target.value);
  }

  function handleIsPublicChange(event) {
    setIsPublic(event.target.checked);
  }

  function handleSubmit(event) {
    event.preventDefault();
    fetch('http://fitnesstrac-kr.herokuapp.com/api/routines', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        goal,
        isPublic,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      })
      .catch((error) => console.log(error));
  }

  if (!isLoggedIn) {
    return <p>Please log in to create a new routine.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="create-routine-form">
      <div className="form-group">
        <label htmlFor="name" className="form-label">
          Name:
        </label>
        <input type="text" value={name} onChange={handleNameChange} className="form-input" id="name" />
      </div>
      <div className="form-group">
        <label htmlFor="goal" className="form-label">
          Goal:
        </label>
        <input type="text" value={goal} onChange={handleGoalChange} className="form-input" id="goal" />
      </div>
      <div className="form-group">
        <label htmlFor="isPublic" className="form-label">
          Public:
        </label>
        <input type="checkbox" checked={isPublic} onChange={handleIsPublicChange} className="form-input-checkbox" id="isPublic" />
      </div>
      <button type="submit" className="form-submit-button">Create Routine</button>
    </form>
  );
}
