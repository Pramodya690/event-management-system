import React, { useState } from "react";

export default function SimpleSettingsPage() {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Saved username: ${username}`);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-2xl font-semibold mb-6">Settings</h1>

      <form onSubmit={handleSubmit}>
        <label
          htmlFor="username"
          className="block mb-2 font-medium text-gray-700"
        >
          Username
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="Enter your username"
          required
        />

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save
        </button>
      </form>
    </div>
  );
}
