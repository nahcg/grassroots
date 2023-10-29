import React from 'react';

const Comment = ({ comment }) => {
  return (
    <div className="comment">
      <p>{comment.text}</p>
    </div>
  );
};

export default Comment;