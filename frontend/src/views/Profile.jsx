import React, {useEffect, useState} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import "../styles/profile.css";
const Profile = () => {
	const { user, isAuthenticated, isLoading } = useAuth0();
	const [community,setCommunity]= useState("");
	const [event,setEvent]= useState("");
	
	useEffect(()=> {
		
		const fetchData = () => {
			axios
				.get(`http://localhost:8080/profile/event-count`)
				.then((res) => {
					debugger
					console.log(res.data, "community data");
					setCommunity(res.data[0].count);
				});
		};
		// const fetchDataEvent = () => {
		// 	axios
		// 		.get(`http://localhost:8080/profile/causes`)
		// 		.then((res) => {
		// 			console.log(res, "Event data");
		// 			setEvent(res);
		// 		});
		// };
		fetchData();
		// fetchDataEvent();
	}, [])
	if (isLoading) {
		return <div>Loading ...</div>;
	}
	return (
		isAuthenticated && (
			<div>
				<div className="profile-section">
					<div>
						<img src={user.picture} alt={user.name} />
					</div>
					<div>
						<h2>{user.name}</h2>
						<div className="profile-count-section"><p># of Communities Joined</p><span>{community}</span></div>
						<div className="profile-count-section"><p># of Events RSVP</p><span>{event}</span></div>
					</div>
				</div>
			</div>
		)
	);
};

export default Profile;
