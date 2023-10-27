import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import TextField from "@mui/material/TextField";

import "../styles/Explore.css";
import CommunityList from "../components/CommunityList";

// const testCommunities = [
// 	{
// 		name: "Anti-Justin Trudeau",
// 		description:
// 			"This community is to apose Justin Trudeau and discuss ways we can stop him from doing what he wants in this country.",
// 		location: "Toronto, ON",
// 		cause: 1,
// 		creation_date: "2023-10-26",
// 		community_picture:
// 			"https://www.hilltimes.com/wp-content/uploads/2022/03/DSC04409.t62012ebb.m800.x3E3UulEE-1.jpg.webp",
// 	},
// 	{
// 		name: "Park Cleaners",
// 		description: "Our goal is to clean the parks of Brampton.",
// 		location: "Brampton, ON",
// 		cause: 2,
// 		creation_date: "2023-10-27",
// 		community_picture:
// 			"https://bloximages.chicago2.vip.townnews.com/bramptonguardian.com/content/tncms/assets/v3/editorial/3/a8/3a86a09b-06c6-579b-9c7f-5856b297746a/63d888170450d.image.jpg?resize=1200%2C800",
// 	},
// 	{
// 		name: "Anti-Justin Trudeau",
// 		description:
// 			"This community is to apose Justin Trudeau and discuss ways we can stop him from doing what he wants in this country.",
// 		location: "Toronto, ON",
// 		cause: 1,
// 		creation_date: "2023-10-26",
// 		community_picture:
// 			"https://www.hilltimes.com/wp-content/uploads/2022/03/DSC04409.t62012ebb.m800.x3E3UulEE-1.jpg.webp",
// 	},
// 	{
// 		name: "Park Cleaners",
// 		description: "Our goal is to clean the parks of Brampton.",
// 		location: "Brampton, ON",
// 		cause: 2,
// 		creation_date: "2023-10-27",
// 		community_picture:
// 			"https://bloximages.chicago2.vip.townnews.com/bramptonguardian.com/content/tncms/assets/v3/editorial/3/a8/3a86a09b-06c6-579b-9c7f-5856b297746a/63d888170450d.image.jpg?resize=1200%2C800",
// 	},
// ];

const Explore = () => {
	const { user, isAuthenticated, isLoading } = useAuth0();
	const [communitiesData, setCommunitiesData] = useState([]);
	const [causeFilterSelection, setCauseFilterSelection] = useState(0);
	const [inputText, setInputText] = useState("");

	useEffect(() => {
		const fetchData = () => {
			axios
				.get(`http://localhost:8080/api/communities/${causeFilterSelection}`)
				.then((res) => {
					// console.log(res.data.communities);
					setCommunitiesData(res.data.communities);
				});
		};
		fetchData(causeFilterSelection);
	}, [causeFilterSelection]);

	const fetchDataSearchFilter = (inputText) => {
		axios
			.get(`http://localhost:8080/api/communities/`, {
				params: {
					name: inputText,
				},
			})
			.then((res) => {
				setCommunitiesData(res.data.communities);
			});
	};

	let inputHandler = (e) => {
		//convert the input text to lower case
		let lowerCase = e.target.value.toLowerCase();
		setInputText(lowerCase);
		fetchDataSearchFilter(lowerCase);
	};

	return (
		<div>
			<div className='explore-page'>
				<h1>Find a Community</h1>
				<h2>Cause</h2>
				<div className='explore-page_causes'>
					<div>
						<button onClick={() => setCauseFilterSelection(0)}>All</button>
						<button onClick={() => setCauseFilterSelection(1)}>Politics</button>
						<button onClick={() => setCauseFilterSelection(2)}>
							Environment
						</button>
						<button onClick={() => setCauseFilterSelection(3)}>Social</button>
					</div>
				</div>
				<h2>Search</h2>
				<div className='explore-page_search-bar'>
					<div className='search'>
						<TextField
							id='outlined-basic'
							onChange={inputHandler}
							variant='outlined'
							fullWidth
							label='Search Name of Community'
						/>
					</div>
				</div>
				<div className='viewToggle'>
					<span>View</span>
					<button>Grid</button>
					<button>List</button>
				</div>
				<CommunityList communitiesList={communitiesData} />
			</div>
		</div>
	);
};

export default Explore;
