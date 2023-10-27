import React from "react";
import CommunityListItem from "./CommunityListItem";

import "../styles/CommunityList.css";

const CommunityList = ({ communitiesList }) => {
	return (
		<ul className='community-list'>
			{communitiesList.map((community) => (
				<CommunityListItem
					name={community.name}
					location={community.location}
					communityPicture={community.community_picture}
				/>
			))}
		</ul>
	);
};

export default CommunityList;
