import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/Community.css";
import Navbar from "../components/Navbar";
import MemberButton from "../components/MemberButton";

const Community = () => {
	const [community, setCommunity] = useState(null);
	const { community_id } = useParams();

	useEffect(() => {
		// Fetch community by name
		fetch(`http://localhost:8080/communities/community/${community_id}`)
			.then((response) => response.json())
			.then((data) => {
				setCommunity(data[0]);
			})
			.catch((error) => console.error("Error fetching community", error));
	}, [community_id]);

	const routes = [
		{ path: `/posts/${community_id}`, label: "Forum" },
		{ path: `/events/${community_id}`, label: "Events" },
	];


	// Log the community data when it changes
	useEffect(() => {
		if (community) {
			console.log("Community data:", community);
		}
	}, [community]);

	if (!community) {
		return <div>Loading community information...</div>;
	}

	return (
		<div className='routes'>
			<Navbar />
			<MemberButton />
			{routes.map((route, index) => (
				<Link key={index} to={route.path}>
					<button className='button'>{route.label}</button>
				</Link>
			))}
			<div className='community-container'>
				<h1>{community.name}</h1>
				<img src={community.picture_url} alt={community.name} />
				<p>{community.description}</p>
				<p>Location: {community.location}</p>
			</div>
		</div>
	);
};

export default Community;
