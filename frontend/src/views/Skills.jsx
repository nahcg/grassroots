import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "../styles/profile.css";
//import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Skills = () => {
	const { user, isLoading } = useAuth0();
	const [ skills, setSkills] = useState(null);
	const [ events, setEvents] = useState(null);

	useEffect(() => {
		// Fetch user skills by email
		if (!isLoading && user) {
			console.log('user:', user.email);
		fetch(`http://localhost:8080/skills//events?user_id=${user.email}`)
			.then((response) => response.json())
			.then((data) => {
				setEvents(data)
			})
			.catch((error) => console.error("Error fetching user skills", error));
	}
}, [isLoading, user]);

	useEffect(() => {
		// Fetch user skills by email
		if (!isLoading && user) {
			console.log('user:', user.email);
		fetch(`http://localhost:8080/skills/user?user_id=${user.email}`)
			.then((response) => response.json())
			.then((data) => {
				setSkills(data)
			})
			.catch((error) => console.error("Error fetching user skills", error));
	}
}, [isLoading, user]);

if (isLoading || !skills || !events ) {
	return <div>Loading...</div>; // Show loading state while fetching data
}
  
return (
	<div className="skills">
		<Navbar />
		<ul>
			{skills.map((skill) => (
				<li key={skill.user_skills_id}>
					{skill.name} - {skill.level}
				</li>
			))}
		</ul>
		<ul>
		{events.map((event) => (
				<li key={event.event_id}>
					{event.title} - {event.description}
				</li>
			))}
		</ul>
	</div>
);
};

export default Skills;
