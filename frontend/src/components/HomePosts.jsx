import React, { useState, useEffect } from "react";
import Comment from "./Comment";

const HomePosts = ({ posts, allPosts }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchCommentsForPosts = async () => {
      try {
        const post_ids = [...posts, ...allPosts].map((post) => post.post_id);
        const commentsData = {};

        await Promise.all(
          post_ids.map(async (post_id) => {
            const response = await fetch(`http://localhost:8080/home/comments/${post_id}`);
            const data = await response.json();
            commentsData[post_id] = data;
          })
        );

        setComments(commentsData);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchCommentsForPosts();
  }, [posts, allPosts]);

  console.log("posts", posts);
  console.log("allPosts", allPosts);
  console.log("comments from HomePost", comments);

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
              comments[post.post_id].map((comment, index) => (
                <Comment key={index} comment={comment} />
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
                comments[post.post_id].map((comment, index) => (
                  <Comment key={index} comment={comment} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePosts;
