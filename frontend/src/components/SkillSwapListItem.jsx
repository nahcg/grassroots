import React, { useEffect, useState } from "react";
import "../styles/SkillSwapListItem.css";
import axios from "axios";

const SkillSwapListItem = ({
	volunteer_board_id,
	name,
	description,
	status,
	location,
	cause,
	creation_date,
	start_date,
	end_date,
	volunteersNeeded,
	user,
}) => {
	const [userVolunteerPositions, setUserVolunteerPositions] = useState([]);
	const [volunteerPositionCount, setVolunteerPositionCount] = useState(0);

	useEffect(() => {
		axios.get(`http://localhost:8080/volunteer/${user}`).then((res) => {
			let data = res.data;
			setUserVolunteerPositions(data.map((obj) => obj.volunteer_board_id));
		});
		axios
			.get(`http://localhost:8080/volunteer/count/${volunteer_board_id}`)
			.then((res) => {
				let data = res.data[0].count;
				setVolunteerPositionCount(parseInt(data));
			});
	}, [volunteerPositionCount]);

	const handleJoinClick = () => {
		axios
			.post(`http://localhost:8080/volunteer/${user}/${volunteer_board_id}`)
			.then(() => {
				setVolunteerPositionCount(volunteerPositionCount + 1);
			});
	};

	const handleCancelClick = () => {
		axios
			.delete(`http://localhost:8080/volunteer/${user}/${volunteer_board_id}`)
			.then(() => {
				setVolunteerPositionCount(volunteerPositionCount - 1);
			});
	};

	const volunteerPositionsNotAvailable =
		volunteerPositionCount === volunteersNeeded;
	const isUserSignedUpToPosition =
		userVolunteerPositions.includes(volunteer_board_id);

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
				<p>Posted On: {creation_date.slice(0, 10)}</p>
				<p>Start: {start_date.slice(0, 10)}</p>
				<p>End: {end_date.slice(0, 10)}</p>
			</div>
			{volunteerPositionsNotAvailable && (
				<button className='skillswap-list-item__full-button'>
					Not Available
				</button>
			)}
			{isUserSignedUpToPosition && (
				<button
					className='skillswap-list-item__cancel-button'
					onClick={handleCancelClick}
				>
					Cancel
				</button>
			)}
			{!isUserSignedUpToPosition && !volunteerPositionsNotAvailable && (
				<button
					className='skillswap-list-item__join-button'
					onClick={handleJoinClick}
				>
					Join
				</button>
			)}
			<p>
				{volunteerPositionCount} out of {volunteersNeeded}
			</p>
		</div>
	);
};

export default SkillSwapListItem;
