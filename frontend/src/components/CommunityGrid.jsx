import React from "react";
import CommunityGridItem from "./CommunityGridItem";

import "../styles/CommunityGrid.css";

const CommunityGrid = ({ communitiesData }) => {
	return (
		<ul className='community-grid'>
			{communitiesData.map((community) => (
				<CommunityGridItem
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

export default CommunityGrid;
