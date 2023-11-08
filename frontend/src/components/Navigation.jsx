import React from "react";
import LoginButton from "./Login";
import LogoutButton from "./Logout";
import { useAuth0 } from "@auth0/auth0-react";
import "../styles/Navigation.css";
import growth from "./growth.png";

const Navigation = () => {
	const { isAuthenticated } = useAuth0();

	return (
		<nav id='menu' className='navbar navbar-default navbar-fixed-top'>
			<div className='container'>
				<div className='navbar-header'>
					<div className='navbar_brand'>
						GrassRoots
						<div className='brand_icon'>
							<img src={growth} alt='' />
						</div>
					</div>
				</div>
				<div className='navbar_buttons'>
					<ul>
						{!isAuthenticated && <LoginButton />}
						{isAuthenticated && <LogoutButton />}
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navigation;
