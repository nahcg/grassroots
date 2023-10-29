import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Navigation } from "../components/navigation";
import LogoutButton from "../components/Logout";

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
				<nav id="menu" className="navbar navbar-default navbar-fixed-top">
				<div className="container">
					<div className="navbar-header">
						<button
							type="button"
							className="navbar-toggle collapsed"
							data-toggle="collapse"
							data-target="#bs-example-navbar-collapse-1"
						>
							{" "}
							<span className="sr-only">Toggle navigation</span>{" "}
							<span className="icon-bar"></span>{" "}
							<span className="icon-bar"></span>{" "}
							<span className="icon-bar"></span>{" "}
						</button>
						<a className="navbar-brand page-scroll" href="#page-top">
							GrassRoots
						</a>{" "}
					</div>

					<div
						className="collapse navbar-collapse"
						id="bs-example-navbar-collapse-1"
					>
						<div>
							<img src={user.picture} alt={user.name} />
							<h2>{user.name}</h2>
							<p>{user.email}</p>
							<LogoutButton />
						</div>
					</div>
				</div>
			</nav>
		</div>
		)
	);
}

export default Home;
