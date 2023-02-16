import React, { useState } from "react";
import './login.css'

const Login = ({ showLogin, setShowLogin, setIsLoggedIn, setToken, setUser, isLoggedIn }) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [usernameReg, setUsernameReg] = useState("")
    const [passwordReg, setPasswordReg] = useState("")
    const [register, setRegister] = useState(false)
    const [hideLogForm, setHideLogForm] = useState(false)
    const [userNameTaken, setUserNameTaken] = useState(false)
    const [validInfo, setValidInfo] = useState(true)
    const [weakPass, setWeakPass] = useState(false)
    const [registered, setRegistered] = useState(false)

    const btnClicked = () => {
        setShowLogin(!showLogin)
    }

    const registerPage = () => {
        setRegister(!register)
        setHideLogForm(!hideLogForm)
    }

    const handleChangeName = (event) => {
        setUsername(event.target.value)
    }
    const handleChangePassword = (event) => {
        setPassword(event.target.value)
    }
    const handleChangeNameRegister = (event) => {
        setUsernameReg(event.target.value)
    }
    const handleChangePasswordRegister = (event) => {
        setPasswordReg(event.target.value)
    }

    const loggedInAlert = () => {
        return (
            <div class="alertGreen">
                <strong>Logged In</strong>
            </div>
        )
    }
    const wrongUserAlert = () => {
        return (
            <div class="alert">
                <strong>Wrong username or password</strong>
            </div>
        )
    }
    const registeredAlert = () => {
        return (
            <div class="alertGreen">
                <strong>You have been registered!</strong>
            </div>
        )
    }
    const usernameTakenAlert = () => {
        return (
            <div class="alert">
                <strong>Username already belongs to a user!</strong>
            </div>
        )
    }
    const passwordTooWeekAlert = () => {
        return (
            <div class="alert">
                <strong>Password too weak, make it larger!</strong>
            </div>
        )
    }

    const handleRegisterSumbit = async (event) => {
        event.preventDefault()
        fetch('http://fitnesstrac-kr.herokuapp.com/api/users/register', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: `${usernameReg}`,
                password: `${passwordReg}`
            })
        }).then(response => response.json())
            .then(result => {
                console.log(result.name);
                console.log(result.message)
                if (result.name === "PasswordLengthError") {
                    setWeakPass(true)
                }

                if (result.message === "you're signed up!") {
                    setRegistered(true)
                }

                if (result.name === 'UserExistsError') {
                    setUserNameTaken(true)
                    console.log(userNameTaken)
                }
            })
            .catch(console.error)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const fetchLogin = async () => {
            await fetch('http://fitnesstrac-kr.herokuapp.com/api/users/login', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: `${username}`,
                    password: `${password}`

                })
            }).then(response => response.json())
                .then(result => {
                    console.log(result)
                    if (result.token) {
                        setIsLoggedIn(true)
                        localStorage.setItem('token', result.token);
                        setToken(result.token)
                        setUser(result.data);
                    }
                    if (result.name === 'IncorrectCredentialsError') {
                        setValidInfo(false)
                        console.log(validInfo)
                    }
                })
                .catch(console.error);
        }
        fetchLogin()
    }

    return (
        <>
            {
                showLogin &&
                <div className="containerModal" id="modal-opened">

                    {!hideLogForm &&
                        <div className="modal">
                            <div className="details">
                                <h1 className="titleLog">Login</h1>
                            </div>
                            <p className="txt"></p>
                            <form onSubmit={handleSubmit} className="formContainer">
                                {isLoggedIn ?
                                    <div className='container'>  {isLoggedIn && loggedInAlert()}</div>
                                    : <div className="container"> {!validInfo && wrongUserAlert()}</div>}

                                <input type='text' placeholder="Username" value={username} onChange={handleChangeName} className="inputLogin"></input>
                                <input type='password' placeholder="Password" value={password} onChange={handleChangePassword} className="inputLogin"></input>
                                <button type="submit" className="btnModal">Log In &rarr;</button>
                            </form>
                            <button onClick={() => btnClicked()} className="link-2"></button>
                            <p className="signUpContainer">Not a member?<p onClick={() => registerPage()} className="signUp">Sign Up</p></p>
                        </div>
                    }
                    {register &&
                        <div className="modal">
                            <div className="details">
                                <h1 className="titleLog">Register</h1>
                            </div>
                            <p className="txt"></p>
                            <form onSubmit={handleRegisterSumbit} className="formContainer">
                                {userNameTaken && <div className="container">{usernameTakenAlert()}</div>}
                                {weakPass && <div className="container">{passwordTooWeekAlert()}</div>}
                                {registered && <div className="container">{registeredAlert()}</div>}
                                <input type='text' placeholder="Username" value={usernameReg} onChange={handleChangeNameRegister} className="inputLogin"></input>
                                <input type='password' placeholder="Password" value={passwordReg} onChange={handleChangePasswordRegister} className="inputLogin"></input>
                                <button type="submit" className="btnModal">Register &rarr;</button>
                            </form>
                            <button onClick={() => btnClicked()} className="link-2"></button>
                            <p className="signUpContainer">Have an account?<p onClick={() => registerPage()} className="signUp">Log In</p></p>
                        </div>
                    }
                </div>
            }
        </>
    )
}

export default Login