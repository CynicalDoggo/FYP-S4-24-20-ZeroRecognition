// src/App.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';  // Ensure the path matches the file location
import Registration from './Registration';
import Homepage from './Homepage';
import Dashboard from './Dashboard';
import PrivacyConsent from './PrivacyConsent';
import FacialRegistration from './FacialRegistration';

const App = () => {
  const [token, setToken] = useState(false);

  // Save token to session storage if available
  useEffect(() => {
    if (token) {
      sessionStorage.setItem('token', JSON.stringify(token));
    }
  }, [token]);

  // Load token from session storage on page load
  useEffect(() => {
    const storedToken = sessionStorage.getItem('token');
    if (storedToken) {
      setToken(JSON.parse(storedToken));
    }
  }, []);

  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login setToken={setToken} />} />  {/* Ensure root path points to Login */}
        <Route path="/registration" element={<Registration />} />
        <Route path="/privacy" element={<PrivacyConsent />} />
        
        {/* Protected Routes */}
        {token ? (
          <>
            <Route path="/homepage" element={<Homepage token={token} />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/facial-registration" element={<FacialRegistration />} />
          </>
        ) : (
          // Redirect to Login if not authenticated
          <Route path="*" element={<div>Please log in to access this page.</div>} />
        )}
      </Routes>
    </div>
  );
};

export default App;
