import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Routines from './Components/Routines/PublicRoutines';
import PublicRoutines from './Components/Routines/PublicRoutines';
import Activities from './Components/Activities';
import { useState } from 'react';


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [token, setToken] = useState('');
  const [user, setUser] = useState('');

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={<Home setIsLoggedIn={setIsLoggedIn}
              isLoggedIn={isLoggedIn}
              token={token} setToken={setToken}
              user={user} setUser={setUser}
            />}
          />
          <Route
            path='/routines'
            element={<Routines
              setIsLoggedIn={setIsLoggedIn}
              isLoggedIn={isLoggedIn}
              token={token} setToken={setToken}
            />}
          />
          <Route
            path='/myRoutines'
            element={<PublicRoutines
              setIsLoggedIn={setIsLoggedIn}
              isLoggedIn={isLoggedIn}
              token={token} setToken={setToken}
            />}
          />
          <Route
            path='/activities'
            element={<Activities
              setIsLoggedIn={setIsLoggedIn}
              isLoggedIn={isLoggedIn}
              token={token} setToken={setToken}
            />}
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


