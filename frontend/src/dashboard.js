import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Table } from 'antd';

import './Dashboard.css';

function Dashboard() {
  const location = useLocation();
  const { loginPerson, users } = location.state || { loginPerson: {}, users: [] };

  const [userData, setUserData] = useState([]);
  const [userLoginData, setUserLoginData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      try {
        if (token) {
          const response = await axios.get('http://localhost:8080/', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setUserLoginData(response.data.loginPerson);
          setUserData(response.data.users);
          console.log("response", response.data); 
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      
      }
    };

    fetchUserData();
  }, []); 

  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'User ID',
      dataIndex: 'user_id',
      key: 'user_id',
    },
    {
      title: 'Email',
      dataIndex: 'emailId',
      key: 'emailId',
    },
    {
      title: 'Role',
      dataIndex: 'role_name',
      key: 'role_name',
    },
    {
      title: 'Organization',
      dataIndex: 'org_name',
      key: 'org_name',
    },
  ];

  return (
    <div className="dashboard-container">
      <h2>User Dashboard</h2>

      <div className="login-person">
        <h3>Login Person Details</h3>
        <div className="user-item">
          <h4>Username: {userLoginData?.username}</h4>
          <p>User ID: {userLoginData?.user_id}</p>
          <p>Email: {userLoginData?.emailId}</p>
          <p>Role: {userLoginData?.role_name}</p>
          <p>Organization: {userLoginData?.org_name}</p>
        </div>
      </div>

      <div >
      {userLoginData?.role_name !== "User" && (
        <div>
            <h3>User List</h3>
            <Table dataSource={userData} columns={columns} rowKey="user_id" />
        </div>
      )}
        
      </div>
    </div>
  );
}

export default Dashboard;










