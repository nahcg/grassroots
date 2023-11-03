import React from "react";
import "../styles/SkillSwapListItem.css";

// TEST DATA
const volunteerData = {
	name: "Test Volunteer Position",
	description:
		"Need volunteers to design and build the frontend of our website.",
	status: "Open",
	skills: [1, 4],
	cause: 1,
	volunteersNeeded: 40,
	volunteersSignedUp: 23,
};

const SkillSwapListItem = () => {
	return (
		<div className='skillswap-list-item__container'>
			<h2>{volunteerData.name}</h2>
			<p>{volunteerData.description}</p>
			<div className='skillswap-list-item__info'>
				<div className='skillswap-list-item__status'>
					{volunteerData.status}
				</div>
				<div>{volunteerData.cause}</div>
				<p>
					{volunteerData.volunteersSignedUp} out of{" "}
					{volunteerData.volunteersNeeded}
				</p>
			</div>
			<button className='skillswap-list-item__join-button'>Join</button>
		</div>
	);
};

export default SkillSwapListItem;
