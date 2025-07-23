import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SeatAllocationPage = ({ form, setForm, eventId, setSeatMapPreview }) => {
  const navigate = useNavigate();
  console.log("🚀 SeatAllocationPage got eventId =", eventId);

  // State
  const [numberOfSeats, setNumberOfSeats] = useState(1);
  const [layoutPreference, setLayoutPreference] = useState("Theater Style");
  const [maxCapacity, setMaxCapacity] = useState(null);
  const [layoutURL, setLayoutURL] = useState(null);
  const [layoutBlob, setLayoutBlob] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const API_BASE = "http://localhost:5001";
  const endpoints = {
    "Theater Style": {
      max: `${API_BASE}/theater-api/max_capacity`,
      layout: `${API_BASE}/theater-api/layout`
    },
    "Banquet Style": {
      max: `${API_BASE}/boquet-api/max_capacity`,
      layout: `${API_BASE}/boquet-api/layout`
    },
    "U-Shape": {
      max: `${API_BASE}/ushape-api/max_capacity`,
      layout: `${API_BASE}/ushape-api/layout`
    }
  };

  useEffect(() => {
    const url = endpoints[layoutPreference]?.max;
    if (!url) {
      setError("Selected layout preference is not available");
      setMaxCapacity(null);
      return;
    }
    setError("");
    setMaxCapacity(null);
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then(data => setMaxCapacity(data.max_capacity))
      .catch(err => {
        console.error("Max capacity fetch error:", err);
        setError(`Could not load max capacity: ${err.message}`);
      });
  }, [layoutPreference]);

  const handleGenerateLayout = async () => {
    if (maxCapacity !== null && numberOfSeats > maxCapacity) {
      setError(`Number of seats exceeds max capacity of ${maxCapacity}`);
      return;
    }
    setError("");
    setIsGenerating(true);
    setLayoutURL(null);
    setLayoutBlob(null);

    const url = endpoints[layoutPreference]?.layout;
    if (!url) {
      setError("Selected layout preference is not available");
      setIsGenerating(false);
      return;
    }

    try {
      const res = await fetch(`${url}?seats=${numberOfSeats}`);
      if (!res.ok) throw new Error(res.statusText);
      const blob = await res.blob();
      setLayoutBlob(blob);
      setLayoutURL(URL.createObjectURL(blob));

      if (setSeatMapPreview){
        setSeatMapPreview(URL.createObjectURL(blob))
      }
    } catch (err) {
      console.error("Layout generation error:", err);
      setError(err.message || "Failed to generate layout");
    } finally {
      setIsGenerating(false);
    }
  };

const handleSaveLayout = async () => {
  console.log("🔍 layoutBlob:", layoutBlob);

  if (!layoutBlob || !eventId) {
    setError("No layout generated or event ID missing");
    return;
  }

  setError("");
  setIsSaving(true);

  try {
    const form = new FormData();
    form.append("layoutImage", layoutBlob, `layout-${eventId}.jpg`);

    // 🔎 Inspect every entry in FormData
    for (let [key, value] of form.entries()) {
      console.log("📦 form entry:", key, value);
    }

    const res = await fetch(
      `http://localhost:5000/api/saveLayout/${eventId}`,
      {
        method: "POST",
        body: form,
        // ← no Content-Type header here
      }
    );

    const payload = await res.json();
    console.log("saveLayout status:", res.status, payload);

    if (!res.ok) throw new Error(payload.error || res.statusText);

    setError("Layout saved successfully");
  } catch (err) {
    console.error("Layout save error:", err);
    setError(err.message || "Failed to save layout");
  } finally {
    setIsSaving(false);
  }
};


  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Seat Allocation</h1>
          <p className="text-gray-600">
            Configure and visualize your seating arrangement
          </p>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 px-4 py-2 rounded-lg border border-gray-200"
        >
          ← Back
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Configuration Panel */}
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700 mb-6">
            Configuration
          </h2>

          {error && (
            <p
              className={`mb-4 font-medium ${
                error === "Layout saved successfully"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {error}
            </p>
          )}

          <div className="space-y-6">
            {/* Number of Seats */}
            <div>
              <label
                htmlFor="seats"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Number of Seats
              </label>
              <div className="flex items-center gap-4">
                <input
                  id="seats"
                  type="number"
                  min="1"
                  max={maxCapacity || 1000}
                  value={numberOfSeats}
                  onChange={e =>
                    setNumberOfSeats(
                      Math.max(1, parseInt(e.target.value, 10) || 1)
                    )
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() =>
                    setNumberOfSeats(prev => Math.max(1, prev - 1))
                  }
                  disabled={numberOfSeats <= 1}
                  className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
                >
                  –
                </button>
                <button
                  onClick={() =>
                    setNumberOfSeats(prev =>
                      maxCapacity ? Math.min(maxCapacity, prev + 1) : prev + 1
                    )
                  }
                  disabled={maxCapacity !== null && numberOfSeats >= maxCapacity}
                  className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
                >
                  +
                </button>
              </div>
              {maxCapacity !== null && (
                <p className="mt-2 text-sm text-gray-500">
                  Max capacity: {maxCapacity}
                </p>
              )}
            </div>

            {/* Layout Preference */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Layout Preference
              </label>
              <select
                value={layoutPreference}
                onChange={e => setLayoutPreference(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {Object.keys(endpoints).map(pref => (
                  <option key={pref} value={pref}>
                    {pref}
                  </option>
                ))}
              </select>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerateLayout}
              disabled={isGenerating}
              className={`w-full py-3 px-4 rounded-lg text-white ${
                isGenerating ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isGenerating ? "Generating Layout..." : "Generate Seat Layout"}
            </button>

            {/* Save Button */}
            <button
              onClick={handleSaveLayout}
              // disabled={!layoutBlob || !eventId || isSaving}
              className={`w-full py-3 px-4 rounded-lg text-white mt-4 ${
                isSaving ? "bg-green-400" : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {isSaving ? "Saving..." : "Save Layout"}
            </button>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700 mb-6">
            Seat Layout Preview
          </h2>

          {layoutURL ? (
            <img
              src={layoutURL}
              alt="Seating Layout"
              className="w-full border border-gray-300 rounded-lg"
            />
          ) : (
            <div className="bg-white p-8 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 h-64">
              <div className="text-center">
                <p className="text-lg">No layout generated yet</p>
                <p className="text-sm mt-1">
                  Configure and click “Generate Layout”
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SeatAllocationPage;
