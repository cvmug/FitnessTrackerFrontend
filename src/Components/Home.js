import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import './Home.css'

const Home = ({ setIsLoggedIn, isLoggedIn, setToken, token, user, setUser }) => {

    useEffect(() => {
        const localToken = window.localStorage.getItem('token');
        setToken(localToken)
        if (localToken) {
            setIsLoggedIn(true)
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
                })
                .catch((error) => console.log(error));
        }
    }, []);

    document.body.onmousemove = function (e) {
        document.documentElement.style.setProperty(
            '--x', (
                e.clientX + window.scrollX
            )
        + 'px'
        );
        document.documentElement.style.setProperty(
            '--y', (
                e.clientY + window.scrollY
            )
        + 'px'
        );
    }

    return (
        <>
            <Header
                setIsLoggedIn={setIsLoggedIn} setToken={setToken}
                isLoggedIn={isLoggedIn} token={token} user={user} setUser={setUser} />
            <div id="invertedcursor"></div>

            <section className="leftSection">
                <p className="homeSlogan">Track your progress, reach your goals with ease!</p>

            </section>
            <section className="rightSection">
                <div className="imgHome"></div>
            </section>

            <section className="routineSeciton">
                <section className="imagesContainer">
                    <p className="routinesSloganHome">Track your progress, crush your goals, and make every day count with our customizable fitness routines!</p>
                    <Link className="routinesLinkHome" to='/routines'>Routines</Link>
                    <div className="bannerContaier"></div>
                </section>

            </section>

        </>
    )
}

export default Home