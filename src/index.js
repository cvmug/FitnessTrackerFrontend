import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Routines from './Components/Routines';
import MyRoutines from './Components/MyRoutines';
import Activities from './Components/Activities';
import { useState } from 'react';


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={<Home setIsLoggedIn={setIsLoggedIn}
              isLoggedIn={isLoggedIn}
              token={token} setToken={setToken}
              username={username} setUsername={setUsername}
            />}
          />
          <Route
            path='/routines'
            element={<Routines />}
          />
          <Route
            path='/myRoutines'
            element={<MyRoutines />}
          />
          <Route
            path='/activities'
            element={<Activities />}
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)


