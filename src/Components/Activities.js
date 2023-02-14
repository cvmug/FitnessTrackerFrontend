import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./header.css";

const Activities = () => {
  const [activity, setActivity] = useState([]);

  useEffect(() => {
    async function getAllActivities() {
      try {
        const data = await fetch(
          `http://fitnesstrac-kr.herokuapp.com/api/activities`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const results = await data.json();
        setActivity(results);
        console.log(results);
      } catch (error) {
        console.error(error.detail);
      }
    }
    getAllActivities();
  }, []);

  return (
    <div id="activities-container">
        <h1 id="activities-container">Activities</h1>
            <div id="activities-container">
        {activity && activity.length ? activity.map(e => {
            return <div key = {e.id}> 
                <h3>{e.name}</h3>
                <p>{e.description}</p>
        </div>}) : "No Activities Available To Display! "}
        </div>

    </div>
  );
};

export default Activities;
