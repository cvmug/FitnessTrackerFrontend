import React, { useState, useEffect } from "react";
import Header from "./Header";
import AddActivities from "./AddActivities";
import EditActivities from "./EditActivities";
import "./Activities.css";

function Activities({
  setIsLoggedIn,
  setToken,
  isLoggedIn,
  token,
  user,
  setUser,
}) {

  const [activities, setActivities] = useState([]);
  const [numVisibleRoutines, setNumVisibleRoutines] = useState(6);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [updateClicked, setUpdateClicked] = useState(false);
  console.log(token)

  const updateBtn = () => {
    setUpdateClicked(!updateClicked)
  }

  useEffect(() => {
    const localToken = window.localStorage.getItem('token');
    setToken(localToken);
    if (localToken) {
      setIsLoggedIn(true);
    }
    if (token) {
      fetch('HTTPS://fitnesstrac-kr.herokuapp.com/api/users/me', {
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
    fetch("HTTPS://fitnesstrac-kr.herokuapp.com/api/activities")
      .then((response) => response.json())
      .then((data) => {
        setActivities(data);
        if (data.length > 6) {
          setShowLoadMore(true);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  const handleLoadMore = () => {
    setNumVisibleRoutines(numVisibleRoutines + 6);
    if (numVisibleRoutines + 6 >= activities.length) {
      setShowLoadMore(false);
    }
  };

  const handleSearchQuery = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
    setNumVisibleRoutines(6);
    setShowLoadMore(activities.length > 6);
  };

  const filteredActivities = activities
    .filter((activity) => activity.name.toLowerCase().includes(searchQuery))
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

      <div className="blueSec"></div>
      <div className="leftSection"></div>
      <div className="routine-list">
        <h2 className="routine-list-title">ALL ACTIVITIES</h2>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search activities by name"
            value={searchQuery}
            onChange={handleSearchQuery}
          />
        </div>
        <span>
          {showLoadMore && (
            <button className="load-more-button" onClick={handleLoadMore}>
              Click to show more
            </button>
          )}
          < AddActivities />
        </span>
        <div className="routine-list-container">
          {filteredActivities.map((activity, id) => (
            <div className="activityCard">
              <div key={activity.id} className="routine-card">
                <h3>{activity.name}</h3>
                <ul className="activities-list">
                  <li key={activity.id} className="activity-item">
                    <h1 className="actDescription">{activity.description}</h1>
                  </li>
                  <button className='updateActivity' onClick={() => { updateBtn() }}>Update Activity</button>
                    {
                      updateClicked &&
                      <section>
                        <EditActivities routineActivityId={activity.id} token={token} />
                      </section>
                    }

                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Activities;
