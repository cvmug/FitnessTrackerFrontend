import React, { useState } from "react";
import Header from "./Header";
import Login from "./Login";

const Home = () => {
    const [showLogin, setShowLogin] = useState(false)
    const handleLogInBtn = () => {
        setShowLogin(!showLogin)
        console.log(showLogin)
    }

    return (
        <>
            <Header />
            <h1>Home</h1>
            <button onClick={handleLogInBtn}>Login</button>
            <div className="loginContainerMain">
                {showLogin && <Login />}
            </div>
        </>
    )
}

export default Home