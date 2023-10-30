import React, { useState, useEffect } from 'react';
import Post from './Post';
import { useParams } from 'react-router-dom';
import '../styles/Forum.css'

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [newComment, setNewComment] = useState('');

  const { CommunityId } = useParams();

  useEffect(() => {
    // Fetch posts from the backend when the component mounts
    fetch(`http://localhost:8080/posts/${CommunityId}`) 
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error('Error fetching posts:', error));
  }, [CommunityId]); 

  console.log("posts", posts)
  
  
  
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
    post_id={post.post_id} 
    onAddComment={(comment) => addCommentToPost(index, comment)}
  /> 
))}
      </div>
    </div>
  );
};

export default Forum;