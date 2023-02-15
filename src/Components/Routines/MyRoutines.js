import React, { useState, useEffect } from 'react';
import Header from '../Header';

export default function NewRoutineForm() {
  const [token, setToken] = useState('');
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [goal, setGoal] = useState('');
  const [isPublic, setIsPublic] = useState(false);

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    setToken(token);
    if (token) {
      fetch('http://fitnesstrac-kr.herokuapp.com/api/users/me', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((result) => {
          const user = result.data;
          setUser(user);
          console.log(user);
        })
        .catch((error) => console.log(error));
    }
  }, [token]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const token = window.localStorage.getItem('token');
    if (!token) {
      console.log('No token found');
      return;
    }

    fetch('http://fitnesstrac-kr.herokuapp.com/api/routines', {
      method: 'POST',
      body: JSON.stringify({
        name,
        goal,
        isPublic,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      })
      .catch((error) => console.error(error));

    setName('');
    setGoal('');
    setIsPublic(false);
  };

  return (
    <>
    <Header />
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
      </label>
      <br />
      <label>
        Goal:
        <input type="text" value={goal} onChange={(event) => setGoal(event.target.value)} />
      </label>
      <br />
      <label>
        Public:
        <input type="checkbox" checked={isPublic} onChange={(event) => setIsPublic(event.target.checked)} />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
    </>
  );
}
