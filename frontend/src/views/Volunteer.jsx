import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "../styles/Volunteer.css";
import SkillSwapList from "../components/SkillSwapList";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import moment from "moment";

// Imports for MaterialUi Modal
import {
	Backdrop,
	Box,
	Modal,
	Fade,
	Button,
	Typography,
	Stack,
	InputLabel,
	Select,
	MenuItem,
	Input,
} from "@mui/material";

function Volunteer() {
	const [activeContentIndex, setActiveContentIndex] = useState(0);
	const [volunteerData, setVolunteerData] = useState([]);
	const { user, isAuthenticated, isLoading } = useAuth0();

	// State for Create New Form Modal
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	useEffect(() => {
		axios.get(`/volunteer`).then((res) => {
			setVolunteerData(res.data);
		});
	}, [activeContentIndex]);

	// handling submit by doing a put request of the data into the database
	const handleSubmit = (e) => {
		e.preventDefault();
		const data = e.target.elements;
		axios
			.post("/volunteer/new", {
				params: {
					name: data.name.value,
					description: data.description.value,
					status: "Open",
					location: data.location.value,
					cause: data.cause.value,
					creation_date: moment().format("YYYY-MM-DD"),
					start_date: data.start_date.value,
					end_date: data.end_date.value,
					volunteers_needed: data.volunteers_needed.value,
				},
			})
			.then(() => {
				setOpen(false);
				window.location.reload(true);
			});
	};

	// Style for Modal
	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: 500,
		height: 500,
		bgcolor: "background.paper",
		border: "2px solid #000",
		boxShadow: 24,
		p: 4,
	};

	if (isLoading) {
		return <div>Loading ...</div>;
	}

	return (
		isAuthenticated && (
			<div>
				<Navbar />
				<div className='volunteer-add-new_container'>
					<button className='volunteer-add-new__button' onClick={handleOpen}>
						Add New Position
					</button>
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
									Create New Volunteer Position
								</Typography>
								<Typography id='transition-modal-description' sx={{ mt: 2 }}>
									Please fill out the below details to create your position:
								</Typography>
								<form onSubmit={handleSubmit}>
									<Stack>
										<Input name='name' placeholder='Volunteer Position Name' />
										<Input name='description' placeholder='Description' />
										<InputLabel>Location</InputLabel>
										<Select name='location' defaultValue=''>
											<MenuItem value='Toronto'>Toronto</MenuItem>
											<MenuItem value='Brampton'> Brampton</MenuItem>
											<MenuItem value='Mississauga'> Mississauga</MenuItem>
											<MenuItem value='Vaughan'> Vaughan</MenuItem>
											<MenuItem value='Richmond Hill'> Richmond Hill</MenuItem>
											<MenuItem value='Scarborough'> Scarborough</MenuItem>
											<MenuItem value='North York'> North York</MenuItem>
										</Select>
										<InputLabel>Cause</InputLabel>
										<Select name='cause' defaultValue=''>
											<MenuItem value='1'>Political</MenuItem>
											<MenuItem value='2'>Environmental</MenuItem>
											<MenuItem value='3'>Social</MenuItem>
										</Select>
										<InputLabel>Start Date</InputLabel>
										<input type='date' name='start_date' />
										<InputLabel>End Date</InputLabel>
										<input type='date' name='end_date' />
										<Input
											name='volunteers_needed'
											placeholder='# of Vulunteers'
										/>
									</Stack>
									<Button type='submit'>Submit</Button>
								</form>
							</Box>
						</Fade>
					</Modal>
				</div>
				<div className='tabs'>
					<menu>
						<button
							className={activeContentIndex === 0 ? "active" : ""}
							onClick={() => setActiveContentIndex(0)}
						>
							All
						</button>
						<button
							className={activeContentIndex === 1 ? "active" : ""}
							onClick={() => setActiveContentIndex(1)}
						>
							Open
						</button>
						<button
							className={activeContentIndex === 2 ? "active" : ""}
							onClick={() => setActiveContentIndex(2)}
						>
							In Progress
						</button>
						<button
							className={activeContentIndex === 3 ? "active" : ""}
							onClick={() => setActiveContentIndex(3)}
						>
							Completed
						</button>
					</menu>
					<div className='tab-content'>
						{/* <ul>{}</ul> */}
						{activeContentIndex === 0 && (
							<SkillSwapList volunteerData={volunteerData} user={user.email} />
						)}
						{activeContentIndex === 1 && (
							<SkillSwapList
								volunteerData={volunteerData.filter(
									(obj) => obj.status === "Open"
								)}
								user={user.email}
							/>
						)}
						{activeContentIndex === 2 && (
							<SkillSwapList
								volunteerData={volunteerData.filter(
									(obj) => obj.status === "In Progress"
								)}
								user={user.email}
							/>
						)}
						{activeContentIndex === 3 && (
							<SkillSwapList
								volunteerData={volunteerData.filter(
									(obj) => obj.status === "Completed"
								)}
								user={user.email}
							/>
						)}
					</div>
				</div>
			</div>
		)
	);
}

export default Volunteer;
