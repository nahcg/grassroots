import React from "react";
import "../styles/Navbar.css";
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/explore">Explore Communities</Link>
        <Link to="/volunteer">Volunteer</Link>
        <Link to="/profile">Profile</Link>
      </div>
    </nav>
  );


};

export default Navbar;
