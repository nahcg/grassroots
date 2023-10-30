import React, { useState, useEffect} from 'react';
import Comment from './Comment';
import '../styles/Post.css'; 

const Post = ({ post, post_id, onAddComment }) => {
  const [isActive, setIsActive] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
      // Fetch comments for the specific post from the backend when the component mounts
      fetch(`http://localhost:8080/posts/comments/${post_id}`)
        .then((response) => response.json())
        .then((data) => setComments(data))
        .catch((error) => console.error('Error fetching comments:', error));
  }, [post_id]);

console.log("comments", comments)


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
        <p>{post.context}</p>
      </div>
      <div className="comments">
        {comments.map((comment, index) => (
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