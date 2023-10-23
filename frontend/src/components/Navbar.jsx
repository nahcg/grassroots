import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/community">Communties</Link>
        <Link to="/event">Events</Link>
        <Link to="/volunteer">Volunteer</Link>
      </div>
    </nav>
  );
};

export default Navbar;