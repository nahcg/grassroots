import React, { useState } from 'react';
import Comment from './Comment';
import '../styles/Post.css'; // Import your CSS file

const Post = ({ post, onAddComment }) => {
  const [isActive, setIsActive] = useState(false);
  const [newComment, setNewComment] = useState('');

  const handlePostClick = () => {
    setIsActive(!isActive); // Toggle active state on post click
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
    <div className={`post ${isActive ? 'active' : ''}`}>
      <h2 onClick={handlePostClick}>{post.title}</h2>
      <div className={`post-content ${isActive ? 'active' : ''}`}>
        <p>{post.content}</p>
      </div>
      <div className="comments">
        {post.comments.map((comment, index) => (
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

export default Post;