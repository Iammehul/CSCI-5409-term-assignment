import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  return (
    <div className="text-center mt-5">
      <h2>Welcome to Todo App</h2>
      <p>Your go-to application for managing tasks efficiently!</p>
      <div className="mt-3">
        <button className="btn btn-primary mx-2" onClick={handleLoginClick}>
          Login
        </button>
        <button className="btn btn-success mx-2" onClick={handleSignupClick}>
          Signup
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
