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

const SkillSwapListItem = ({
	name,
	description,
	status,
	location,
	cause,
	creation_date,
	start_date,
	end_date,
	volunteersNeeded,
}) => {
	return (
		<div className='skillswap-list-item__container'>
			<div className='skillswap-list-item__status'>{status}</div>
			<div className='skillswap-list-item__header'>
				<h2>{name}</h2>
				<p>ℹ️ {description}</p>
			</div>
			<div className='skillswap-list-item__info'>
				<p>📍 {location}</p>
				{cause === 1 && <p>Politics</p>}
				{cause === 2 && <p>Environment</p>}
				{cause === 3 && <p>Social</p>}
			</div>
			<div className='skillswap-list-item__dates'>
				<p>Posted On: {creation_date}</p>
				<p>Start: {start_date}</p>
				<p>End: {end_date}</p>
			</div>
			<button className='skillswap-list-item__join-button'>Join</button>
			<p>
				{} out of {volunteersNeeded}
			</p>
		</div>
	);
};

export default SkillSwapListItem;
