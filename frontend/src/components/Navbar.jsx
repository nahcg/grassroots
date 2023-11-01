import React from "react";
import "../styles/Navbar.css";
import { Link } from 'react-router-dom';

import LoginButton from "./Login";
import LogoutButton from "./Logout";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Grassroots</h1>
			<LoginButton />
			<LogoutButton />
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/register">Register</Link>
        <Link to="/explore">Explore</Link>
        <Link to="/events">Events</Link>
        <Link to="/volunteer">Volunteer</Link>
        <Link to="/profile">Profile</Link>
      </div>
    </nav>
  );


};

export default Navbar;
