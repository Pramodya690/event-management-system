import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Signup() {
  const { role } = useParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    console.log(`Signing up as ${role} with`, email, password);

    if (role === 'organizer') {
      navigate('/organizer-details');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <form
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
        onSubmit={handleSignup}
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Sign Up as {role.charAt(0).toUpperCase() + role.slice(1)}
        </h2>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {role === 'vendor' && (
          <input
            type="text"
            placeholder="Business Name"
            required
            className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Signup;
