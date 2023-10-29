import React, { useState } from 'react';
import Post from './Post';
import '../styles/Forum.css'

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [newComment, setNewComment] = useState('');

  const addPost = () => {
    const post = {
      title: newPost,
      content: newComment,
      comments: [],
    };
    setPosts([...posts, post]);
    setNewPost('');
    setNewComment('');
  };

  const addCommentToPost = (postIndex, comment) => {
    const updatedPosts = [...posts];
    updatedPosts[postIndex].comments.push(comment);
    setPosts(updatedPosts);
  };

  return (
    <div className="forum">
  
      <h1>Forum</h1>
      <div className="post-form">
        <input
          type="text"
          placeholder="Post Title"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        />
        <div className="post-form content">
        <textarea
          placeholder="Post Content"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        </div>
        <button onClick={addPost}>Add Post</button>
      </div>

      <div className="posts">
        {posts.map((post, index) => (
          <Post
            key={index}
            post={post}
            onAddComment={(comment) => addCommentToPost(index, comment)}
          />
        ))}
      </div>
    </div>
  );
};

export default Forum;