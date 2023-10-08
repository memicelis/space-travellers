import React from 'react';
import { NavLink } from 'react-router-dom';
// import logo from '../images/planet.png';
import './NavBar.css';

const NavBar = () => (
  <>
    <nav className="navBar">
      <div className="leftSideContainer">
        {/* <img src={logo} alt="Website logo"></img> */}
        <h1>Space Travellers` Hub</h1>
      </div>
      <ul className="rightSideContainer">
        <li className="link">
          <NavLink to="/">Rockets</NavLink>
        </li>
        <li className="link">
          <NavLink to="/missions">Missions</NavLink>
        </li>
        <li className="link">
          <NavLink to="/myprofile">My Profile</NavLink>
        </li>
      </ul>
    </nav>
  </>
);

export default NavBar;
