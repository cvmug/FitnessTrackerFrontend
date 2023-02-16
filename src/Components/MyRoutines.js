import React from "react";
import Header from "./Header";


const MyRoutines = ({ setIsLoggedIn, isLoggedIn, setToken, token }) => {
  return (
    <>
      <Header
        setIsLoggedIn={setIsLoggedIn} setToken={setToken}
        isLoggedIn={isLoggedIn} token={token} />
      <h1>MyRoutines</h1>
    </>
  )
}

export default MyRoutines;
