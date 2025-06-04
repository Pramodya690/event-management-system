// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import { useState } from "react";

// const Navigation = () => {
//   const { user, setUser } = useAuth();
//   const navigate = useNavigate();
//   const [showDropdown, setShowDropdown] = useState(false);

//   const handleLogout = () => {
//     setUser(null);
//     navigate("/login");
//   };

//   return (
//     <nav className="bg-blue-500 shadow-md">
//       <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
//         {/* Left: Navigation Links */}
//         <ul className="flex space-x-6 text-white font-medium">
//           <li><Link to="/" className="hover:text-blue-100">Home</Link></li>
//           <li><Link to="/find-events" className="hover:text-blue-100">Find Events</Link></li>
//           <li><Link to="/help-centre" className="hover:text-blue-100">Help Centre</Link></li>
//           {user?.role === "organizer" && (
//             <li><Link to="/organizer-dashboard/create" className="hover:text-blue-100">Create Event</Link></li>
//           )}
//         </ul>

//         {/* Right: User Section */}
//         <div className="relative text-white">
//           {!user ? (
//             <div className="space-x-4">
//               <Link to="/login" className="hover:text-blue-100">Login</Link>
//               <Link to="/signup" className="hover:text-blue-100">Sign Up</Link>
//             </div>
//           ) : (
//             <div className="relative">
//               <button
//                 onClick={() => setShowDropdown(!showDropdown)}
//                 className="hover:text-blue-100 font-semibold"
//               >
//                 {user.name} ⌄
//               </button>
//               {showDropdown && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white text-gray-700 shadow-lg rounded-lg z-50">
//                   <Link
//                     to="/organizer-dashboard/profile"
//                     className="block px-4 py-2 hover:bg-gray-100"
//                   >
//                     Update Profile
//                   </Link>
//                   <button
//                     onClick={handleLogout}
//                     className="w-full text-left px-4 py-2 hover:bg-gray-100"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navigation;

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

const Navigation = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Left: Navigation Links */}
        <ul className="flex space-x-8 items-center">
          <li>
            <Link 
              to="/" 
              className="text-white hover:text-blue-100 transition-colors duration-200 font-medium text-sm uppercase tracking-wider"
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/find-events" 
              className="text-white hover:text-blue-100 transition-colors duration-200 font-medium text-sm uppercase tracking-wider"
            >
              Find Events
            </Link>
          </li>
          <li>
            <Link 
              to="/help-centre" 
              className="text-white hover:text-blue-100 transition-colors duration-200 font-medium text-sm uppercase tracking-wider"
            >
              Help Centre
            </Link>
          </li>
          {user?.role === "organizer" && (
            <li>
              <Link 
                to="/organizer-dashboard/create" 
                className="text-white hover:text-blue-100 transition-colors duration-200 font-medium text-sm uppercase tracking-wider"
              >
                Create Event
              </Link>
            </li>
          )}
        </ul>

        {/* Right: User Section */}
        <div className="relative">
          {!user ? (
            <div className="flex space-x-6 items-center">
              <Link 
                to="/login" 
                className="text-white hover:text-blue-100 transition-colors duration-200 font-medium text-sm uppercase tracking-wider"
              >
                Login
              </Link>
              <Link 
                to="/signup-role-selector" 
                className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition-colors duration-200 font-medium text-sm uppercase tracking-wider shadow-sm"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center space-x-2 text-white hover:text-blue-100 transition-colors duration-200"
              >
                <span className="font-medium text-sm uppercase tracking-wider">{user.name}</span>
                <svg 
                  className={`w-4 h-4 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {showDropdown && (
                <div 
                  className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-xl z-50 overflow-hidden border border-gray-100"
                  onMouseLeave={() => setShowDropdown(false)}
                >
                  <Link
                    to="/organizer-dashboard/profile"
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150 border-b border-gray-100"
                  >
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Update Profile
                    </div>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150 flex items-center"
                  >
                    <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;