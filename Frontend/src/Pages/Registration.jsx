import React, { useState } from "react";

const Registration = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNum: '',
    password: '',
    confirmPassword: '',
  });

  const [facialRecognitionOptIn, setFacialRecognitionOptIn] = useState(false);
  const [privacyAndConsentChecked, setPrivacyAndConsentChecked] = useState(false);
  const [showModal, setShowModal] = useState(false);

  function handleChange(event) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  }

  function handleFacialRecognitionChange(event) {
    setFacialRecognitionOptIn(event.target.checked);
  }

  function handlePrivacyAndConsentChange(event) {
    setPrivacyAndConsentChecked(event.target.checked);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!privacyAndConsentChecked) {
      alert("Please review our Privacy and Consent before proceeding");
      return;
    }

    try {
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNum: formData.phoneNum,
        email: formData.email,
        password: formData.password,
        facialRecognitionOptIn: facialRecognitionOptIn,
      };

      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (result.success) {
        alert("Registration successful! Please check your email for verification.");
      } else {
        alert(`Registration failed: ${result.message}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(error);
    }
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-md shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-center mb-6">Registration</h1>

        <div className="mb-4">
          <input
            placeholder="First Name"
            name="firstName"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <input
            placeholder="Last Name"
            name="lastName"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <input
            placeholder="Email"
            name="email"
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <input
            placeholder="Phone Number"
            name="phoneNum"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <input
            placeholder="Password"
            name="password"
            type="password"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <input
            placeholder="Confirm Password"
            name="confirmPassword"
            type="password"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              checked={privacyAndConsentChecked}
              onChange={handlePrivacyAndConsentChange}
            />
            <span>
              I have read and agreed to the{" "}
              <span
                className="text-blue-500 underline hover:text-blue-700 cursor-pointer"
                onClick={() => setShowModal(true)}
              >
                Privacy and Consent terms
              </span>
            </span>
          </label>
        </div>

        <div className="mb-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              checked={facialRecognitionOptIn}
              onChange={handleFacialRecognitionChange}
            />
            <span>Opt-in for Facial Recognition</span>
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded
           hover:bg-blue-600 transition duration-300">
          Register
        </button> 
      </form>

      {/* Privacy and Consent Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Terms and Conditions for Facial Recognition Data Usage</h2>
            <p className="mb-4">
              Details about how we handle your data... Please review this
              carefully before proceeding.
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Registration;
