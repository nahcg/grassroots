import React, { useState, useEffect } from 'react';
import Post from './Post';
import { useParams, Link } from 'react-router-dom';
import '../styles/Forum.css';

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [newContent, setNewContent] = useState('');

  const { community_id } = useParams();
  const currentTimestamp = new Date();


  const routes = [
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
      community_id: community_id,
      title: newPost,
      context: newContent,
      timestamp: currentTimestamp.toISOString(),
    };

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
        // Update the posts state using the functional form of setPosts
        setPosts((prevPosts) => [...prevPosts, postData]);

        // Clear the input fields
        setNewPost('');
        setNewContent('');
      })
      .catch((error) => console.error('Error adding post:', error));
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
            onAddComment={(comment) => addCommentToPost(index, comment)}
          />
        ))}
      </div>
    </div>
    </div>
  );
};

export default Forum;
