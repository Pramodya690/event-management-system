import { useNavigate } from 'react-router-dom';

function RoleSelect() {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    navigate(`/signup/${role}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold mb-6">Select Your Role</h2>
        <div className="flex flex-col space-y-4">
          <button
            onClick={() => handleRoleSelect('attendee')}
            className="py-3 px-6 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Attendee
          </button>
          <button
            onClick={() => handleRoleSelect('vendor')}
            className="py-3 px-6 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Vendor
          </button>
          <button
            onClick={() => handleRoleSelect('organizer')}
            className="py-3 px-6 bg-blue-400 text-white rounded hover:bg-blue-500 transition"
          >
            Organizer
          </button>
          <button
            onClick={() => handleRoleSelect('admin')}
            className="py-3 px-6 bg-blue-300 text-white rounded hover:bg-blue-400 transition"
          >
            Admin
          </button>
        </div>
      </div>
    </div>
  );
}

export default RoleSelect;
