import React, { useState } from "react";
import { supabase } from "../supabaseclient";
import { Link } from "react-router-dom";


const Registration = () => {
  const [formData, setFormData] = useState({
    firstName:'',lastName:'',email:'',phoneNum:'',password:'',confirmPassword:''
  });

  const [optInFacialRecognition, setOptInFacialRecognition] = useState(false);

  console.log(formData);

  function handleChange(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  function handleOptInChange(event) {
    setOptInFacialRecognition(event.target.checked);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            phone_num: formData.phoneNum,
          },
        },
      });
      if (error) throw error;
      alert("Check your email for verification link");
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="First Name"
          name="firstName"
          onChange={handleChange}
        />

        <input
          placeholder="Last Name"
          name="lastName"
          onChange={handleChange}
        />

        <input placeholder="Email" name="email" onChange={handleChange} />

        <input
          placeholder="Phone Number"
          name="phoneNum"
          onChange={handleChange}
        />

        <input
          placeholder="Password"
          name="password"
          type="password"
          onChange={handleChange}
        />

        <input
          placeholder="Confirm Password"
          name="confirmPassword"
          type="password"
          onChange={handleChange}
        />

        {/* Opt-in Checkbox for Facial Recognition */}
        <div className="mt-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={optInFacialRecognition}
              onChange={handleOptInChange}
              className="mr-2"
            />
            Opt-in for Facial Recognition
          </label>
        </div>

        {/* Privacy and Consent Link */}
        {optInFacialRecognition && (
          <p className="mt-2 text-sm text-blue-500">
            Please review our{" "}
            <Link to="/privacy" className="underline hover:text-blue-700">
              Privacy and Consent
            </Link>
            .
          </p>
        )}

        <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>

      <p className="mt-4 text-sm">
        Already have an account?{" "}
        <Link to="/" className="text-blue-500 underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Registration;
