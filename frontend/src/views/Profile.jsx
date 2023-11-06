import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import "../styles/profile.css";
const Profile = () => {

	const { user, isAuthenticated, isLoading } = useAuth0();
	const [community, setCommunity] = useState("");
	const [event, setEvent] = useState("");
	const [checkedSkills, setCheckedSkills] = useState([]);
	const [userskillList, setUserSkillList] = useState([]);

	const skillsList = [

		{
			experience_level: "2",
			name: "Frontend - Web Development",
			description: "Description for Skill A",
			id: 1
		},
		{
			experience_level: "3",
			name: "Backend - Web Development",
			description: "Description for Skill B for Skill B",
			id: 2
		},
		{
			experience_level: "4",
			name: "Full Stack - Web Development",
			description: "Description for Skill B",
			id: 3
		},
		{
			experience_level: "5",
			name: "Web Design - Web Development",
			description: "Description for Skill B",
			id: 4
		},
		{
			experience_level: "1",
			name: "Marketing",
			description: "Description for Skill B",
			id: 5
		},
		{
			experience_level: "1",
			name: "Photography", 
			description: "Description for Skill B",
			id: 6
		},
		{
			experience_level: "1",
			name: "Videography",
			description: "Description for Skill B",
			id: 7
		}
	];

	const handleSkillChange = (id) => {

		const isChecked = checkedSkills.includes(id);

		if (isChecked) {
			// If it's already checked, you uncheck it => filter it out of array
			setCheckedSkills(checkedSkills.filter((skillId) => skillId !== id))
		}
		else {
			setCheckedSkills([...checkedSkills, id])
		}
	}

	// Send the checked skills to the backend using Axios
	const handleSubmitSkills = () => {
		// Extract the selected skill based on the ID 
		const selectedSkills = skillsList
			.filter((skill) => checkedSkills.includes(skill.id))
			.map(({ name, description, id, experience_level }) => ({ name, description, id, experience_level }));
	
		const toSendSkills = JSON.stringify(selectedSkills);
		console.log(toSendSkills);
		// First, save the new skills
		axios
			.post('http://localhost:8080/profile/submitSkills/', {
				user_id: user.name,
				skills: toSendSkills
			})
			.then(function (response) {
				// Handle the response from the backend if needed
				// After successfully saving skills, fetch the updated skills
				return axios.get(`http://localhost:8080/profile/skills`, {
					params: {
						user_id: user.name,
					},
				});
			})
			.then((res) => {
				// Update your state or perform further actions with the skills data
				setUserSkillList(res.data);
			})
			.catch(function (error) {
				console.error('Error:', error);
			});
	};
	
	useEffect(() => {

		if (isAuthenticated && user && user.name) {
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

			// FIGURE OUT HOW TO PUT THIS BELOW INTO THE WEBSITE SOMEHOW ...
			// HINT 	const [skillsData, setSkillsData] = useState([]);
			const fetchSkillsData = () => {
				axios
					.get(`http://localhost:8080/profile/skills`, {
						params: {
							user_id: user.name, // Pass user.name as a query parameter
						},
					})
					.then((res) => {
						console.log(res.data);

						// Update your state or perform further actions with the skills data
						setUserSkillList(res.data);
					})
					.catch((error) => {
						console.error('Error fetching skills data:', error);
					});
			};

			fetchData();
			fetchDataEvent();
			fetchSkillsData();

		}
	}, [isAuthenticated, user]);

	//
	useEffect(() => {

		console.log("USER SKILL LIST", userskillList);

	}, [userskillList]);

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
					{userskillList.map((skill, index) => (
						<li key={index}>
							<ul>
								<li>skill experience: {skill.experience_level}</li>
								<li>skill id : {skill.skill_id}</li>
							</ul>
						</li>
					))}
				</div>

				<div>
					<h3 className="skill-header">Volunteering Skills</h3>
					<p className="skill-text">What skills do you have?</p>
					<div className="skills-container">
						{skillsList?.map((item, index) => (
							<div key={index}>
								<input
									value={item.name}
									type="checkbox"
									onChange={() => handleSkillChange(item.id)}
								/>
								<span className="checkbox-label">{item.name}</span>
							</div>
						))}
					</div>
					<button className="skill-save" onClick={handleSubmitSkills}>Save</button>
				</div>
			</div>
		)
	);
};

export default Profile;
