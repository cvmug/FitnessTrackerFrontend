import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const NewActivity = ({token, isLoggedIn}) => {
  const blankActivity = {name: "", description: ""};
  const [activity, setActivity] = useState(blankActivity);
  const navigate = useNavigate();

  useEffect(() => {
      if(!isLoggedIn) navigate("/login")
  },[]);

  const createActivity = async (event) => {
    try {
      event.preventDefault();
      const response = await fetch('http://fitnesstrac-kr.herokuapp.com/api/activities', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: activity.name,
          description: activity.description
        })
      }) 
      console.log(response);
      if(response.ok) {
        const result = await response.json();
        console.log(result);
        navigate("/activities");
      } else {
        alert(`Activity with the name ${activity.name} already exists.`);
      }
    } catch(error) {
      console.log("error", error);
    }
  }

  return <>
    <h1>Create a new activity!</h1>
    <form className="createForm" onSubmit={createActivity}>
      <input type="text" name="name" value={activity.name} placeholder="Name of activity" minLength="1" required onChange={(event) => {
        setActivity({...activity, name: event.target.value})
      }}></input>
      <input type="text" name="description" value={activity.description} placeholder="Description of activity" minLength="1" required onChange={(event) => {
        setActivity({...activity, description: event.target.value})
      }}></input>
      <br />
      <button type="submit"> Create Activity </button>
    </form>
  </>
}

export default AddActivities; 
