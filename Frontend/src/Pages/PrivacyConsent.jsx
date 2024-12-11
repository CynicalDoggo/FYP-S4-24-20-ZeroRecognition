import React from 'react';

const PrivacyConsent = ({ onAccept, onClose }) => {
  return (
    <div className="min-h-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-semibold mb-4">Privacy Consent</h2>
        <p className="mb-4">
          By continuing, you agree to our privacy policy and consent to the usage of facial recognition for authentication purposes. Your data will be securely stored and used solely for authentication and related purposes.
        </p>
        
        <div className="flex justify-between">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={onAccept}
          >
            Accept
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyConsent;
