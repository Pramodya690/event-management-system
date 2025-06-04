// import { useParams, useNavigate } from 'react-router-dom';
// import { useState } from 'react';

// function Signup() {
//   const { role } = useParams();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSignup = (e) => {
//     e.preventDefault();
//     console.log(`Signing up as ${role} with`, email, password);

//     if (role === 'organizer') {
//       navigate('/organizer-details');
//     } else {
//       navigate('/login');
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
//       <form
//         className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
//         onSubmit={handleSignup}
//       >
//         <h2 className="text-2xl font-semibold mb-6 text-center">
//           Sign Up as {role.charAt(0).toUpperCase() + role.slice(1)}
//         </h2>

//         <input
//           type="email"
//           placeholder="Email"
//           onChange={(e) => setEmail(e.target.value)}
//           required
//           className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />

//         {role === 'vendor' && (
//           <input
//             type="text"
//             placeholder="Business Name"
//             required
//             className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         )}

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
//         >
//           Sign Up
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Signup;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('attendee');
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleSignup = (e) => {
    e.preventDefault();

    // Simulate user creation
    const newUser = { name, email, role };

    // Save user to context
    setUser(newUser);

    // Redirect after signup
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        className="bg-white shadow-md rounded-lg p-8 max-w-md w-full space-y-6"
        onSubmit={handleSignup}
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">Sign Up</h2>

        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-md px-4 py-2"
        />

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-md px-4 py-2"
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-md px-4 py-2"
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-4 py-2"
        >
          <option value="attendee">Attendee</option>
          <option value="organizer">Organizer</option>
          <option value="vendor">Vendor</option>
          <option value="admin">Admin</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
