import React, { useState, useEffect } from 'react';
import Post from './Post';
import { useParams, Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import '../styles/Forum.css';

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [newContent, setNewContent] = useState('');

  const { community_id } = useParams();
  const currentTimestamp = new Date();

  const { user } = useAuth0();

  const routes = [
    { path: `/community/communities/${community_id}`, label: 'About' },
    { path: `/posts/${community_id}`, label: 'Forum' },
    { path: `/events/${community_id}`, label: 'Events' },
  ];

  useEffect(() => {
    // Fetch posts from the backend when the component mounts
    fetch(`http://localhost:8080/posts/${community_id}`)
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error('Error fetching posts:', error));
  }, [community_id]);

  console.log("data", posts)

  const addPost = () => {
    // Prepare the post data with an empty comments array
    const postData = {
      user_id: user.name,
      community_id: community_id,
      title: newPost,  // Update the local state with the new post title first
      context: newContent,
      timestamp: currentTimestamp.toISOString(),
    };
  
    // Update the local state with the new post title
    setPosts((prevPosts) => [...prevPosts, postData]);
  
    // Send a POST request to add the new post
    fetch(`http://localhost:8080/posts/${community_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    })
      .then((response) => response.json())
      .then((postData) => {
        // Handle the API response if needed
        // Clear the input fields if the API call is successful
        setNewPost('');
        setNewContent('');
      })
      .catch((error) => {
        // Handle errors if the API call fails
        console.error('Error adding post:', error);
      });
  };
  
  

  const addCommentToPost = (postIndex, comment) => {
    const updatedPosts = [...posts];
    updatedPosts[postIndex].comments.push(comment);
    setPosts(updatedPosts);
  };

  return (
    <div className="routes">
          {routes.map((route, index) => (
            <Link key={index} to={route.path}>
              <button className="button">{route.label}</button>
            </Link>
          ))}
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
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
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
            user_id={post.user_id}
            onAddComment={(comment) => addCommentToPost(index, comment)}
          />
        ))}
      </div>
    </div>
    </div>
  );
};

export default Forum;
