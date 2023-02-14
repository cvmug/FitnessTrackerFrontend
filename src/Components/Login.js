import React, { useState } from "react";
import Header from "./Header";

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (event) => {

    }

    const handleChangeName = (event) => {
        setUsername(event.target.value)
    }
    const handleChangePassword = (event) => {
        setPassword(event.target.value)
    }

    return (
        <>
            <body>
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <input type='text' placeholder="Username" value={username} onChange={handleChangeName}></input>
                    <input type='text' placeholder="Password" value={password} onChange={handleChangePassword}></input>
                    <button type="submit">Log In</button>
                </form>
            </body>
        </>
    )
}

export default Login