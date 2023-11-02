import React from "react";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
	return (
		<nav className='app-navbar'>
			<Link to='/home'>
				<button>Home</button>
			</Link>
			<Link to='/explore'>
				<button>Explore</button>
			</Link>
			<Link to='/volunteer'>
				<button>Volunteer</button>
			</Link>
			<Link to='/profile'>
				<button>Profile</button>
			</Link>
		</nav>
	);
};

export default Navbar;
