// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { useState, useRef, useEffect } from "react";

// const Navigation = () => {
//   const { user, setUser } = useAuth();
//   const navigate = useNavigate();
//   const [showDropdown, setShowDropdown] = useState(false);
//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setShowDropdown(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleLogout = () => {
//     setUser(null);
//     navigate("/login");
//   };

//   return (
//     <nav className="bg-sky-500 shadow-lg sticky top-0 z-50">
//       <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <div className="flex-shrink-0 flex items-center">
//             <Link to="/" className="flex items-center group">
//               <span
//                 className="ml-3 text-white font-semibold text-2xl hidden sm:inline tracking-tight"
//                 style={{ fontFamily: "'Inter', sans-serif" }}
//               >
//                 Eventsphere
//               </span>
//             </Link>
//           </div>

//           {/* Nav links */}
//           <div className="hidden md:block">
//             <div className="ml-10 flex items-center space-x-8">
//               <NavLink
//                 to="/"
//                 icon="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
//               >
//                 Home
//               </NavLink>
//               <NavLink
//                 to="/find-events"
//                 icon="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//               >
//                 Discover
//               </NavLink>
//               <NavLink
//                 to="/help-centre"
//                 icon="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//               >
//                 Support
//               </NavLink>
//             </div>
//           </div>

//           {/* Right section */}
//           <div className="flex items-center space-x-4">
//             {user?.role === "organizer" && (
//               <Link
//                 to="/organizer-dashboard/create"
//                 className="hidden md:flex items-center border border-white hover:border-sky-100 text-white px-4 py-2 rounded-md transition-all duration-300 font-medium text-sm shadow-sm hover:shadow-md bg-sky-700 hover:bg-sky-800"
//               >
//                 <svg
//                   className="w-4 h-4 mr-2"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M12 6v6m0 0v6m0-6h6m-6 0H6"
//                   />
//                 </svg>
//                 Create Event
//               </Link>
//             )}

//             {!user ? (
//               <div className="flex space-x-3 items-center">
//                 <Link
//                   to="/login"
//                   className="text-sky-100 hover:text-white transition-colors duration-200 font-medium text-sm px-3 py-2"
//                 >
//                   Sign In
//                 </Link>
//                 <Link
//                   to="/signup-role-selector"
//                   className="bg-white text-sky-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-all duration-300 font-medium text-sm shadow-sm hover:shadow-md border border-gray-200"
//                 >
//                   Join Now
//                 </Link>
//               </div>
//             ) : (
//               <>
//                 {user?.role === "organizer" && (
//                   <Link
//                     to="/organizer-dashboard"
//                     className="hidden md:flex items-center text-sky-100 hover:text-white transition-colors duration-200 font-medium text-sm mr-4"
//                   >
//                     <svg
//                       className="w-5 h-5 mr-2"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
//                       />
//                     </svg>
//                     Dashboard
//                   </Link>
//                 )}

//                 <div className="relative" ref={dropdownRef}>
//                   <button
//                     onClick={() => setShowDropdown(!showDropdown)}
//                     className="flex items-center space-x-2 text-white hover:text-sky-100 transition-colors duration-200 group"
//                     aria-expanded={showDropdown}
//                     aria-label="User menu"
//                   >
//                     <div className="h-9 w-9 rounded-full bg-sky-700 flex items-center justify-center text-white font-medium shadow-sm border border-sky-500">
//                       {user.name.charAt(0).toUpperCase()}
//                     </div>
//                     <span className="font-medium text-sm hidden md:inline">
//                       {user.name}
//                     </span>
//                     <svg
//                       className={`w-4 h-4 transition-transform duration-200 ${
//                         showDropdown ? "rotate-180" : ""
//                       }`}
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M19 9l-7 7-7-7"
//                       />
//                     </svg>
//                   </button>

//                   {showDropdown && (
//                     <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-xl z-50 overflow-hidden border border-gray-200">
//                       <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
//                         <p className="text-sm font-medium text-gray-900">
//                           {user.name}
//                         </p>
//                         <p className="text-xs text-gray-500 truncate">
//                           {user.email}
//                         </p>
//                       </div>

//                       <Link
//                         to="/organizer-profile"
//                         className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150 border-b border-gray-200"
//                         onClick={() => setShowDropdown(false)}
//                       >
//                         <div className="flex items-center">
//                           <svg
//                             className="w-5 h-5 mr-2 text-sky-600"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2}
//                               d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                             />
//                           </svg>
//                           My Profile
//                         </div>
//                       </Link>

//                       {user?.role === "organizer" && (
//                         <Link
//                           to="/organizer-dashboard"
//                           className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150 border-b border-gray-200"
//                           onClick={() => setShowDropdown(false)}
//                         >
//                           <div className="flex items-center">
//                             <svg
//                               className="w-5 h-5 mr-2 text-sky-600"
//                               fill="none"
//                               stroke="currentColor"
//                               viewBox="0 0 24 24"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth={2}
//                                 d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
//                               />
//                             </svg>
//                             Organizer Dashboard
//                           </div>
//                         </Link>
//                       )}

