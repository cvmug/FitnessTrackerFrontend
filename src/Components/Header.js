import React, { useState } from "react";
import { Link } from 'react-router-dom';
import './header.css'
import Login from "./Login";


const Header = ({ setIsLoggedIn, setToken, isLoggedIn, token }) => {
    const [showLogin, setShowLogin] = useState(false)

    const handleLogInBtn = () => {
        setShowLogin(!showLogin)
    }

    const handleLogOutBtn = () => {
        window.localStorage.removeItem('token');
        setIsLoggedIn(false)
    }


    window.addEventListener('scroll', function () {
        const header = document.querySelector('.headerNav');
        const title = document.querySelector('.title')
        header.classList.toggle('header_bar', window.scrollY > 50);
        title.classList.toggle('titleUpdate', window.scrollY > 50);
    });

    return (
        <>
            <nav className="headerNav">
                <p className="title">FitnessTracker</p>
                <ul className="list">
                    <li><Link to='/' className="headerLink">HOME</Link></li>
                    <li><Link to='/routines' className="headerLink">ROUTINES</Link></li>
                    {isLoggedIn && <li><Link to='/MyRoutines' className="headerLink">MY ROUTINES</Link></li>}
                    <li><Link to='/activities' className="headerLink">ACTIVITIES</Link></li>
                    {isLoggedIn ?
                        <button onClick={handleLogOutBtn} className='loginButtonHeader'>LOG OUT</button>
                        :
                        <button onClick={handleLogInBtn} className='loginButtonHeader'>SIGN IN</button>

                    }
                    <div className="loginContainerMain">
                        {showLogin
                            && <Login
                                showLogin={showLogin} setShowLogin={setShowLogin}
                                setIsLoggedIn={setIsLoggedIn} setToken={setToken}
                                isLoggedIn={isLoggedIn} token={token} />}
                    </div>

                </ul>
            </nav>
        </>
    )
}

export default Header