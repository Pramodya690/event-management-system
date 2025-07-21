import React, { useState } from "react";
import axios from "axios";

const AgendaGenerator = () => {
  const [description, setDescription] = useState("");
  const [agenda, setAgenda] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_BASE_URL = "http://localhost:5000"; // Change if different

  const generateAgenda = async () => {
    if (!description.trim()) {
      setError("Please enter an event description.");
      return;
    }
    setError("");
    setLoading(true);
    setAgenda("");

    try {
      const response = await axios.post(`${API_BASE_URL}/generate-agenda`, {
        description,
      });
      setAgenda(response.data.agenda);
    } catch (err) {
      setError(
        err.response?.data?.error || "Failed to generate agenda. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const getLatestAgenda = async () => {
    setError("");
    setLoading(true);
    setAgenda("");
    try {
      const response = await axios.get(`${API_BASE_URL}/get-agenda`);
      setAgenda(response.data.agenda);
    } catch (err) {
      setError(
        err.response?.data?.error || "No agenda available or failed to fetch."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-4">Event Agenda Generator</h2>

      <textarea
        className="w-full border border-gray-300 rounded p-2 mb-4"
        rows={5}
        placeholder="Enter your event description here..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className="flex gap-4 mb-6">
        <button
          onClick={generateAgenda}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate Agenda"}
        </button>

        <button
          onClick={getLatestAgenda}
          disabled={loading}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 disabled:opacity-50"
        >
          Get Latest Agenda
        </button>
      </div>

      {error && <p className="text-red-600 mb-4 font-semibold">{error}</p>}

      {agenda && (
        <div className="bg-gray-100 p-4 rounded whitespace-pre-line border border-gray-300">
          {agenda}
        </div>
      )}
    </div>
  );
};

export default AgendaGenerator;