//                       <button
//                         onClick={handleLogout}
//                         className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150 flex items-center"
//                       >
//                         <svg
//                           className="w-5 h-5 mr-2 text-sky-600"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
//                           />
//                         </svg>
//                         Sign Out
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// // Reusable NavLink component with hover effect
// const NavLink = ({ to, icon, children }) => (
//   <Link
//     to={to}
//     className="relative text-white hover:text-sky-100 transition-colors duration-200 font-medium text-sm group"
//   >
//     <div className="flex items-center py-2">
//       <svg
//         className="w-5 h-5 mr-2"
//         fill="none"
//         stroke="currentColor"
//         viewBox="0 0 24 24"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth={2}
//           d={icon}
//         />
//       </svg>
//       {children}
//     </div>
//     <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-sky-400 transition-all duration-300 group-hover:w-full"></span>
//   </Link>
// );

// export default Navigation;

import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useRef, useEffect } from "react";

const Navigation = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setUser(null);
    setShowDropdown(false);
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-sky-600 to-sky-500 shadow-lg border-b border-sky-600/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="group">
              <span
                className="text-white font-bold text-2xl md:text-3xl tracking-tight group-hover:text-sky-100 transition-colors duration-300"
                style={{
                  fontFamily:
                    "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                }}
              >
                Eventsphere
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink
              to="/"
              icon="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              currentPath={location.pathname}
            >
              Home
            </NavLink>
            <NavLink
              to="/find-events"
              icon="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              currentPath={location.pathname}
            >
              Discover
            </NavLink>
            <NavLink
              to="/pricing"
              icon="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c-2.209 0-4 1.791-4 4s1.791 4 4 4 4-1.791 4-4-1.791-4-4-4z"
              currentPath={location.pathname}
            >
              Pricing
            </NavLink>
            {user?.role === "attendee" && (
              <NavLink
                to="/tickets-bought"
                icon="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                currentPath={location.pathname}
              >
                Tickets Bought
              </NavLink>
            )}
            <NavLink
              to="/help-centre"
              icon="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              currentPath={location.pathname}
            >
              Support
            </NavLink>
            <NavLink
              to="/contact"
              icon="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              currentPath={location.pathname}
            >
              Contact
            </NavLink>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {user?.role === "organizer" && (
              <Link
                to="/organizer-dashboard/create"
                className="hidden md:flex items-center bg-sky-700 text-white px-4 py-2 rounded-lg font-semibold text-sm shadow-md hover:bg-sky-800 hover:shadow-lg hover:scale-105 focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition-all duration-300"
              >
                <svg
                  className="w-6 h-6 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Create Event
              </Link>
            )}

            {!user ? (
              <div className="hidden md:flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-sky-100 hover:text-white font-semibold text-sm px-3 py-2 transition-colors duration-300"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup-role-selector"
                  className="bg-white text-sky-700 px-4 py-2 rounded-lg font-semibold text-sm shadow-md hover:bg-sky-50 hover:shadow-lg hover:scale-105 focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition-all duration-300 border border-sky-200"
                >
                  Join Now
                </Link>
              </div>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-2 text-white hover:text-sky-100 font-semibold text-sm transition-all duration-300 focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 rounded-md"
                  aria-expanded={showDropdown}
                  aria-label="User menu"
                >
                  <div className="h-10 w-10 rounded-full bg-sky-700 flex items-center justify-center text-white font-bold text-lg shadow-md border border-sky-400">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden md:inline">{user.name}</span>
                  <svg
                    className={`w-5 h-5 transition-transform duration-300 ${
                      showDropdown ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl z-50 border border-sky-200 animate-fadeIn">
                    <div className="px-4 py-4 border-b border-gray-200 bg-sky-50">
                      <p className="text-sm font-semibold text-gray-800">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user.email}
                      </p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-sky-50 hover:text-sky-700 transition-all duration-200"
                    >
                      <svg
                        className="w-5 h-5 mr-2 text-sky-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out;
          }
        `}
      </style>
    </nav>
  );
};

// Reusable NavLink component with hover and active effects
const NavLink = ({ to, icon, children, currentPath }) => (
  <Link
    to={to}
    className={`relative flex items-center text-white font-semibold text-sm transition-all duration-300 group ${
      currentPath === to ? "text-sky-100" : "hover:text-sky-100 hover:scale-105"
    }`}
  >
    <div className="flex items-center py-2">
      <svg
        className="w-6 h-6 mr-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d={icon}
        />
      </svg>
      {children}
    </div>
    <span
      className={`absolute bottom-0 left-0 h-0.5 bg-sky-300 transition-all duration-300 ${
        currentPath === to ? "w-full" : "w-0 group-hover:w-full"
      }`}
    ></span>
  </Link>
);

export default Navigation;
