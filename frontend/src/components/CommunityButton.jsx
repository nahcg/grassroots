import React from 'react';
import { Link } from 'react-router-dom';


//fake routes
const routes = [
  { path: '/community/housing', label: 'Housing' },
  { path: '/community/environment', label: 'Environment' },
  { path: '/community/education', label: 'Education' },
];


const CommunityButton = () => {

  return (
      <div>
        {routes.map((route, index) => (
          <Link key={index} to={route.path}>
            <button className="button">{route.label}</button>
          </Link>
        ))}
      </div>
  );
};


export default CommunityButton;