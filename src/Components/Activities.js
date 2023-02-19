import React, { useState, useEffect } from "react";
import Header from "./Header";
import AddActivities from "./AddActivities";
import "./Activities.css";

function Activities({
  setIsLoggedIn,
  setToken,
  isLoggedIn,
  token,
  user,
  setUser,
}) {
  const [routines] = useState([]);
  const [activities, setActivities] = useState([]);
  const [numVisibleRoutines, setNumVisibleRoutines] = useState(5);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("http://fitnesstrac-kr.herokuapp.com/api/activities")
      .then((response) => response.json())
      .then((data) => {
        setActivities(data);
        if (data.length > 5) {
          setShowLoadMore(true);
        }
      })
      .catch((error) => console.error(error));
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
            <div className="card">
              <div key={activity.id} className="routine-card">
                <h3>{activity.name}</h3>
                <ul className="activities-list">
                  <li key={activity.id} className="activity-item">
                    <h3>{activity.description}</h3>
                  </li>
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
