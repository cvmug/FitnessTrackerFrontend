import { useState, useEffect } from "react";
import ReactModal from "react-modal";
import "./Routines/CreateRoutine.css";

export default function AddActivities() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [token, setToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const localToken = window.localStorage.getItem("token");
    setToken(localToken);
    if (localToken) {
      setIsLoggedIn(true);
    }
    if (token) {
      fetch("http://fitnesstrac-kr.herokuapp.com/api/users/me", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localToken}`,
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

  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    alert("Activity created successfully");
    // window.location.reload();

    fetch("http://fitnesstrac-kr.herokuapp.com/api/activities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        description
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      })
      .catch((error) => console.log(error));
  }

  if (!isLoggedIn) {
    return <p>Please log in to create a new activity.</p>;
  }

  return (
    <div className="create-routine-container">
      <button
        className="create-routine-modal-button-activity"
        onClick={() => setIsModalOpen(true)}
      >
        Add New Activity
      </button>
      <ReactModal isOpen={isModalOpen} className="create-routine-modal">
        <form
          onSubmit={handleSubmit}
          className="create-routine-form-container"
          overlayClassName="Overlay"
        >
          <h1>Create Activity</h1>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            placeholder="Activity Name"
            className="create-routine-form-input"
          />
          <input
            type="text"
            id="goal"
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Activity Description"
            className="create-routine-form-input"
          />
          <button type="submit" className="create-routine-form-button">
            Submit
          </button>
          <p className="txt"></p>
          <button onClick={() => setIsModalOpen(false)} className="link-2"></button>
        </form>
      </ReactModal>
    </div>
  );
}
