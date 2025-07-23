import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StallAllocationPage = ({ form, setForm, eventId, setStallMapPreview }) => {
  const navigate = useNavigate();
  console.log("stallAllocationPage got eventId =", eventId);
  const [maxCapacity, setMaxCapacity] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [stallBlob, setStallBlob] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  // const [stallMapPreview, setStallMapPreview] = useState(null);


  // Fetch max stall capacity on mount
  useEffect(() => {
    fetch("http://localhost:5001/floorplan-api/max_capacity")
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then((data) => setMaxCapacity(data.max_capacity))
      .catch(() => setError("Failed to load max capacity"));
  }, []);

  // Generate stall layout
  const handleGenerateAllocation = async () => {
    setError("");
    const stalls = parseInt(form.stalls, 10);
    if (!stalls || stalls < 1) {
      setError("Please enter a valid number of stalls");
      return;
    }
    if (maxCapacity != null && stalls > maxCapacity) {
      setError(`Maximum stalls is ${maxCapacity}`);
      return;
    }

    setIsGenerating(true);
    setPreviewURL(null);
    setStallBlob(null);

    try {
      const res = await fetch(
        `http://localhost:5001/floorplan-api/layout?stalls=${stalls}`
      );
      if (!res.ok) throw new Error(res.statusText);
      const blob = await res.blob();
      setStallBlob(blob);
      setPreviewURL(URL.createObjectURL(blob));
      if (setStallMapPreview) {
        setStallMapPreview(URL.createObjectURL(blob))
        
      }
    } catch (e) {
      console.error("Layout generation error:", e);
      setError("Failed to generate layout");
    } finally {
      setIsGenerating(false);
    }
  };

  // Save stall layout to backend
  const handleSaveAllocation = async () => {
    console.log("🔌 handleSaveAllocation fired, eventId=", eventId, "has blob?", !!stallBlob);

    if (!stallBlob || !eventId) {
      setError("No layout generated or event ID missing");
      return;
    }
    setError("");
    setIsSaving(true);

    try {
      const formData = new FormData();
      formData.append(
        "stallLayoutImage",
        stallBlob,
        `stall-layout-${eventId}.png`
      );

      // inspect entries for debugging
      for (let [key, value] of formData.entries()) {
        console.log("📦 form entry:", key, value);
      }

      const res = await fetch(
        `http://localhost:5000/api/saveStallLayout/${eventId}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const payload = await res.json();
      console.log("saveStallLayout status:", res.status, payload);

      if (!res.ok) throw new Error(payload.error || res.statusText);

      setError("Stall layout saved successfully");
    } catch (err) {
      console.error("Stall save error:", err);
      setError(err.message || "Failed to save stall layout");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Stall Allocation Setup</h1>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
        >
          &larr; Back
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md">
          <p>{error}</p>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        {/* Configuration Panel */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Configuration</h2>
          <div className="mb-4">
            <label
              htmlFor="stalls"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Number of Stalls *
            </label>
            <input
              type="number"
              id="stalls"
              name="stalls"
              min="1"
              max={maxCapacity || undefined}
              value={form.stalls || ""}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, stalls: e.target.value }))
              }
              placeholder="Enter number of stalls"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
            <p className="mt-1 text-xs text-gray-500">
              {maxCapacity != null
                ? `Min 1, Max ${maxCapacity} stalls`
                : "Loading capacity..."}
            </p>
          </div>

          <button
            onClick={handleGenerateAllocation}
            disabled={isGenerating || maxCapacity == null}
            className={`w-full flex justify-center px-6 py-3 rounded-md text-white font-medium transition-colors ${
              isGenerating ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isGenerating ? "Generating..." : "Generate Stall Layout"}
          </button>

          {/* Save Stall Layout */}
          <button
            onClick={handleSaveAllocation}
            disabled={!previewURL || !eventId || isSaving}
            className={`w-full mt-4 flex justify-center px-6 py-3 rounded-md text-white font-medium transition-colors ${
              isSaving ? "bg-green-400" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {isSaving ? "Saving..." : "Save Stall Layout"}
          </button>
        </div>

        {/* Preview Panel */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 h-full">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Preview</h2>
          <div className="bg-white border border-gray-200 rounded-md h-96 flex items-center justify-center">
            {previewURL ? (
              <img
                src={previewURL}
                alt="Stall Layout Preview"
                className="max-h-full max-w-full object-contain"
              />
            ) : (
              <p className="text-gray-400">Preview will appear here</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StallAllocationPage;
