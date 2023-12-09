import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    userName: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignup = async () => {
    try {
      const response = await axios.post(
        'https://xzvbd8tg1i.execute-api.us-east-1.amazonaws.com/dev/signup',
        formData
      );

      console.log(response);
      setErrorMessage(response?.data?.message);
      navigate('/login');
    } catch (error) {
      // Handle Signup error
      console.error('Error:', error.response.data.error);
      setErrorMessage(error.response.data.error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Signup here</h2>
      <div className="mb-3">
        <label className="form-label">Email:</label>
        <input
          type="email"
          className="form-control"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">User Name:</label>
        <input
          type="text"
          className="form-control"
          name="userName"
          value={formData.userName}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Password:</label>
        <input
          type="password"
          className="form-control"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <button className="btn btn-primary" onClick={handleSignup}>
        Signup
      </button>
    </div>
  );
};

export default Signup;
