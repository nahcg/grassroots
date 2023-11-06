import { useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/Volunteer.css";
import SkillSwapList from "../components/SkillSwapList";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

// TEST DATA
// const skillSwapData = [
// 	{
// 		name: "Test Volunteer Position",
// 		description:
// 			"Need volunteers to design and build the frontend of our website.",
// 		status: "Open",
// 		skills: [1, 4],
// 		cause: 1,
// 		volunteersNeeded: 40,
// 		volunteersSignedUp: 23,
// 	},
// 	{
// 		name: "Test Volunteer Position",
// 		description:
// 			"Need volunteers to design and build the frontend of our website.",
// 		status: "Open",
// 		skills: [1, 4],
// 		cause: 1,
// 		volunteersNeeded: 40,
// 		volunteersSignedUp: 23,
// 	},
// 	{
// 		name: "Test Volunteer Position",
// 		description:
// 			"Need volunteers to design and build the frontend of our website.",
// 		status: "Open",
// 		skills: [1, 4],
// 		cause: 1,
// 		volunteersNeeded: 40,
// 		volunteersSignedUp: 23,
// 	},
// ];

function Volunteer() {
	const [activeContentIndex, setActiveContentIndex] = useState(0);
	const [volunteerData, setVolunteerData] = useState([]);
	const { user, isAuthenticated, isLoading } = useAuth0();
	const userEmail = user.email;

	useState(() => {
		axios.get(`http://localhost:8080/volunteer`).then((res) => {
			//console.log(res.data);
			setVolunteerData(res.data);
		});
		// setVolunteerData(unFilteredData);
		// console.log(unFilteredData);
		// switch (activeContentIndex) {
		// 	case 0:
		// 		console.log("CASE 0");
		// 		setVolunteerData(unFilteredData);
		// 		break;
		// 	case 1:
		// 		console.log("CASE 1");
		// 		setVolunteerData(unFilteredData.filter((obj) => obj.status === "Open"));
		// 		break;
		// 	case 2:
		// 		console.log("CASE 2");
		// 		break;
		// 	case 3:
		// 		console.log("CASE 3");
		// 		break;
		// 	default:
		// 		break;
		// }
	}, [activeContentIndex]);

	return (
		<div>
			<Navbar />
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
						<SkillSwapList volunteerData={volunteerData} user={userEmail} />
					)}
					{activeContentIndex === 1 && (
						<SkillSwapList
							volunteerData={volunteerData.filter(
								(obj) => obj.status === "Open"
							)}
							user={userEmail}
						/>
					)}
					{activeContentIndex === 2 && (
						<SkillSwapList
							volunteerData={volunteerData.filter(
								(obj) => obj.status === "In Progress"
							)}
							user={userEmail}
						/>
					)}
					{activeContentIndex === 3 && (
						<SkillSwapList
							volunteerData={volunteerData.filter(
								(obj) => obj.status === "Completed"
							)}
							user={userEmail}
						/>
					)}
				</div>
			</div>
		</div>
	);
}

export default Volunteer;
