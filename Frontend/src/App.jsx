import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Registration from './Pages/Registration';
import Login from './Pages/Login'; // You can remove this if you no longer need it
import Homepage from './Pages/Homepage';
import PrivacyConsent from './Pages/PrivacyConsent';
import FacialRegistration from './Pages/FacialRegistration';

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
        <Route path="/" element={<Login setToken={setToken} />} /> {/* Update the route to GuestRegistrationFlow */}
        <Route path="/Registration" element={<Registration />} />
        <Route path="/privacy" element={<PrivacyConsent />} />
        <Route path="/booking" element={<div>Booking Page (Add Booking Form Here)</div>} /> {/* Placeholder */}

        {/* Protected Routes - Only accessible when the user is logged in */}
        {token ? (
          <>
            <Route path="/Homepage" element={<Homepage token={token} />} />
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
