import React from "react";
import "../styles/Navbar.css";

import LoginButton from "./Login";
import LogoutButton from "./Logout";

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
	return (
		<nav className='navbar'>
			<h1>Grassroots</h1>
			<LoginButton />
			<LogoutButton />
		</nav>
	);
};

export default Navbar;
