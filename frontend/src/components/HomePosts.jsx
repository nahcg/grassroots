import React, { useState, useEffect } from "react";
import Comment from "./Comment";

const HomePosts = ({ posts, allPosts }) => {
  const [comments, setComments] = useState({}); // Initialize comments as an object
  console.log("posts in HomePosts component:", posts);

  useEffect(() => {
    const fetchCommentsForPosts = async () => {
      try {
        const commentsData = {};
        await Promise.all(
          posts.map(async (post) => {
            const response = await fetch(`http://localhost:8080/posts/comments/${post.post_id}`);
            const data = await response.json();
            console.log(`Comments for post ${post.post_id}:`, data); // Log the comments data
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

  console.log("comments", comments);




  return (
    <div className="posts-container">
      <h2>Your Posts: </h2>
      {posts.map((post, index) => (
        <div key={index} className="post-item">
          <h3>{post.title}</h3>
          <p>Date: {new Date(post.timestamp).toLocaleString()}</p>
          <p>Author: {post.user_id}</p>
          <p>{post.context}</p>
          <div className="comments">
            {comments[post.post_id] &&
              comments[post.post_id].map((comment, commentIndex) => (
                <Comment key={commentIndex} comment={comment} />
              ))}
          </div>
        </div>
      ))}
      <div className="all-posts-box">
        <h2>All Posts:</h2>
        {allPosts.map((post, index) => (
          <div key={index} className="post-item">
            <h3>{post.title}</h3>
            <p>Date: {new Date(post.timestamp).toLocaleString()}</p>
            <p>Author: {post.user_id}</p>
            <p>{post.context}</p>
            <div className="comments">
            {comments[post.post_id] &&
              comments[post.post_id].map((comment, commentIndex) => (
                <Comment key={commentIndex} comment={comment} />
              ))}
          </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePosts;