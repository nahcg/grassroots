import React from "react";
import "../styles/Navbar.css";

import LoginButton from "./Login";
import LogoutButton from "./Logout";

const Navbar = () => {
	return (
		<nav className='navbar'>
			<h1>Grassroots</h1>
			<LoginButton />
			<LogoutButton />
		</nav>
	);
};

export default Navbar;
