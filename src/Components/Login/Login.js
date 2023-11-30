import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const bodyData = {
    email: email,
    password: password,
  };
  const headers = {
    'Content-type': 'application/json',
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://0sqoqw260g.execute-api.us-east-1.amazonaws.com/dev/login', bodyData, headers);
      console.log(response);
      setErrorMessage('Login Successful');
      navigate('/add-task');
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage(error.message || 'An error occurred');
    }
  };

  return (
    <div className="container mt-5">
      <div className="col-md-6 offset-md-3">
        <h2 className="mb-4">Login Here</h2>
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Password:</label>
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {errorMessage && <p className="text-danger">{errorMessage}</p>}
        <button className="btn btn-primary" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
