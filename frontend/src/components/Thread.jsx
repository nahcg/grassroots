import React, { useState } from 'react';
import Comment from './Comment';
import '../styles/Thread.css'; // Import your CSS file

const Thread = ({ thread, onAddComment }) => {
  const [isActive, setIsActive] = useState(false);
  const [newComment, setNewComment] = useState('');

  const handleThreadClick = () => {
    setIsActive(!isActive); // Toggle active state on thread click
  };

  const handleCommentSubmit = () => {
    if (newComment.trim() === '') {
      return;
    }
    const comment = { text: newComment };
    onAddComment(comment);
    setNewComment('');
  };

  return (
    <div className={`thread ${isActive ? 'active' : ''}`}>
      <h2 onClick={handleThreadClick}>{thread.title}</h2>
      <p>{thread.content}</p>
      <div className="comments">
        {thread.comments.map((comment, index) => (
          <Comment key={index} comment={comment} />
        ))}
      </div>
      {isActive && (
        <div className="comment-form">
          <input
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button onClick={handleCommentSubmit}>Add Comment</button>
        </div>
      )}
    </div>
  );
};

export default Thread;