import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './Signup.css';

function Signup() {
  const [userId, setUserId] = useState('');
  const [username, setUserName] = useState('');
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [roleId, setRoleId] = useState('1'); 
  const [orgId, setOrgId] = useState('0'); 
  const [orgName, setOrgName] = useState('All'); 
  const [roleName, setRoleName] = useState('Admin'); 
  const [responseMessage, setResponseMessage] = useState(''); 
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate(); 


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setResponseMessage('Passwords do not match');
      setIsSuccess(false);
      return;
    }

    try {
   
      const requestData = {
        user_id: userId,
        username: username,
        emailId: emailId,
        password: password,
        role_id: roleId,
        org_id: orgId,
        org_name: orgName,
        role_name: roleName
      };

 
      const response = await axios.post('http://localhost:8080/sign-up', requestData);
      
   
      console.log('Signup successful', response.data);
      setResponseMessage(response.data.message || 'Signup successful');
      setIsSuccess(true);

     
      setUserId('');
      setUserName('');
      setEmailId('');
      setPassword('');
      setConfirmPassword('');
      setRoleId('1'); 
      setOrgId('0'); 
      setOrgName('All');
      setRoleName('Admin'); 

      
      setTimeout(() => {
        navigate('/');
      }, 2000);

    } catch (error) {
      
      console.error('Error coming from', error);
      setResponseMessage('Error signing up. Please try again.');
      setIsSuccess(false);
    }
  };

  
  const handleRoleChange = (event) => {
    const selectedRoleId = event.target.value;
    setRoleId(selectedRoleId);

    
    switch (selectedRoleId) {
      case '1':
        setRoleName('Admin');
        setOrgId('0');
        setOrgName('All');
        break;
      case '2':
        setRoleName('Organizer');
        setOrgId('');
        setOrgName('');
        break;
      case '3':
        setRoleName('User');
        setOrgId('');
        setOrgName('');
        break;
      default:
        break;
    }
  };

  return (
    <div className='signup-form-container'>
      <div className='signup-form-content'>
        <form onSubmit={handleSubmit}>
          <h3>Sign Up</h3>
          <div className='signup-form-group mb-2'>
            <label htmlFor="userId">User ID</label>
            <input 
              type="text" 
              placeholder="Enter User ID" 
              className='form-control' 
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required 
            />
          </div>
          <div className='signup-form-group mb-2'>
            <label htmlFor="username">Username</label>
            <input 
              type="text" 
              placeholder="Enter Username" 
              className='form-control' 
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              required 
            />
          </div>
          <div className='signup-form-group mb-2'>
            <label htmlFor="emailId">Email</label>
            <input 
              type="email" 
              placeholder="Enter Email" 
              className='form-control' 
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              required 
            />
          </div>
          <div className='signup-form-group mb-2'>
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
          <div className='signup-form-group mb-2'>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input 
              type="password" 
              placeholder="Confirm Password" 
              className="form-control" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required 
            />
          </div>
          <div className='signup-form-group mb-2'>
            <label htmlFor="roleId">Role</label>
            <div className='custom-dropdown'>
              <select
                className='form-control'
                value={roleId}
                onChange={handleRoleChange}
                required
              >
                <option value="1">Admin</option>
                <option value="2">Organizer</option>
                <option value="3">User</option>
              </select>
            </div>
          </div>
          {roleId === '2' || roleId === '3' ? (
            <>
              <div className='signup-form-group mb-2'>
                <label htmlFor="orgId">Organization ID</label>
                <input 
                  type="text" 
                  placeholder="Enter Organization ID" 
                  className='form-control' 
                  value={orgId}
                  onChange={(e) => setOrgId(e.target.value)}
                  required 
                />
              </div>
              <div className='signup-form-group mb-2'>
                <label htmlFor="orgName">Organization Name</label>
                <input 
                  type="text" 
                  placeholder="Enter Organization Name" 
                  className='form-control' 
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  required 
                />
              </div>
            </>
          ) : null}
          <button type="submit" className="btn btn-primary">Sign Up</button>
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

export default Signup;
