import React, { useState, useEffect } from "react";
import Comment from "./Comment";

const HomePosts = ({ posts, allPosts }) => {
  const [comments, setComments] = useState({});
  const [expandedPosts, setExpandedPosts] = useState([]); // Track expanded post IDs

  const updateCommentData = (post_id, updatedComments) => {
    setComments((prevComments) => ({
      ...prevComments,
      [post_id]: updatedComments,
    }));
  };

  useEffect(() => {
    const fetchCommentsForPosts = async () => {
      try {
        const commentsData = {};
        await Promise.all(
          posts.map(async (post) => {
            const response = await fetch(`http://localhost:8080/posts/comments/${post.post_id}`);
            const data = await response.json();
            commentsData[post.post_id] = data;
          })
        );
        setComments(commentsData);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchCommentsForPosts();
  }, [posts]);

  console.log("comments from HomePost", comments)

  const handlePostClick = (postId) => {
    if (expandedPosts.includes(postId)) {
      setExpandedPosts(expandedPosts.filter((id) => id !== postId));
    } else {
      setExpandedPosts([...expandedPosts, postId]);
    }
  };

  console.log("posts", posts)

  return (
    <div className="posts-container">
      <h2>Your Posts: </h2>
      {posts.map((post, index) => (
        <div key={index} className="post-item" onClick={() => handlePostClick(post.post_id)}>
          <h3>{post.title}</h3>
          {expandedPosts.includes(post.post_id) && (
            <div>
              <p>Date: {new Date(post.timestamp).toLocaleString()}</p>
              <p>Author: {post.user_id}</p>
              <p>{post.context}</p>
              <div className="comments">
            {comments[post.post_id] &&
              comments[post.post_id].map((comment, commentIndex) => (
                <Comment
                  key={commentIndex}
                  comment={comment}
                  updateCommentData={(updatedComments) => updateCommentData(post.post_id, updatedComments)}
                />
              ))}
          </div>
            </div>
          )}
        </div>
      ))}
      <div className="all-posts-box">
        <h2>All Posts:</h2>
        {allPosts.map((post, index) => (
          <div key={index} className="post-item" onClick={() => handlePostClick(post.post_id)}>
            <h3>{post.title}</h3>
            <p>Date: {new Date(post.timestamp).toLocaleString()}</p>
                <p>Author: {post.user_id}</p>
                <p>{post.context}</p>
            {expandedPosts.includes(post.post_id) && (
              <div>
                <div className="comments">
            {comments[post.post_id] &&
              comments[post.post_id].map((comment, commentIndex) => (
                <Comment
                  key={commentIndex}
                  comment={comment}
                  updateCommentData={(updatedComments) => updateCommentData(post.post_id, updatedComments)}
                />
              ))}
          </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePosts;
