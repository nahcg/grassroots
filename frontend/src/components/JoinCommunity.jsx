import React from 'react';
import { Link } from 'react-router-dom';

const JoinCommunity = () => {
  return (
    <div>
      <h2>Join Communities</h2>
      <Link to="/login">
        <button>Login</button>
      </Link>
      <Link to="/register">
        <button>Register</button>
      </Link>
    </div>
  );
};

export default JoinCommunity;