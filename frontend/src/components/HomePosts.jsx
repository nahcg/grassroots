import React from 'react';

const HomePosts = ({ posts }) => {
  return (
    <div className="posts-container">
      <h2>Posts</h2>
      {posts.map((post, index) => (
        <div key={index} className="post-item">
          <h3>{post.title}</h3>
          <p>Date: {new Date(post.timestamp).toLocaleString()}</p>
          <p>Author: {post.user_id}</p>
          <p>{post.context}</p>
        </div>
      ))}
    </div>
  );
};

export default HomePosts;