import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import GetStarted from './GetStarted';
import Login from './Login';
import PastSearches from './PastSearches';
import UserCenter from './UserCenter';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css';




ReactDOM.render(
  <GoogleOAuthProvider clientId='709232702822-4fdemlks8c8jopdh9fc82so8qn875e49.apps.googleusercontent.com'>
        <React.StrictMode>
          <Router>
            <Routes>
              <Route path="/search" element={<App />} />
              <Route path="/login" element={<Login />} />
              <Route path="/pastSearch" element={<PastSearches />} />
              <Route path="/user" element={<UserCenter />} />
              <Route path="/" element={<GetStarted />} />
            </Routes>
          </Router>
        </React.StrictMode>,
    </GoogleOAuthProvider>,
    document.getElementById('root')
);

reportWebVitals();