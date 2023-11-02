import React, { useState, useEffect} from 'react';
import Comment from './Comment';
import '../styles/Post.css'; 
import { Link } from 'react-router-dom';

const Post = ({ post, post_id, user_id }) => {
  const [isActive, setIsActive] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);

  const currentTimestamp = new Date();



  useEffect(() => {
    // Fetch comments for the specific post from the backend when post_id and isActive change
    if (post_id && isActive) {
      fetch(`http://localhost:8080/posts/comments/${post_id}`)
        .then((response) => response.json())
        .then((data) => setComments(data))
        .catch((error) => console.error('Error fetching comments:', error));
    }
  }, [post_id, isActive]);


  const handlePostClick = () => {
    setIsActive(!isActive); // Toggle active state on post click
  };

  console.log("stuff", post_id, user_id, post)


  const handleCommentSubmit = () => {
    // Prepare the comment data
    const newCommentData = {
      post_id: post_id,
      comment: newComment,
      timestamp: currentTimestamp.toISOString(),
    };
    console.log("commentData", newCommentData);
  
    // Send a POST request to add the new comment
    fetch(`http://localhost:8080/posts/comments/${post_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCommentData),
    })
      .then((response) => response.json())
      .then((responseData) => {
        // Update the comments state
        setComments((prevComments) => {
          return [...prevComments, responseData];
        });
  
        setNewComment('');
  
        // Fetch updated comments after adding a new comment
        fetch(`http://localhost:8080/posts/comments/${post_id}`)
          .then((response) => response.json())
          .then((data) => {
            // Update the comments state with the updated comments
            setComments(data);
          })
          .catch((error) => console.error('Error fetching comments after submission:', error));
      })
      .catch((error) => console.error('Error adding comment:', error));
  };


  
  return (
    <div className={`post ${isActive ? 'active' : ''}`}>
      <h2 onClick={handlePostClick}>{post.title}</h2>
      <div className={`post-content ${isActive ? 'active' : ''}`}>
        <p>{post.context}</p>
        <Link to={`/profile/${user_id}`} key={user_id}>
        <p>@{user_id}</p>
        </Link>
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