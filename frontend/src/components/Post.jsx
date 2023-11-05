import React, { useState, useEffect } from "react";
import Comment from "./Comment";
import "../styles/Post.css";
import { Link } from 'react-router-dom';


const Post = ({ post, post_id, user_id }) => {
  const [isActive, setIsActive] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);
  const [isPinned, setIsPinned] = useState(post.is_pinned);
  

  useEffect(() => {
    // Fetch comments for the specific post from the backend when post_id and isActive change
    if (post_id && isActive) {
      fetch(`http://localhost:8080/posts/comments/${post_id}`)
        .then((response) => response.json())
        .then((data) => setComments(data))
        .catch((error) => console.error("Error fetching comments:", error));
    }
  }, [post_id, isActive]);

  console.log("comments",comments)

  const currentTimestamp = new Date(post.timestamp);
  const formattedTimestamp = `${currentTimestamp.toLocaleString('default', { month: 'long' })} ${currentTimestamp.getDate()}, ${currentTimestamp.getFullYear()}`;


  const handlePostClick = () => {
    setIsActive(!isActive); // Toggle active state on post click
  };



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


  const togglePin = () => {
    fetch(`http://localhost:8080/posts/post/${post_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isPinned: !isPinned }),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsPinned(!isPinned);
      })
      .catch((error) => console.error('Error toggling pin:', error));
  };


  
  return (
    <div className={`post ${isActive ? 'active' : ''}`}>
      <div className="post-content-container">
      <div onClick={togglePin} className={`pin ${isPinned ? 'pinned' : ''}`}></div>
      </div>
    <h2 onClick={handlePostClick}>{post.title}</h2>
    <div className={`post-content ${isActive ? 'active' : ''}`}>
      <p>{post.context}</p>
      <p>Authored by: <Link to={`/profile/${user_id}`} key={user_id}>{user_id}</Link></p>
        <p>{formattedTimestamp}</p>
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
