import React, { useState, useEffect } from 'react';
import Header from '../Header';
import './PublicRoutines.css'

function PublicRoutines({ setIsLoggedIn, setToken, isLoggedIn, token, user, setUser }) {
  const [routines, setRoutines] = useState([]);
  const [numVisibleRoutines, setNumVisibleRoutines] = useState(5);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userClicked, setUserClicked] = useState(false)
  const [activityClicked, setActivityClicked] = useState(false)
  const [currRoutineId, setCurrRoutineId] = useState("")
  const [currActId, setCurrActId] = useState("")
  const [userRoutines, setUserRoutines] = useState([])
  const [routinesWithActivity, setRoutinesWithActivity] = useState([])

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

  const userClickedBtn = (routine) => {
    setUserClicked(!userClicked)
    setCurrRoutineId(routine.id)
    if (!userClicked) {
      setUserRoutines([])
    }
  }

  const activityClickedBtn = (activity) => {
    setActivityClicked(!activityClicked)
    setCurrActId(activity.id)
    console.log(activity.id)
    if (!activityClicked) {
      setRoutinesWithActivity([])
    }
  }

  const routinesWithAct = (activityId) => {
    if (!routinesWithAct) {
      fetch(`http://fitnesstrac-kr.herokuapp.com/api/activities/${activityId}/routines`, {
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(response => response.json())
        .then(result => {
          // console.log(result)
          routinesWithAct(result)
        })
        .catch(console.error);
      console.log(activityId)
    }

    return (
      <>
        <section className='usersRoutinesContainer'>
          <h1 className='creatorName'>{activityId}'s routines</h1>
          {/* {console.log(routinesWithActivity)} */}
          {routinesWithActivity.map((routine) => (
            <section className='individualRoutine'>
              <h1>{routine.name}</h1>
              <p>{routine.goal}</p>
            </section>
          ))}

        </section>
      </>
    )
  }

  const usersRoutines = (username) => {
    fetch(`http://fitnesstrac-kr.herokuapp.com/api/users/${username}/routines`, {
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setUserRoutines(result)
      })
    return (<>
      <section className='usersRoutinesContainer'>
        <h1 className='creatorName'>{username}'s routines</h1>
        {userRoutines.map((routine) => (
          <section className='individualRoutine'>
            <h1>{routine.name}</h1>
            <p>{routine.goal}</p>
          </section>
        ))}

      </section>
    </>)
  }

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

      <div className='blueSec'></div>
      <div className='leftSection'></div>
      <div className="routine-list">
        <h2 className="routine-list-title">PUBLIC ROUTINES</h2>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search routines by name"
            value={searchQuery}
            onChange={handleSearchQuery}
          />
        </div>
        {showLoadMore && (
          <button className="load-more-button" onClick={handleLoadMore}>
            Click to show more
          </button>
        )}
        <div className="routine-list-container">
          {filteredRoutines.map((routine) => (
            <div className='card'>
              <div key={routine.id} className="routine-card">
                <h3>{routine.name}</h3>
                <p><strong>Goal: </strong>{routine.goal}</p>
                <p onClick={() => userClickedBtn(routine)}
                  className="userName"><strong>Creator: </strong>{routine.creatorName}
                  <span className='popUp'>Click to see {routine.creatorName}'s routines</span>
                </p>
                {userClicked && routine.id === currRoutineId &&
                  <div>{usersRoutines(routine.creatorName)}</div>}
                <ul className="activities-list">
                  {routine.activities.map((activity) => (
                    <li key={activity.id} className="activity-item">
                      {activityClicked && activity.id === currActId && <div>{routinesWithAct(activity.id)}
                      </div>}
                      <p onClick={() => activityClickedBtn(activity)}>{activity.name}</p>
                      <p>{activity.description}</p>
                      <p>Duration: {activity.duration} minutes</p>
                      <p>Count: {activity.count}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

      </div>
    </>
  );
}

export default PublicRoutines;
