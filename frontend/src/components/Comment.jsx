import React from "react";
import "../styles/Comment.css";

const Comment = ({ comment }) => {
	// console.log("comment.comment", comment.comment)
	return (
		<div className='comment'>
			<p>{comment.comment}</p>
		</div>
	);
};

export default Comment;
