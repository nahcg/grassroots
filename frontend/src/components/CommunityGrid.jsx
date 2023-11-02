import React from "react";
import CommunityGridItem from "./CommunityGridItem";
import { Link } from "react-router-dom";

import "../styles/CommunityGrid.css";

const CommunityGrid = ({ communitiesData }) => {
	return (
		<ul className='community-grid'>
			{communitiesData.map((community) => (
				<Link to={`/communities/community/${community.community_id}`} key={community.community_id}>
				<CommunityGridItem
					key={community.community_id}
					name={community.name}
					location={community.location}
					communityPicture={community.picture_url}
					cause_tag={community.cause}
				/>
				</Link>
			))}
		</ul>
	);
};

export default CommunityGrid;
