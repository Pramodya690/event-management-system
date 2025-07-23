import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navigation from "../../components/Navigation.jsx";

const SignupAttendee = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    gender: '',
    age: '',
    city: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');

  const ageGroups = [
    'under 18', '18 - 24', '25 - 34', '35 - 44', '45 - 54', 'over 55'  
  ];

    const availableCities = [
    'Colombo', 'Kandy', 'Galle', 'Jaffna', 'Negombo',
    'Trincomalee', 'Batticaloa', 'Anuradhapura', 'Polonnaruwa', 'Matara',
    'Ratnapura', 'Badulla', 'Kurunegala', 'Kalutara', 'Matale',
    'Hambantota', 'Ampara', 'Nuwara Eliya', 'Puttalam', 'Mannar'
  ];

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
      const response = await axios.post('http://localhost:5000/api/auth/attendee/signup', {
        name: form.name,
        email: form.email,
        password: form.password,
        age: form.age,
        city:form.city,
        gender: form.gender
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
  <label className="block text-sm font-medium text-gray-700">Gender</label>
  <select
    name="gender"
    value={form.gender}
    onChange={handleChange}
    required
    className="w-full mt-1 p-2 border rounded-md"
  >
    <option value="">Select gender</option>
    <option value="Male">Male</option>
    <option value="Female">Female</option>
    <option value="Other">Other</option>
    <option value="Prefer not to say">Prefer not to say</option>
  </select>
</div>

<div>
  <label className="block text-sm font-medium text-gray-700">Age Group</label>
  <select
    name="age"
    value={form.age}
    onChange={handleChange}
    required
    className="w-full mt-1 p-2 border rounded-md"
  >
    <option value="">Select age group</option>
    {ageGroups.map((group) => (
      <option key={group} value={group}>
        {group}
      </option>
    ))}
  </select>
</div>


<div>
  <label className="block text-sm font-medium text-gray-700">Age Group</label>
  <select
    name="city"
    value={form.city}
    onChange={handleChange}
    required
    className="w-full mt-1 p-2 border rounded-md"
  >
    <option value="">Select your city</option>
    {availableCities.map((group) => (
      <option key={group} value={group}>
        {group}
      </option>
    ))}
  </select>
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
