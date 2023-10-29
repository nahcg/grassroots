import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/Community.css'; 

const Community = () => {
  const [community, setCommunity] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    // Fetch community by name
    fetch(`http://localhost:8080/communities/community/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setCommunity(data[0]);
      })
      .catch((error) => console.error('Error fetching community', error));
  }, [id]);

  // Log the community data when it changes
  useEffect(() => {
    if (community) {
      console.log('Community data:', community);
    }
  }, [community]);

  if (!community) {
    return <div>Loading community information...</div>;
  }

  return (
    <div className="community-container">
      <h1>{community.name}</h1>
      <img src={community.picture_url} alt={community.name} />
      <p>{community.description}</p>
      <p>Location: {community.location}</p>
    </div>
  );
};

export default Community;