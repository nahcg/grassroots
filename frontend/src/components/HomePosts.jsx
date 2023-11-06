import React, { useState, useEffect } from "react";

const HomePosts = ({ posts, allPosts }) => {
  const [comments, setComments] = useState([]);
  const [showYourPosts, setShowYourPosts] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      const postIds = [...(showYourPosts ? posts : allPosts)].map((post) => post.post_id);
      const commentPromises = postIds.map((post_id) =>
        fetch(`http://localhost:8080/home/comments/${post_id}`)
          .then((response) => response.json())
      );
      const commentsData = await Promise.all(commentPromises);
      setComments(commentsData);
    };

    fetchComments();
  }, [posts, allPosts, showYourPosts]);

  return (
    <div className="posts-container">
      <div className="toggle-buttons">
        <button onClick={() => setShowYourPosts(true)}>Your Posts</button>
        <button onClick={() => setShowYourPosts(false)}>All Posts</button>
      </div>
      {showYourPosts ? <h2>Your Posts: </h2> : <h2>All Posts: </h2>}
      {(showYourPosts ? posts : allPosts).map((post, index) => {
        const postComments = comments.find(
          (comment) => comment[0] && comment[0].post_id === post.post_id
        );

        return (
          <div key={index} className="post-item">
            <h3>{post.title}</h3>
            <p>Date: {new Date(post.timestamp).toLocaleString()}</p>
            <p>Author: {post.user_id}</p>
            <p>{post.context}</p>

            {/* Render comments for this post */}
            <h4>Comments:</h4>
            <ul>
              {postComments && postComments.length > 0 ? (
                postComments.map((comment) => (
                  <li key={comment.comment_id}>{comment.comment}</li>
                ))
              ) : (
                <li>No comments yet</li>
              )}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default HomePosts;
