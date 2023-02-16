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
            fetch('http://fitnesstrac-kr.herokuapp.com/api/users/me', {
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
                        console.log(user)

                    }
                    console.log(user)
                })
                .catch((error) => console.log(error));
        }
    }, []);

    return (
        <>
            <Header
                setIsLoggedIn={setIsLoggedIn} setToken={setToken}
                isLoggedIn={isLoggedIn} token={token} user={user} setUser={setUser} />
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