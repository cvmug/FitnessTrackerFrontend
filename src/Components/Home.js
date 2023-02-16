import React, { useEffect } from "react";
import Header from "./Header";

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
            <h1>Home</h1>
        </>
    )
}

export default Home