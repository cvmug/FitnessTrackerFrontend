import React, { useState } from "react";
import './login.css'

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
            <section className="loginFormContainer">
                <h1 className="loginTitle">Login</h1>
                <form onSubmit={handleSubmit} className="formContainer">
                    <input type='text' placeholder="Username" value={username} onChange={handleChangeName} className="inputLogin"></input>
                    <input type='text' placeholder="Password" value={password} onChange={handleChangePassword} className="inputLogin"></input>
                    <button type="submit" className="loginBtn">Log In</button>
                </form>
            </section>

        </>
    )
}

export default Login