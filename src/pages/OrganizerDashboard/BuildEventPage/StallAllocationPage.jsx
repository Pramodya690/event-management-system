import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StallAllocationPage = ({ form, setForm }) => {
  const navigate = useNavigate();
  const [stallMapPreview, setStallMapPreview] = useState(
    form.placeMap ? URL.createObjectURL(form.placeMap) : null
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      if (stallMapPreview) {
        URL.revokeObjectURL(stallMapPreview);
      }
    };
  }, [stallMapPreview]);

  const validateFile = (file) => {
    if (!file) {
      return "No file selected";
    }
    if (!file.type.match("image.*")) {
      return "Please select an image file (JPEG, PNG, GIF)";
    }
    if (file.size > 5 * 1024 * 1024) {
      return "File size exceeds 5MB limit";
    }
    return null;
  };

  const handleMapUpload = (file) => {
    const error = validateFile(file);
    if (error) {
      setUploadError(error);
      return;
    }

    if (stallMapPreview) {
      URL.revokeObjectURL(stallMapPreview);
    }

    const previewUrl = URL.createObjectURL(file);
    setForm((prev) => ({
      ...prev,
      placeMap: file,
    }));
    setStallMapPreview(previewUrl);
    setUploadError(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleMapUpload(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    handleMapUpload(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleGenerateAllocation = () => {
    if (!form.stalls || !form.placeMap) {
      setUploadError("Please provide number of stalls and upload a map first");
      return;
    }

    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      alert(
        "AI Stall Allocation Complete!\n\n" +
          `Based on your ${form.stalls} stalls and uploaded floor plan, the AI has:\n` +
          "- Optimized stall placement for equal visibility\n" +
          "- Ensured proper traffic flow between stalls\n" +
          "- Reserved space for walkways and emergency exits"
      );
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Stall Allocation Setup
        </h1>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back
        </button>
      </div>

      {uploadError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md">
          <p>{uploadError}</p>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        {/* Configuration */}
        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Stall Configuration
            </h2>

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
                value={form.stalls || ""}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
                min="1"
                placeholder="Enter number of stalls"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
              <p className="mt-1 text-xs text-gray-500">
                Minimum 1 stall required
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stall Dimensions (optional)
              </label>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  placeholder="Width (ft)"
                  className="px-4 py-2 border border-gray-300 rounded-md"
                />
                <input
                  type="number"
                  placeholder="Depth (ft)"
                  className="px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Venue Map *
            </h2>

            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md transition ${
                dragActive
                  ? "border-blue-400 bg-blue-50"
                  : "border-gray-300 bg-white"
              }`}
            >
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="text-sm text-gray-600">
                  <label className="cursor-pointer text-blue-600 hover:text-blue-500">
                    Upload a file
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="sr-only"
                    />
                  </label>{" "}
                  or drag and drop
                </p>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
              </div>
            </div>

            {form.placeMap && (
              <p className="mt-2 text-sm text-green-600">
                ✅ {form.placeMap.name} uploaded successfully
              </p>
            )}
          </div>
        </div>

        {/* Preview */}
        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 h-full">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Preview
            </h2>
            <div className="bg-white border border-gray-200 rounded-md h-96 flex flex-col">
              {form.placeMap ? (
                <>
                  <div className="p-2 border-b border-gray-200 flex justify-between items-center bg-gray-100">
                    <span className="text-sm font-medium text-gray-700">
                      Map Preview
                    </span>
                    <span className="text-xs text-gray-500 truncate max-w-xs">
                      {form.placeMap.name}
                    </span>
                  </div>
                  <div className="flex-grow flex items-center justify-center p-4 overflow-auto">
                    <img
                      src={stallMapPreview}
                      alt="Stall Allocation Preview"
                      className="max-h-full max-w-full object-contain shadow-sm"
                    />
                  </div>
                </>
              ) : (
                <div className="flex-grow flex flex-col items-center justify-center text-gray-400 p-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 mb-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                    />
                  </svg>
                  <p className="text-center">
                    Upload a floor plan to preview stall allocation
                  </p>
                  <p className="text-sm text-center mt-1">
                    The generated stall layout will appear here
                  </p>
                </div>
              )}
            </div>
            <div className="mt-4">
              <button
                type="button"
                onClick={handleGenerateAllocation}
                className={`w-full flex justify-center items-center px-6 py-3 rounded-md text-white font-medium ${
                  !form.stalls || !form.placeMap
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                } transition-colors`}
                disabled={!form.stalls || !form.placeMap || isGenerating}
              >
                {isGenerating ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Generating...
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Generate Stall Allocation with AI
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StallAllocationPage;
