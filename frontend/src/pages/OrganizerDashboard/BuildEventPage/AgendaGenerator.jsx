import React, { useState, useEffect } from "react";
import axios from "axios";

const AgendaGenerator = ({ eventId }) => {
  const [description, setDescription] = useState("");
  const [agenda, setAgenda] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const API_BASE_URL = "http://localhost:5001"; // your AI‐backend
  const BACKEND_URL   = "http://localhost:5000"; // your app/server

  // Fetch the event description when eventId changes
  useEffect(() => {
    if (!eventId) return;
    axios
      .get(`${BACKEND_URL}/api/events/${eventId}`)
      .then((res) => {
        setDescription(res.data.description || "");
      })
      .catch((err) => {
        console.error("Failed to load event:", err);
        setError("Could not load event details.");
      });
  }, [eventId]);

  // Call AI to generate the agenda
  const generateAgenda = async () => {
    if (!description.trim()) {
      setError("Please enter an event description.");
      return;
    }
    setError("");
    setMessage("");
    setAgenda("");
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/generate-agenda`,
        { description }
      );
      setAgenda(data.agenda);
      if (data.message) setMessage(data.message);
    } catch (err) {
      const backendErr =
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.message;
      setError(backendErr);
    } finally {
      setLoading(false);
    }
  };

  // Save the generated agenda back to your app/server
  const saveAgenda = async () => {
    if (!agenda) {
      setError("Nothing to save yet.");
      return;
    }
    setError("");
    setIsSaving(true);

    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/saveAgenda/${eventId}`,
        { agenda }
      );
      alert(res.data.message); // e.g. “Agenda saved successfully”
    } catch (err) {
      console.error(err);
      const backendErr =
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.message;
      setError(backendErr);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-4">Event Agenda Generator</h2>

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border rounded p-2 mb-4"
        rows={5}
        placeholder="Event description"
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
          onClick={saveAgenda}
          disabled={isSaving || !agenda}
          className={`${
            isSaving ? "bg-green-400" : "bg-green-600 hover:bg-green-700"
          } text-white px-4 py-2 rounded disabled:opacity-50`}
        >
          {isSaving ? "Saving..." : "Save Agenda"}
        </button>
      </div>

      {/* {message && (
        <p className="text-green-600 mb-4 font-medium">{message}</p>
      )} */}
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
