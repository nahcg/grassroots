import React from "react";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";
import '../App.css'
import background from "../styles/background.jpeg";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
	const { user, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

	console.log("navbar", user)
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
			{user ? (
        <Link to={`/profile/${user.email}`} className='nav-link'>
          Profile
        </Link>
      ) : (
        <div>Sign in to view profile</div>
      )}
		</nav>
	);
};

export default Navbar;
