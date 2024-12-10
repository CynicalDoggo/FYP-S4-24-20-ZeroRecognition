import React from "react";

const PrivacyConsent = () => {
    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Privacy and Consent</h1>
            <p>Details about how we handle your data...</p>
            <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded">
                I Consent
            </button>
            <button className="mt-4 px-4 py-2 bg-gray-500 text-white rounded">
                Opt-Out of Facial Recognition
            </button>
        </div>
    );
};

export default PrivacyConsent;
