import React, { useState } from "react";
import { supabase } from '../supabaseclient';
import { Link, useNavigate } from "react-router-dom";

const Login = ({ setToken }) => {
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');

  function handleChange(event) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage(''); // Reset message before submission
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      console.log(data);
      setToken(data); // Store the token or relevant data
      setMessage('Login successful!');
      navigate('/Homepage'); // Navigate to Homepage after successful login
    } catch (error) {
      setMessage('Login failed. Please check your credentials.');
      console.error(error);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

        {message && (
          <div className={`mb-4 p-2 text-center ${message.includes('failed') ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div className="mb-6">
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Submit
          </button>
        </form>

        <div className="mt-4 text-center">
          Don't have an account?{' '}
          <Link to="/Registration" className="text-blue-500 hover:underline">
            Register Here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
