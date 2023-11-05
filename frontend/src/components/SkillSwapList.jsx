import React from "react";
import SkillSwapListItem from "./SkillSwapListItem";
import "../styles/SkillSwapList.css";

const SkillSwapList = ({ volunteerData }) => {
	return (
		<div className='skillSwap-list'>
			{volunteerData.map((volunteerPosition) => {
				return (
					<SkillSwapListItem
						key={volunteerPosition.volunteer_board_id}
						name={volunteerPosition.name}
						description={volunteerPosition.description}
						status={volunteerPosition.status}
						location={volunteerPosition.location}
						cause={volunteerPosition.cause}
						creation_date={volunteerPosition.creation_date}
						start_date={volunteerPosition.start_date}
						end_date={volunteerPosition.end_date}
						volunteersNeeded={volunteerPosition.volunteers_needed}
					/>
				);
			})}
		</div>
	);
};

export default SkillSwapList;
