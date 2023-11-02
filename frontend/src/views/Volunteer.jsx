import { useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/Volunteer.css";

function Volunteer() {
	const [activeContentIndex, setActiveContentIndex] = useState(0);

	return (
		<div>
			<Navbar />
			<div id='tabs'>
				<menu>
					<button
						className={activeContentIndex === 0 ? "active" : ""}
						onClick={() => setActiveContentIndex(0)}
					>
						Skill Swap
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
						In Consideration
					</button>
					<button
						className={activeContentIndex === 3 ? "active" : ""}
						onClick={() => setActiveContentIndex(3)}
					>
						Completed
					</button>
				</menu>
				<div id='tab-content'>
					<ul>{}</ul>
				</div>
			</div>
		</div>
	);
}

export default Volunteer;
