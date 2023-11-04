import React, {useEffect, useState} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import "../styles/profile.css";
const Profile = () => {
	const { user, isAuthenticated, isLoading } = useAuth0();
	const [community,setCommunity]= useState("");
	const [event,setEvent]= useState("");

	const skillsList = [{
		name: "Frontend - Web Development', 'Description for Skill A",
		id: 1
	},
	{
		name: "Backend - Web Development', 'Description for Skill B",
		id: 2
	},
	{
		name: "Full Stack - Web Development', 'Description for Skill B",
		id: 3
	},
	{
		name: "Web Design - Web Development', 'Description for Skill B",
		id: 4
	},
	{
		name: "Marketing', 'Description for Skill B",
		id: 5
	},
	{
		name: "Photography', 'Description for Skill B",
		id: 6
	},
	{
		name: "Videography', 'Description for Skill B",
		id: 7
	}
];
	
	useEffect(()=> {
		const fetchData = () => {
			axios
				.get(`http://localhost:8080/profile/event-count`)
				.then((res) => {
					console.log(res.data, "community data");
					setCommunity(res.data[0].count);
				});
		};
		const fetchDataEvent = () => {
			axios
				.get(`http://localhost:8080/profile/causes`)
				.then((res) => {
					console.log(res, "Event data");
					res.data && setEvent(res.data);
				});
		};
		fetchData();
		fetchDataEvent();
	}, [])
	if (isLoading) {
		return <div>Loading ...</div>;
	}
	return (
		isAuthenticated && (
			<div className="profile-wrapper">
				<div className="profile-section">
					<div>
						<img src={user.picture} alt={user.name} />
					</div>
					<div className="profile-details">
						<h2>{user.name}</h2>
						<div className="profile-count-section"><p># of Communities Joined</p><span>{community}</span></div>
						<div className="profile-count-section"><p># of Events RSVP</p><span>{event}</span></div>
					</div>
				</div>
				<div>
					<h3 className="skill-header">Volunteering Skills</h3>
					<p className="skill-text">What skills do you have?</p>
					<div className="skills-container">
						{skillsList.map((item, index) => (
							<div key={index}>
								<input value={item.name} type="checkbox" />
								<span className="checkbox-label">{item.name}</span>
							</div>
						))}
					</div>
					<button className="skill-save">Save</button>
				</div>
			</div>
		)
	);
};

export default Profile;
