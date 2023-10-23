import React from 'react';
import { Link } from 'react-router-dom';

const CommunityButton = ({ buttons }) => {
  return (
    <div>
      {buttons.map((button, index) => (
        <Link key={index} to={button.link}>
          <button className="button">{button.text}</button>
        </Link>
      ))}
    </div>
  );
};

export default CommunityButton;