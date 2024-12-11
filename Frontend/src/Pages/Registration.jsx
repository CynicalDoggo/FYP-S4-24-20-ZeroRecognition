import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseclient';
import PrivacyConsent from './PrivacyConsent';
import FacialRegistration from './FacialRegistration';

const Registration = ({ setToken }) => {
  const navigate = useNavigate();
  const [registrationData, setRegistrationData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNum: ''
  });
  const [currentStep, setCurrentStep] = useState('form');
  const [useFacialRecognition, setUseFacialRecognition] = useState(false);
  const [showPrivacyConsent, setShowPrivacyConsent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegistrationData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // Validate form fields
    if (!registrationData.email || !registrationData.password || 
        !registrationData.firstName || !registrationData.lastName) {
      alert('Please fill in all required fields');
      return;
    }

    // Always show privacy consent before proceeding
    setShowPrivacyConsent(true);
  };

  const handlePrivacyConsentDecision = async (consentAccepted) => {
    if (!consentAccepted) {
      // If consent not accepted, close privacy consent modal
      setShowPrivacyConsent(false);
      return;
    }

    // Consent accepted
    setShowPrivacyConsent(false);

    if (useFacialRecognition) {
      // If facial recognition is opted in, move to facial setup
      setCurrentStep('facial-setup');
    } else {
      // Complete regular registration
      await completeRegistration();
    }
  };

  const handleFacialSetup = async (faceData) => {
    try {
      // Register user with auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: registrationData.email,
        password: registrationData.password,
        options: {
          data: {
            first_name: registrationData.firstName,
            last_name: registrationData.lastName,
            phone_num: registrationData.phoneNum,
            has_facial_data: true
          }
        }
      });

      if (authError) throw authError;

      // Store facial data in the database
      const { error: facialError } = await supabase
        .from('facial_data')
        .insert([
          {
            user_id: authData.user.id,
            face_data: faceData,
            consent_given: true
          }
        ]);

      if (facialError) throw facialError;

      alert('Registration successful! Please check your email for verification.');
      navigate('/'); // Redirect to login page
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed: ' + error.message);
    }
  };

  const completeRegistration = async () => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: registrationData.email,
        password: registrationData.password,
        options: {
          data: {
            first_name: registrationData.firstName,
            last_name: registrationData.lastName,
            phone_num: registrationData.phoneNum,
            has_facial_data: false
          }
        }
      });

      if (error) throw error;
      
      alert('Registration successful! Please check your email for verification.');
      navigate('/'); // Redirect to login page
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {/* Registration Form */}
      {currentStep === 'form' && (
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl mb-6 text-center">Registration</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <input
                type="email"
                name="email"
                value={registrationData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                name="password"
                value={registrationData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="firstName"
                value={registrationData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="lastName"
                value={registrationData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="tel"
                name="phoneNum"
                value={registrationData.phoneNum}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={useFacialRecognition}
                  onChange={() => setUseFacialRecognition(!useFacialRecognition)}
                  className="mr-2"
                />
                <span>Use Facial Recognition</span>
              </label>
            </div>
            <button 
              type="submit" 
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            >
              Register
            </button>
          </form>
        </div>
      )}

      {/* Privacy Consent */}
      {showPrivacyConsent && (
        <PrivacyConsent
          onAccept={() => handlePrivacyConsentDecision(true)}
          onCancel={() => handlePrivacyConsentDecision(false)}
        />
      )}

      {/* Facial Registration */}
      {currentStep === 'facial-setup' && (
        <FacialRegistration
          onComplete={handleFacialSetup}
          onSkip={() => completeRegistration()}
        />
      )}
    </div>
  );
};

export default Registration;