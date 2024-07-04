import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Form.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const requestData = { username, password };

      const response = await axios.post('http://localhost:8080/login', requestData);
      const token = response.data.token;
      localStorage.setItem('token', token); 


      setResponseMessage(response.data.message || 'Login successful');
      setIsSuccess(true);

      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);

    } catch (error) {
      console.error('Login error', error.response);
      setResponseMessage(error.response?.data?.message || 'Error logging in. Please try again.');
      setIsSuccess(false);
    }
  };

  return (
    <div className='form-container'>
      <div className='form-content'>
        <form onSubmit={handleSubmit}>
          <h3>Sign In</h3>
          <div className='form-group mb-2'>
            <label htmlFor="userName">Username</label>
            <input 
              type="text" 
              placeholder="Enter Username" 
              className='form-control' 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required 
            />
          </div>
          <div className='form-group mb-2'>
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              placeholder="Enter Password" 
              className="form-control" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary">Sign In</button>
          <div className='register-link'>
            <p>Not yet registered? <Link to="/signup">Click here to sign up</Link></p>
          </div>
        </form>
        {responseMessage && (
          <div className={`response-message ${isSuccess ? 'success' : 'error'}`}>
            {responseMessage}
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
