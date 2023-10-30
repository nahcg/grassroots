import React from "react";
import "../styles/CommunityListItem.css";

const CommunityListItem = ({
	name,
	description,
	location,
	cause_tag,
	created_on,
	communityPicture,
}) => {
	return (
		<div className='community-list__item'>
			<img
				src={communityPicture}
				alt='The community main pic'
				className='community-list__image'
			/>
			<div className='community-list__info'>
				<h4>{name}</h4>
				<p className='community-list__description'>
					Description: {description}
				</p>
				<p>Location: {location}</p>
				{cause_tag === 1 && <p>Cause: Politics</p>}
				{cause_tag === 2 && <p>Cause: Environment</p>}
				{cause_tag === 3 && <p>Cause: Social</p>}
				<p>Created on: {created_on}</p>
			</div>
		</div>
	);
};

export default CommunityListItem;
