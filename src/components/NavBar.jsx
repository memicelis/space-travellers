import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../images/planet.png';

const NavBar = () => (
  <>
    <nav className="flex justify-between px-12 py-6 border-b-2">
      <div className="flex items-center">
        <div className="w-16 h-16">
          <img src={logo} alt="Website logo" />
        </div>
        <h1 className="text-xl font-bold">Space Travellers` Hub</h1>
      </div>
      <ul className="flex space-x-4 items-center justify-center">
        <li className="link">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'text-blue-500 underline' : 'text-blue-500')}
          >
            Rockets
          </NavLink>
        </li>
        <li className="link">
          <NavLink to="/missions" className={({ isActive }) => (isActive ? 'text-blue-500 underline' : 'text-blue-500')}>
            Missions
          </NavLink>
        </li>
        <hr className="top-0 bottom-0 left-0 h-4 w-0.5 bg-gray-600" />
        <li className="link">
          <NavLink to="/myprofile" className={({ isActive }) => (isActive ? 'text-blue-500 underline' : 'text-blue-500')}>
            My Profile
          </NavLink>
        </li>
      </ul>
    </nav>
  </>
);

export default NavBar;
