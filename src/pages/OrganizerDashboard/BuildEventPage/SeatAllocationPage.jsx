// import { useNavigate } from "react-router-dom";

// const SeatAllocationPage = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Seat Allocation</h1>
//       {/* Your seat allocation UI goes here */}

//       <button
//         onClick={() => navigate(-1)} // go back
//         className="mt-4 bg-gray-300 px-4 py-2 rounded"
//       >
//         Back
//       </button>
//     </div>
//   );
// };

// export default SeatAllocationPage;
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SeatAllocationPage = () => {
  const navigate = useNavigate();
  const [numberOfSeats, setNumberOfSeats] = useState(1);
  const [seatLayout, setSeatLayout] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateLayout = () => {
    setIsGenerating(true);
    // Simulate layout generation
    setTimeout(() => {
      setIsGenerating(false);
      setSeatLayout({
        rows: Math.ceil(numberOfSeats / 10),
        cols: numberOfSeats > 10 ? 10 : numberOfSeats,
        total: numberOfSeats,
      });
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Seat Allocation</h1>
          <p className="text-gray-600">
            Configure and visualize your seating arrangement
          </p>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors px-4 py-2 rounded-lg border border-gray-200 hover:border-gray-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
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

      <div className="grid md:grid-cols-2 gap-8">
        {/* Configuration Panel */}
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700 mb-6">
            Configuration
          </h2>

          <div className="space-y-6">
            <div>
              <label
                htmlFor="seats"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Number of Seats
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="number" // Change this to type="number" (with double quotes)
                  id="seats"
                  min="1"
                  max="500"
                  value={numberOfSeats}
                  onChange={(e) =>
                    setNumberOfSeats(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
                <button
                  onClick={() =>
                    setNumberOfSeats((prev) => Math.max(1, prev - 1))
                  }
                  className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-700"
                >
                  -
                </button>
                <button
                  onClick={() => setNumberOfSeats((prev) => prev + 1)}
                  className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-700"
                >
                  +
                </button>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Enter the total number of seats needed (1-500)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Layout Preference
              </label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
                <option>Auto-arrange (Recommended)</option>
                <option>Classroom Style</option>
                <option>Theater Style</option>
                <option>Banquet Style</option>
                <option>U-Shape</option>
              </select>
            </div>

            <button
              onClick={handleGenerateLayout}
              disabled={isGenerating}
              className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors ${
                isGenerating ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isGenerating ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
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
                  Generating Layout...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Generate Seat Layout
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700 mb-6">
            Seat Layout Preview
          </h2>

          {seatLayout ? (
            <div className="space-y-6">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="overflow-auto">
                  <div
                    className="grid gap-2 mx-auto"
                    style={{
                      gridTemplateColumns: `repeat(${seatLayout.cols}, minmax(0, 1fr))`,
                      width: "fit-content",
                    }}
                  >
                    {Array.from({ length: seatLayout.total }).map(
                      (_, index) => (
                        <div
                          key={index}
                          className="w-10 h-10 bg-blue-100 border border-blue-200 rounded flex items-center justify-center text-blue-800 font-medium"
                        >
                          {index + 1}
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="font-medium text-blue-800 mb-2">
                  Layout Summary
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Total Seats</p>
                    <p className="font-medium">{seatLayout.total}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Rows</p>
                    <p className="font-medium">{seatLayout.rows}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Columns</p>
                    <p className="font-medium">{seatLayout.cols}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Empty Spaces</p>
                    <p className="font-medium">
                      {seatLayout.rows * seatLayout.cols - seatLayout.total}
                    </p>
                  </div>
                </div>
              </div>

              <button className="w-full py-2 px-4 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-colors">
                Download Layout as PDF
              </button>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-center text-gray-400 h-64">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mb-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
              <p className="text-lg">No layout generated yet</p>
              <p className="text-sm mt-1">
                Configure your seating arrangement and click "Generate"
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SeatAllocationPage;
