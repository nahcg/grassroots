import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import axios from "axios";

function Home() {
	const { user, isAuthenticated, isLoading } = useAuth0();
	console.log(user);
	// useEffect(() => {
	// 	axios
	// 		.post("http://localhost:8080/api/users/register", { ...user })
	// 		.then((res) => {
	// 			console.log("We are in the post ", res);
	// 			console.log(res.data.result.exists);
	// 		});
	// }, [user]);

	return (
		<div>
			Hello
			<div className='nav-links'>
				<Link to='/home'>Home</Link>
				<Link to='/community'>Communties</Link>
				<Link to='/event'>Events</Link>
				<Link to='/volunteer'>Volunteer</Link>
				<Link to='/profile'>Profile</Link>
			</div>
		</div>
	);
}

export default Home;
