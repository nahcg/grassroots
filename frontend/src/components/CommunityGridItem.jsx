import React from "react";
import "../styles/CommunityGridItem.css";

// const testCommunity = {
// 	name: "Anti-Justin Trudeau",
// 	description:
// 		"This community is to apose Justin Trudeau and discuss ways we can stop him from doing what he wants in this country.",
// 	location: "Toronto, ON",
// 	cause: 1,
// 	creation_date: "2023-10-26",
// 	community_picture:
// 		"https://www.hilltimes.com/wp-content/uploads/2022/03/DSC04409.t62012ebb.m800.x3E3UulEE-1.jpg.webp",
// };

const CommunityGridItem = ({ name, location, communityPicture, cause_tag }) => {
	return (
		<div className='community-grid__item'>
			<img
				src={communityPicture}
				alt='The community main pic'
				className='community-grid__image'
			/>
			<div className='community-grid__info'>
				<h4>{name}</h4>
				<span>📍{location}</span>
				{cause_tag === 1 && <div>Politics</div>}
				{cause_tag === 2 && <div>Environment</div>}
				{cause_tag === 3 && <div>Social</div>}
			</div>
		</div>
	);
};

export default CommunityGridItem;
