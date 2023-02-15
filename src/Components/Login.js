import React, { useState, useEffect } from "react";
import './login.css'

const Login = ({ showLogin, setShowLogin, setIsLoggedIn, setToken, token }) => {

    const [user, setUser] = useState('')
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [usernameReg, setUsernameReg] = useState("")
    const [passwordReg, setPasswordReg] = useState("")
    const [register, setRegister] = useState(false)
    const [hideLogForm, setHideLogForm] = useState(false)
    const [userNameTaken, setUserNameTaken] = useState(false)

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

    const logout = () => {
        window.localStorage.removeItem('token');
        setUser({});
    }

    useEffect(() => {
        const token = window.localStorage.getItem('token');
        setToken(token)
        if (token) {
            fetch('http://fitnesstrac-kr.herokuapp.com/api/users/me', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then((response) => response.json())
                .then((result) => {
                    const user = result.data;
                    setUser(user);
                    console.log(user)
                })
                .catch((error) => console.log(error));
        }
    }, [token]);

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
                    console.log(result);
                    setToken(result.token)
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
                    {token && <p>Loged in</p>}

                    {!hideLogForm &&
                        <div className="modal">
                            <div className="details">
                                <h1 className="titleLog">Login</h1>
                            </div>
                            <p className="txt"></p>
                            <form onSubmit={handleSubmit} className="formContainer">
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