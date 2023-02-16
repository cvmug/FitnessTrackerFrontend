import React from 'react'
import Header from '../Header'
import CreateRoutine from './CreateRoutine'
import DisplayMyRoutines from './DisplayMyRoutines'

export default function MyRoutines({ setIsLoggedIn, setToken, isLoggedIn, token, user, setUser }) {
  return (
    <div>
        <Header
        setIsLoggedIn={setIsLoggedIn} 
        setToken={setToken}
        isLoggedIn={isLoggedIn} 
        token={token} 
        user={user} 
        setUser={setUser} />              
        <CreateRoutine />
        <DisplayMyRoutines />
    </div>
  )
}
