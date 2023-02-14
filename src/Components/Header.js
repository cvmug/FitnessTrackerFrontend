import React from "react";
import { Link } from 'react-router-dom';
import './header.css'


const Header = () => {
    return (
        <>
            <nav className="headerNav">
                <p className="title">FitnessTracker</p>
                <ul className="list">
                    <li><Link to='/' className="headerLink">HOME</Link></li>
                    <li><Link to='/routines' className="headerLink">ROUTINES</Link></li>
                    <li><Link to='/myRoutines' className="headerLink">MY ROUTINES</Link></li>
                    <li><Link to='/activities' className="headerLink">ACTIVITIES</Link></li>
                </ul>
            </nav>
        </>
    )
}

export default Header