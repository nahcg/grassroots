import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import "../styles/profile.css";
const Profile = () => {

	const { user, isAuthenticated, isLoading } = useAuth0();
	const [community, setCommunity] = useState("");
	const [event, setEvent] = useState("");
	const [checkedSkills, setCheckedSkills] = useState([]);


	//todo: ADD experience_level to skillsList 
	//todo: Grab experience_level from SQL and add a place to show it on this page 
	// todo: eventually this skillsList will all be from the database and you can remove it from here ... So create a const [skillsList, setSkillsList] = useState([]); <== This data is populated from the SQL server 

	const skillsList = [
		{
			experience_level: "",
			name: "Frontend - Web Development",
			description: "Description for Skill A",
			id: 1
		},
		{
			name: "Backend - Web Development",
			description: "Description for Skill B for Skill B",
			id: 1
		},
		// {
		// 	name: "Full Stack - Web Development', 'Description for Skill B",
		// 	id: 3
		// },
		// {
		// 	name: "Web Design - Web Development', 'Description for Skill B",
		// 	id: 4
		// },
		// {
		// 	name: "Marketing', 'Description for Skill B",
		// 	id: 5
		// },
		// {
		// 	name: "Photography', 'Description for Skill B",
		// 	id: 6
		// },
		// {
		// 	name: "Videography', 'Description for Skill B",
		// 	id: 7
		// }
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
			.map(({ name, description, id}) => ({name, description, id})) ;
			
		// this is a ARRAY let's JSON this 

		const toSendSkills = JSON.stringify(selectedSkills);

		// console.log(user.name)

		axios.post('http://localhost:8080/profile/submitSkills/', 
		{
			user_id: user.name,
			skills: toSendSkills })
			.then(function (response) {
				// Handle the response from the backend if needed
				// console.log(response.data);
			})
			.catch(function (error) {
				console.error('Error:', error);
			});

	}

	useEffect(() => {

		// populate user field so it isn't undefined
		// user = useAuth0();
		 
		
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
				.get(`http://localhost:8080/profile/skills`)
				.then((res) => {
					console.log(res.data, "skills data");
				});
		};


		fetchData();
		fetchDataEvent();
		fetchSkillsData();
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
