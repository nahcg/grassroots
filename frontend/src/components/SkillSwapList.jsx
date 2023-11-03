import React from "react";
import SkillSwapListItem from "./SkillSwapListItem";
import "../styles/SkillSwapList.css";

const SkillSwapList = ({ skillSwapData }) => {
	// TEST DATA
	const skillSwapData2 = [
		{
			name: "Test Volunteer Position",
			description:
				"Need volunteers to design and build the frontend of our website.",
			status: "Open",
			skills: [1, 4],
			cause: 1,
			volunteersNeeded: 40,
			volunteersSignedUp: 23,
		},
		{
			name: "Test Volunteer Position",
			description:
				"Need volunteers to design and build the frontend of our website.",
			status: "Open",
			skills: [1, 4],
			cause: 1,
			volunteersNeeded: 40,
			volunteersSignedUp: 23,
		},
		{
			name: "Test Volunteer Position",
			description:
				"Need volunteers to design and build the frontend of our website.",
			status: "Open",
			skills: [1, 4],
			cause: 1,
			volunteersNeeded: 40,
			volunteersSignedUp: 23,
		},
	];
	return (
		<div className='skillSwap-list'>
			{skillSwapData2.map((skillSwapPosting) => {
				return (
					<SkillSwapListItem
						key={skillSwapPosting.id}
						name={skillSwapPosting.name}
						description={skillSwapPosting.description}
						status={skillSwapPosting.status}
						skills={skillSwapPosting.skills}
						cause={skillSwapPosting.cause}
						volunteersNeeded={skillSwapPosting.volunteersNeeded}
						volunteersSignedUp={skillSwapPosting.volunteersSignedUp}
					/>
				);
			})}
		</div>
	);
};

export default SkillSwapList;
