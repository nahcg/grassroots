import React, { useState, useEffect } from "react";
// import { useAuth0 } from "@auth0/auth0-react";
import { Navigation } from "../components/Navigation";
import { Header } from "../components/header.jsx";
import { Features } from "../components/features";
import { About } from "../components/about";
import { Contact } from "../components/contact";
import JsonData from "../data/data.json";

const Landing = () => {
	// const { isAuthenticated } = useAuth0(); // Check if the user is authenticated
	const [landingPageData, setLandingPageData] = useState({});
	useEffect(() => {
		setLandingPageData(JsonData);
	}, []);

	// return (
	//   <div>
	//     <h1>Welcome to Grassroots App</h1>

	//     {/* Display "Login" and "Register" buttons if the user is not authenticated */}
	//     {!isAuthenticated && (
	//       <div>
	//         <Link to="/login">
	//           <button>Login</button>
	//         </Link>
	//         <Link to="/register">
	//           <button>Register</button>
	//         </Link>
	//       </div>
	//     )}

	//     {/* "Join Communities" button that redirects to login or register */}
	//     {!isAuthenticated ? (
	//       <Link to="/login">
	//         <button>Join Communities</button>
	//       </Link>
	//     ) : (
	//       <Link to="/register">
	//         <button>Join Communities</button>
	//       </Link>
	//     )}
	//   </div>
	// );

	return (
		<div>
			<Navigation />
			<Header data={landingPageData.Header} />
			<Features data={landingPageData.Features} />
			<About data={landingPageData.About} />
			<Contact data={landingPageData.Contact} />
		</div>
	);
};

export default Landing;
