import React from "react";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";
import '../App.css'
import background from "../styles/background.jpeg";

const Navbar = () => {
	return (
		<nav className='app-navbar'>
			<div className="background_nav"><img src={background} alt="" /></div>
			<Link to='/home' className='nav-link'>
				Home
			</Link>
			<Link to='/explore' className='nav-link'>
				Explore
			</Link>
			<Link to='/volunteer' className='nav-link'>
				Volunteer
			</Link>
			<Link to='/profile' className='nav-link'>
				Profile
			</Link>
		</nav>
	);
};

export default Navbar;
