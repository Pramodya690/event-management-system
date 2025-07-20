import { useNavigate } from "react-router-dom";

const SeatAllocationPage = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Seat Allocation</h1>
      {/* Your seat allocation UI goes here */}

      <button
        onClick={() => navigate(-1)} // go back
        className="mt-4 bg-gray-300 px-4 py-2 rounded"
      >
        Back
      </button>
    </div>
  );
};

export default SeatAllocationPage;
