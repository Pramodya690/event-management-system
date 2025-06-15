import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navigation from "../../components/Navigation.jsx";

const SignupAttendee = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Replace with your actual signup API route
      const response = await axios.post('/api/auth/attendee/signup', {
        name: form.name,
        email: form.email,
        password: form.password
      });

      if (response.status === 201 || response.status === 200) {
        navigate('/login'); // Redirect to login or homepage
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong.');
    }
  };

  return (
    <>
      <Navigation /> {/* ✅ Navigation bar outside the centered box */}
      
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Attendee Signup</h2>

          {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full mt-1 p-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full mt-1 p-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full mt-1 p-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                className="w-full mt-1 p-2 border rounded-md"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <span
              onClick={() => navigate('/login')}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Log in
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignupAttendee;
