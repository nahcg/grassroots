import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

const Landing = () => {
  const { isAuthenticated } = useAuth0(); // Check if the user is authenticated

  return (
    <div>
      <h1>Welcome to Grassroots App</h1>

      {/* Display "Login" and "Register" buttons if the user is not authenticated */}
      {!isAuthenticated && (
        <div>
          <Link to="/login">
            <button>Login</button>
          </Link>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
      )}

      {/* "Join Communities" button that redirects to login or register */}
      {!isAuthenticated ? (
        <Link to="/login">
          <button>Join Communities</button>
        </Link>
      ) : (
        <Link to="/register">
          <button>Join Communities</button>
        </Link>
      )}
    </div>
  );
};

export default Landing;