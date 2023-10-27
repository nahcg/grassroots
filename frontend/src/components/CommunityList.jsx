import React from "react";
import CommunityListItem from "./CommunityListItem";

import "../styles/CommunityList.css";

const CommunityList = ({ communitiesList }) => {
	return (
		<ul className='community-list'>
			{communitiesList.map((community) => (
				<CommunityListItem
					key={community.community_id}
					name={community.name}
					location={community.location}
					communityPicture={community.picture_url}
					cause_tag={community.cause}
				/>
			))}
		</ul>
	);
};

export default CommunityList;
