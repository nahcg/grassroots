import React, { useState, useEffect } from 'react';
import Post from './Post';
import Navbar from '../components/Navbar';
import { useParams, Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import '../styles/Forum.css';
import '../App.css'


const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [newContent, setNewContent] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [filterTitle, setFilterTitle] = useState("");

  const { community_id } = useParams();
  const { user, isLoading } = useAuth0();

  const routes = [
    { path: `/community/communities/${community_id}`, label: 'About' },
    { path: `/posts/${community_id}`, label: 'Forum' },
    { path: `/events/${community_id}`, label: 'Events' },
  ];

  useEffect(() => {
    if (!isLoading && user) {
    // Fetch posts from the backend when the component mounts
    fetch(`http://localhost:8080/posts/${community_id}`)
      .then((response) => response.json())
      .then((data) => {
        // Sort posts by pinned status (pinned posts first) and then by date
        const sortedPosts = data.sort((a, b) => {
          if (b.is_pinned && !a.is_pinned) return 1;
          if (!b.is_pinned && a.is_pinned) return -1;
          return new Date(b.timestamp) - new Date(a.timestamp);
        });
        setPosts(sortedPosts);
        setFilteredPosts(sortedPosts);
      })
      .catch((error) => console.error("Error fetching posts:", error));
  }
}, [isLoading, user, community_id]);




  useEffect(() => {
    // Filter posts by title when filterTitle changes
    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(filterTitle.toLowerCase())
    );
    setFilteredPosts(filtered);
  }, [filterTitle, posts]);

  const addPost = () => {
    // Prepare the post data with an empty comments array
    const postData = {
      user_id: user.name,
      community_id: community_id,
      title: newPost,
      context: newContent,
      timestamp: new Date().toISOString(),
      is_pinned: 'FALSE',
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
		<div className='forum_page'>
			<Navbar />
			<div className="forum_routes">
  {routes.map((route, index) => (
    <Link key={index} to={route.path} className="route-link">
      {route.label}
    </Link>
  ))}
</div>
			<div className='forum_forum'>
				<h1>Forum</h1>
					<input
						type='text'
						placeholder='Post Title'
						value={newPost}
						onChange={(e) => setNewPost(e.target.value)}
					/>
					<div className='forum_post-form content'>
						<textarea
							placeholder='Post Content'
							value={newContent}
							onChange={(e) => setNewContent(e.target.value)}
						/>
					</div>
					<button onClick={addPost}>Add Post</button>
				</div>
        <div className='forum_filter'>
<input
          type='text'
          placeholder='Filter by Title'
          value={filterTitle}
          onChange={(e) => setFilterTitle(e.target.value)}
        />
        </div>
        <div className="forum_posts">
          {filteredPosts.map((post, index) => (
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
  );
};

export default Forum;
