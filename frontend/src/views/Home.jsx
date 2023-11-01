import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import axios from "axios";
import CommunityScroller from "../components/community-scroller";

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
		isAuthenticated && (
			<div>
				<nav id='menu' className='navbar navbar-default'>
					<div className='container'>
						<div className='navbar-header'>
							<button
								type='button'
								className='navbar-toggle collapsed'
								data-toggle='collapse'
								data-target='#bs-example-navbar-collapse-1'
							>
								{" "}
								<span className='sr-only'>Toggle navigation</span>{" "}
								<span className='icon-bar'></span>{" "}
								<span className='icon-bar'></span>{" "}
								<span className='icon-bar'></span>{" "}
							</button>
							<a className='navbar-brand page-scroll' href='#page-top'>
								GrassRoots
							</a>{" "}
						</div>

						<div
							className='collapse navbar-collapse'
							id='bs-example-navbar-collapse-1'
						>
							<div className='profile-section'>
								<img
									src={user.picture}
									alt={user.name}
									className='profile-icon'
								/>
								<h2>{user.name}</h2>
							</div>
						</div>
					</div>
				</nav>
				<div>
					<h3>My Communities</h3>
					<CommunityScroller />
				</div>
			</div>
		)
	);
}

export default Home;
