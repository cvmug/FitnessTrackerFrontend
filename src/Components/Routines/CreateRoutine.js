import { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import './CreateRoutine.css'

export default function CreateRoutine() {
  const [name, setName] = useState('');
  const [goal, setGoal] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [token, setToken] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

    alert('Routine created successfully!');
    // window.location.reload();

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
    <div className='create-routine-container'>
      <button className='create-routine-modal-button' onClick={() => setIsModalOpen(true)}>Create New Routine</button>
      <ReactModal
        isOpen={isModalOpen}
        className='create-routine-modal'>
        <form onSubmit={handleSubmit}
          className="create-routine-form-container"
          overlayClassName="Overlay"
        >
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            placeholder="Routine name"
            className="create-routine-form-input"
          />
          <input
            type="text"
            id="goal"
            value={goal}
            onChange={handleGoalChange}
            placeholder="Routine goal"
            className="create-routine-form-input"
          />
          <div className="create-routine-checkbox-container">
            <input
              type="checkbox"
              id="public"
              checked={isPublic}
              onChange={handleIsPublicChange}
              className="create-routine-form-checkbox"
            />
            <label className="create-routine-checkbox-label">
              Public
            </label>
          </div>
          <button type="submit" className="create-routine-form-button">
            Submit
          </button>
          <button onClick={() => setIsModalOpen(false)}>Close</button>
        </form>
      </ReactModal>
    </div>
  );
}