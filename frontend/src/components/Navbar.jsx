import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/register">Register</Link>
        <Link to="/community">Communties</Link>
        <Link to="/events">Events</Link>
        <Link to="/volunteer">Volunteer</Link>
        <Link to="/profile">Profile</Link>
      </div>
    </nav>
  );
};

export default Navbar;