import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";
import "../styles/MemberButton.css";

const MemberButton = () => {
	const { user } = useAuth0();
	const [isMember, setIsMember] = useState(false);
	const { community_id } = useParams();

	const currentTimestamp = new Date();

	// console.log("user", user)

	useEffect(() => {
		// Fetch users array from the server
		fetch(`${process.env.REACT_APP_BASEURL}/member/${community_id}`)
			.then((response) => response.json())
			.then((members) => {
				setIsMember(members.some((member) => member.user_id === user.email));
			})
			.catch((error) => {
				console.error("Error fetching users:", error);
			});
	}, [user.email, community_id]);

	const handleMemberStatus = () => {
		const apiUrl = `${process.env.REACT_APP_BASEURL}/member/${community_id}`;

		if (isMember) {
			// If the user is already a member, remove them from the community
			fetch(apiUrl, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					user_id: user.email,
					community_id: community_id,
				}),
			})
				.then((response) => response.json())
				.then(() => {
					setIsMember(false);
				})
				.catch((error) => {
					console.error("Error removing member:", error);
				});
		} else {
			// If the user is not a member, add them to the community
			fetch(apiUrl, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					user_id: user.email,
					community_id: community_id,
					join_date: currentTimestamp.toISOString(),
					is_admin: false,
				}),
			})
				.then((response) => response.json())
				.then(() => {
					setIsMember(true);
				})
				.catch((error) => {
					console.error("Error adding member:", error);
				});
		}
	};

	return (
		<div>
			<button
				className={`member-button ${isMember ? "member" : ""}`}
				onClick={handleMemberStatus}
			>
				{isMember ? "You are a member!" : "Join Community"}
			</button>
		</div>
	);
};

export default MemberButton;
