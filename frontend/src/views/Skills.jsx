import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "../styles/profile.css";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const Skills = () => {
	const { user, isLoading } = useAuth0();
	const [ skills, setSkills] = useState(null);
	const [ events, setEvents] = useState(null);
	const [editMode, setEditMode] = useState(false);
	const [editedSkill, setEditedSkill] = useState(null);
	const { email } = useParams();

	useEffect(() => {
		// Fetch user skills by email
		if (!isLoading) {
		fetch(`http://localhost:8080/profile/events?user_id=${email}`)
			.then((response) => response.json())
			.then((data) => {
				setEvents(data)
			})
			.catch((error) => console.error("Error fetching user skills", error));
	}
}, [isLoading, email]);

	useEffect(() => {
		// Fetch user skills by email
		if (!isLoading) {
		fetch(`http://localhost:8080/profile/user?user_id=${email}`)
			.then((response) => response.json())
			.then((data) => {
				setSkills(data)
			})
			.catch((error) => console.error("Error fetching user skills", error));
	}
}, [isLoading, email]);

const handleEditModeToggle = () => {
	setEditMode(!editMode); // Toggle edit mode
};

const handleSaveSkills = () => {
	// Send PUT request to update the edited skill
	console.log("editedSkill2", editedSkill)

  fetch(`http://localhost:8080/profile/skills`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: editedSkill.name }),
  })
    .then((response) => {
      if (!response.ok && response.status !== 409) {
        throw new Error("Failed to insert skill");
      }
      return response.json();
    })
    .then(() => {
      // Send PUT request to update the edited skill
      return fetch(`http://localhost:8080/profile/user/${email}/skill/${editedSkill.user_skills_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
					level: editedSkill.level,
					name: editedSkill.name
			}),
	});
})
			.then((response) => {
					if (!response.ok) {
							throw new Error("Failed to update skill");
					}
					return response.json();
			})
			.then((data) => {
					// Update the skills state with the updated skill data if needed
					// You can add additional logic here based on your requirement
					setEditedSkill(null); // Clear edited skill state
					setEditMode(false); // Exit edit mode after saving
					setSkills((prevSkills) => 
						prevSkills.map(skill => 
							skill.user_skills_id === editedSkill.user_skills_id ? data : skill
						)
					);
				})
			.catch((error) => {
					console.error("Error updating skill:", error);
			});
};

const handleEditSkill = (skill) => {
	setEditedSkill(skill); // Set the skill to be edited
	setEditMode(true); // Enter edit mode
};

const handleLevelChange = (e) => {
	if (!editedSkill) return; // Check if there is an edited skill
	setEditedSkill((prevEditedSkill) => ({
			...prevEditedSkill,
			level: e.target.value,
	})); // Update the level in editedSkill
};

if (isLoading || !skills || !events ) {
	return <div>Loading...</div>; // Show loading state while fetching data
}

return (
	<div className="profile">
		<Navbar />
		<div className="skills">
		<ul>
			{skills.map((skill) => (
				<li key={skill.user_skills_id}>
					{skill.name} - {skill.level}
					{editMode && editedSkill && editedSkill.user_skills_id === skill.user_skills_id && (
                                <div>
                                    <input
                                        type="text"
                                        defaultValue={editedSkill.name}
                                        onChange={(e) => setEditedSkill({ ...editedSkill, name: e.target.value })}
                                    />
                                    <select value={editedSkill.level} onChange={handleLevelChange}>
                                        <option value="Beginner">Beginner</option>
                                        <option value="Intermediate">Intermediate</option>
                                        <option value="Advanced">Advanced</option>
                                    </select>
                                    <button onClick={handleSaveSkills}>Save</button>
                                </div>
                            )}
                            {!editMode && (
                                <button onClick={() => handleEditSkill(skill)}>Edit</button>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="events">
                <ul>
                    {events.map((event) => (
                        <li key={event.event_id}>
                            {event.title} - {event.description}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="editButton">
                {email === user.email && (
                    <button onClick={editMode ? handleSaveSkills : handleEditModeToggle}>
                        {editMode ? "Save" : "Edit"}
                    </button>
                )}
            </div>
        </div>
    );
};

export default Skills;
