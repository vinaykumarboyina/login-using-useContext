import React, { useContext,useEffect } from 'react';
import { store } from '../context/AuthContext';
import '../App.css'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Home = () => {
  const { logout,user,home} = useContext(store);
  const navigate = useNavigate()
  const token = Cookies.get('token')
  useEffect(() => {
    if (token) {
      console.log("cdvfv")
      home()
    }
  }, []);
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="home-container">
    <div className='user-details-card'>
    <h1>Welcome to the Home page!</h1>
      {user ? (
        <div>
          <p>Name: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      ):
       (
        <p>Loading user data...</p>
      )}
      
      <button className='logout-btn' onClick={handleLogout}>Logout</button>
    </div>
    </div>
  );
};

export default Home;
