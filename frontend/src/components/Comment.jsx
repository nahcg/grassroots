import React from 'react';

const Comment = ({ comment }) => {

  console.log("comment from comment", comment.comment)
  return (
    <div className="comment">
      <p>{comment.comment}</p>
    </div>
  );
};

export default Comment;