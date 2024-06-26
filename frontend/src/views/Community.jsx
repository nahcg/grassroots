import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/Community.css";
import Navbar from "../components/Navbar";
import MemberButton from "../components/MemberButton";
import { useAuth0 } from "@auth0/auth0-react";

const Community = () => {
	const [community, setCommunity] = useState(null);
	const { community_id } = useParams();
	const { user, isLoading } = useAuth0();

	useEffect(() => {
		// Fetch community by name
		if (!isLoading && user) {
		fetch(`http://localhost:8080/communities/community/${community_id}`)
			.then((response) => response.json())
			.then((data) => {
				setCommunity(data[0]);
			})
			.catch((error) => console.error("Error fetching community", error));
	}
}, [isLoading, user, community_id]);

  const routes = [
    { path: `/communities/community/${community_id}`, label: 'About' },
    { path: `/posts/${community_id}`, label: 'Forum' },
    { path: `/events/${community_id}`, label: 'Events' },
  ];
  
  
  // Log the community data when it changes
  useEffect(() => {
    if (community) {
      console.log('Community data:', community);
    }
  }, [community]);

	if (!community) {
		return <div>Loading community information...</div>;
	}

	return (
		<div className="community_about">
      <Navbar />
			<div className="community_page">
				<div className="member_button">
      <MemberButton/>
			</div>
			<div className="community_routes">
  {routes.map((route, index) => (
    <Link key={index} to={route.path} className="route-link">
      {route.label}
    </Link>
  ))}
</div>
      <div className="community_container">
				<h1>{community.name}</h1>
				<div class="fadein">
				<img src={community.picture_url} alt={community.name} />
				</div>
				<p>{community.description}</p>
				<p>Location: {community.location}</p>
				<div className="community_missions_goals">
    <h2>Missions</h2>
    <ul>
      <li>Sample Mission 1</li>
      <li>Sample Mission 2</li>
      <li>Sample Mission 3</li>
    </ul>

    <h2>Goals</h2>
    <ul>
      <li>Sample Goal 1</li>
      <li>Sample Goal 2</li>
      <li>Sample Goal 3</li>
    </ul>
  </div>
</div>
			</div>
			</div>
	);
};

export default Community;
