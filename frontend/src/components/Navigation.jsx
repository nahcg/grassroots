import React from "react";

import LoginButton from "./Login";
import LogoutButton from "./Logout";
import { useAuth0 } from "@auth0/auth0-react";
import "../styles/Navigation.css";
import logo from "../Grassroots.png";

const Navigation = (props) => {
	const { user, isAuthenticated, isLoading } = useAuth0();

	return (
		<nav id='menu' className='navbar navbar-default navbar-fixed-top'>
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
					<a className='navbar-brand page-scroll logo' href='#page-top'>
						<img src={logo} />
					</a>
				</div>

				<div
					className='collapse navbar-collapse'
					id='bs-example-navbar-collapse-1'
				>
					<ul className='nav navbar-nav navbar-right'>
						{!isAuthenticated && (
							<li>
								<a href='#features' className='page-scroll'>
									Features
								</a>
							</li>
						)}
						{!isAuthenticated && (
							<li>
								<a href='#about' className='page-scroll'>
									About
								</a>
							</li>
						)}
						{!isAuthenticated && (
							<li>
								<a href='#contact' className='page-scroll'>
									Contact
								</a>
							</li>
						)}
						{isAuthenticated && (
							<li>
								<div>
									<img
										src={user.picture}
										alt='profile'
										className='navigation__profile-pic'
									/>
									{user.name}
								</div>
							</li>
						)}
						<li>
							{!isAuthenticated && <LoginButton />}
							{isAuthenticated && <LogoutButton />}
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navigation;
