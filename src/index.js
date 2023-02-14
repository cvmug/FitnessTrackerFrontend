import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Routines from './Components/Routines';
import MyRoutines from './Components/MyRoutines';
import Activities from './Components/Activities';


const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={<Home />}
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


