import React from 'react';

const Comment = ({ comment }) => {
  return (
    <div className="comment">
      <p>{comment.comment}</p>
    </div>
  );
};

export default Comment;