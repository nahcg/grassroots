import React from 'react';
import CommunityButton from '../components/CommunityButton'; 

const Community = ({routes}) => {
  return (
    <div>
      <h1>Communities</h1>
      <CommunityButton routes={routes} />
    </div>
  );
};

export default Community;
