import React from "react";
import CommunityButton from '../components/CommunityButton'; 

const Community = () => {
  const buttons = [
    { text: 'Housing', link: '/housing' },
    { text: 'Education', link: '/education' },
    // Add more buttons as needed
  ];

  return (
    <div>
      <h1>Communities</h1>
      <CommunityButton buttons={buttons} />
    </div>
  );
};

export default Community;
