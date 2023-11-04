import React from "react";
import SkillSwapListItem from "./SkillSwapListItem";
import "../styles/SkillSwapList.css";

const SkillSwapList = ({ skillSwapData }) => {
	return (
		<div className='skillSwap-list'>
			{skillSwapData.map((skillSwapPosting) => {
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
