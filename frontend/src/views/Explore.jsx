import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
// import { useForm } from "react-hook-form";

import "../styles/Explore.css";
import CommunityGrid from "../components/CommunityGrid";
import CommunityList from "../components/CommunityList";

// Imports for MaterialUi Modal
import {
	TextField,
	Backdrop,
	Box,
	Modal,
	Fade,
	Button,
	Typography,
	Stack,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Input,
	FormHelperText,
	Radio,
} from "@mui/material";
import SelectInput from "@mui/material/Select/SelectInput";

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

// Style for Modal
const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

const Explore = () => {
	const { user, isAuthenticated, isLoading } = useAuth0();
	const [communitiesData, setCommunitiesData] = useState([]);
	const [causeFilterSelection, setCauseFilterSelection] = useState(0);
	const [viewState, setViewState] = useState("grid");
	// State for Create New Form Modal
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	//React Hook Form State
	// const { register, handleSubmit } = useForm();

	// const [formData, setFormData] = useState({
	// 	name: "",
	// 	email: "",
	// });

	// const handleChange = (e) => {
	// 	const { name, value } = e.target;
	// 	setFormData({
	// 		...formData,
	// 		[name]: value,
	// 	});
	// };

	const handleSubmit = (e) => {
		e.preventDefault();
		const { name, description, location } = e.target.elements;
		console.log("Form submitted:", name.value);
	};

	useEffect(() => {
		const fetchData = () => {
			axios
				.get(`http://localhost:8080/communities/${causeFilterSelection}`)
				.then((res) => {
					// console.log(res.data.communities);
					setCommunitiesData(res.data.communities);
				});
		};
		fetchData(causeFilterSelection);
	}, [causeFilterSelection]);

	const fetchDataSearchFilter = (inputText) => {
		axios
			.get(`http://localhost:8080/communities/`, {
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
		fetchDataSearchFilter(lowerCase);
	};

	return (
		<div>
			<div className='explore-page'>
				<div className='explore-page__head'>
					<h1>Find a Community</h1>
					<button onClick={handleOpen}>Create New</button>
					<Modal
						aria-labelledby='transition-modal-title'
						aria-describedby='transition-modal-description'
						open={open}
						onClose={handleClose}
						closeAfterTransition
						slots={{ backdrop: Backdrop }}
						slotProps={{
							backdrop: {
								timeout: 500,
							},
						}}
					>
						<Fade in={open}>
							<Box sx={style}>
								<Typography
									id='transition-modal-title'
									variant='h6'
									component='h2'
								>
									Create New Community
								</Typography>
								<Typography id='transition-modal-description' sx={{ mt: 2 }}>
									Please fill out the below details to create your community:
								</Typography>
								<form onSubmit={handleSubmit}>
									<Stack>
										<Input name='name' placeholder='Community Name' />
										<Input name='description' placeholder='Description' />
										<InputLabel>Location</InputLabel>
										<Select name='location'>
											<MenuItem value='Toronto'>Toronto</MenuItem>
											<MenuItem value='Brampton'> Brampton</MenuItem>
											<MenuItem value='Mississauga'> Mississauga</MenuItem>
											<MenuItem value='Vaughan'> Vaughan</MenuItem>
											<MenuItem value='Richmond Hill'> Richmond Hill</MenuItem>
											<MenuItem value='Scarborough'> Scarborough</MenuItem>
											<MenuItem value='North York'> North York</MenuItem>
										</Select>
										<InputLabel>Cause</InputLabel>
										<Select name='cause'>
											<MenuItem value='Political'>Political</MenuItem>
											<MenuItem value='Environmental'>Environmental</MenuItem>
											<MenuItem value='Social'>Social</MenuItem>
										</Select>
										<Input
											type='text'
											placeholder='Community Picture URL'
											name='picture_url'
										/>
									</Stack>
									<Button type='submit'>Submit</Button>
								</form>
							</Box>
						</Fade>
					</Modal>
				</div>
				<div className='explore-page__options-section'>
					<h2>Cause</h2>
					<div className='explore-page_causes'>
						<div>
							<button onClick={() => setCauseFilterSelection(0)}>All</button>
							<button onClick={() => setCauseFilterSelection(1)}>
								Politics
							</button>
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
						<button onClick={() => setViewState("grid")}>Grid</button>
						<button onClick={() => setViewState("list")}>List</button>
					</div>
				</div>
				{viewState === "grid" && (
					<CommunityGrid communitiesData={communitiesData} />
				)}
				{viewState === "list" && (
					<CommunityList communitiesData={communitiesData} />
				)}
			</div>
		</div>
	);
};

export default Explore;
