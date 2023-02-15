import React, { useState } from "react";
import Header from "./Header";
import Login from "./Login";

const Home = ({ setIsLoggedIn, isLoggedIn, setToken, token }) => {
    const [showLogin, setShowLogin] = useState(false)
    const handleLogInBtn = () => {
        setShowLogin(!showLogin)
    }

    return (
        <>
            <Header />
            <h1>Home</h1>
            <button onClick={handleLogInBtn} className='loginButton'>Login</button>
            <div className="loginContainerMain">
                {showLogin
                    && <Login
                        showLogin={showLogin} setShowLogin={setShowLogin}
                        setIsLoggedIn={setIsLoggedIn} setToken={setToken}
                        isLoggedIn={isLoggedIn} token={token} />}
            </div>
        </>
    )
}

export default Home