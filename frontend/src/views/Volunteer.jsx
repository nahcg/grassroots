import { useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/Volunteer.css";
import SkillSwapList from "../components/SkillSwapList";
import axios from "axios";

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

	useState(() => {
		axios.get(`http://localhost:8080/volunteer`).then((res) => {
			setVolunteerData(res.data);
		});
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
						All Skill Swaps
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
						<SkillSwapList volunteerData={volunteerData} />
					)}
				</div>
			</div>
		</div>
	);
}

export default Volunteer;
