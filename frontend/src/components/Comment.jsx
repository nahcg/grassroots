import React from "react";
import "../styles/Comment.css";

const Comment = ({ comment }) => {
	// console.log("comment.comment", comment.comment)
	return (
		<div className='comment'>
			<p>{comment.comment}</p>
      <p>By: {comment.user_id}</p>
		</div>
	);
};

export default Comment;
