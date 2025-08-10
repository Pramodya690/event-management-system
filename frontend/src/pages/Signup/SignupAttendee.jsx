import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navigation from "../../components/Navigation.jsx";

const SignupAttendee = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    gender: "",
    age: "",
    city: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const ageGroups = [
    "under 18",
    "18 - 24",
    "25 - 34",
    "35 - 44",
    "45 - 54",
    "over 55",
  ];

  const availableCities = [
    "Colombo",
    "Kandy",
    "Galle",
    "Jaffna",
    "Negombo",
    "Trincomalee",
    "Batticaloa",
    "Anuradhapura",
    "Polonnaruwa",
    "Matara",
    "Ratnapura",
    "Badulla",
    "Kurunegala",
    "Kalutara",
    "Matale",
    "Hambantota",
    "Ampara",
    "Nuwara Eliya",
    "Puttalam",
    "Mannar",
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
      const response = await axios.post(
        "http://localhost:5000/api/auth/attendee/signup",
        {
          name: form.name,
          email: form.email,
          password: form.password,
          age: form.age,
          city: form.city,
          gender: form.gender,
        }
      );

      if (response.status === 201 || response.status === 200) {
        navigate("/login");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen flex items-center justify-center bg-sky-50 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 border border-sky-100">
          <h2 className="text-3xl font-bold text-center text-sky-700 mb-6">
            Attendee Signup
          </h2>

          {error && (
            <p className="text-red-600 text-sm mb-4 text-center font-medium">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { label: "Name", name: "name", type: "text" },
              { label: "Email", name: "email", type: "email" },
              { label: "Password", name: "password", type: "password" },
              {
                label: "Confirm Password",
                name: "confirmPassword",
                type: "password",
              },
            ].map(({ label, name, type }) => (
              <div key={name}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {label}
                </label>
                <input
                  name={name}
                  type={type}
                  value={form[name]}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-sky-200 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                required
                className="w-full p-2 border border-sky-200 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Age Group
              </label>
              <select
                name="age"
                value={form.age}
                onChange={handleChange}
                required
                className="w-full p-2 border border-sky-200 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <select
                name="city"
                value={form.city}
                onChange={handleChange}
                required
                className="w-full p-2 border border-sky-200 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value="">Select your city</option>
                {availableCities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-sky-600 text-white py-2 rounded-lg text-lg font-semibold hover:bg-sky-700 transition-all"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-sky-600 hover:underline cursor-pointer"
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