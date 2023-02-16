import React, { useState, useEffect } from 'react';
import Header from '../Header';
import './PublicRoutines.css'

function PublicRoutines({ setIsLoggedIn, setToken, isLoggedIn, token, user, setUser }) {
  const [routines, setRoutines] = useState([]);
  const [numVisibleRoutines, setNumVisibleRoutines] = useState(5);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('http://fitnesstrac-kr.herokuapp.com/api/routines')
      .then(response => response.json())
      .then(data => {
        setRoutines(data);
        if (data.length > 5) {
          setShowLoadMore(true);
        }
      })
      .catch(error => console.error(error));
  }, []);

  const handleLoadMore = () => {
    setNumVisibleRoutines(numVisibleRoutines + 5);
    if (numVisibleRoutines + 5 >= routines.length) {
      setShowLoadMore(false);
    }
  };

  const handleSearchQuery = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
    setNumVisibleRoutines(5);
    setShowLoadMore(routines.length > 5);
  };

  const filteredRoutines = routines
    .filter((routine) => routine.name.toLowerCase().includes(searchQuery))
    .slice(0, numVisibleRoutines);

  return (
    <>
      <Header
        setIsLoggedIn={setIsLoggedIn}
        setToken={setToken}
        isLoggedIn={isLoggedIn}
        token={token}
        user={user}
        setUser={setUser}
      />
      <div className="routine-list">
        <h2 className="routine-list-title">Public Routines</h2>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search routines by name"
            value={searchQuery}
            onChange={handleSearchQuery}
          />
        </div>
        <div className="routine-list-container">
          {filteredRoutines.map((routine) => (
            <div key={routine.id} className="routine-card">
              <h3>{routine.name}</h3>
              <p>Goal: {routine.goal}</p>
              <p>Creator: {routine.creatorName}</p>
              <ul className="activities-list">
                {routine.activities.map((activity) => (
                  <li key={activity.id} className="activity-item">
                    <p>{activity.name}</p>
                    <p>{activity.description}</p>
                    <p>Duration: {activity.duration} minutes</p>
                    <p>Count: {activity.count}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {showLoadMore && (
          <button className="load-more-button" onClick={handleLoadMore}>
            Click to show more
          </button>
        )}
      </div>
    </>
  );
}

export default PublicRoutines;
