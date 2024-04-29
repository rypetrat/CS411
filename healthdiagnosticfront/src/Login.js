import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



// defines the navBar and each destinations route
function Navbar() {
  return (
    <nav>
      <ul>
        <li><a href="user">Home</a></li>
        <li><a href="pastSearch">Past Searches</a></li>
        <li><a href="search">Search</a></li>
        <li><a href="login">Login</a></li>
      </ul>
    </nav>
  );
}

function Login() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [profile, setProfile] = useState([]);

  // handles google oAuth login
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
  });

  // get user sign in information
  useEffect(() => {
    if (user) {
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: 'application/json'
          }
        })
        .then((res) => {
          setProfile(res.data);
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('profileName', res.data.name); 
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  // handle sign out and clears local storage
  const logOut = () => {
    googleLogout();
    setProfile(null);
    localStorage.removeItem('user');
    localStorage.removeItem('profileName');
  };

  // handles to search button click
  const navigate = useNavigate();
  const handleClick1 = () => {
    navigate(`/search`);
  };

  // page display
  return (
    <div className="App">
      <Navbar />
      <header className="App-text">
        <h1>Login</h1>
        {(!profile || (!profile.name && !profile.email)) ? (
          <button className="button1" onClick={login}><span>Sign in with Google</span> </button>
        ) : (
          <div>
            <h3>User Logged in</h3>
            <p><strong style={{ color: 'white' }}>Name: </strong>{profile.name}</p>
            <p><strong style={{ color: 'white' }}>Email Address: </strong>{profile.email}</p>
            <div className="btn-group">
              <button className="button" onClick={logOut}>Log Out</button>
              <button className="button" onClick={handleClick1}>Go to search</button>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default Login;