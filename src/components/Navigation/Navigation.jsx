// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
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
//     <nav className="bg-blue-500 shadow-lg sticky top-0 z-50">
//       <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <div className="flex-shrink-0 flex items-center">
//             <Link to="/" className="flex items-center group">
//               <span className="ml-3 text-white font-semibold text-3xl hidden sm:inline" style={{ fontFamily: "'Poppins', sans-serif" }}>
//                 Eventsphere
//               </span>
//             </Link>
//           </div>

//           {/* Nav links */}
//           <div className="hidden md:block">
//             <div className="ml-10 flex items-center space-x-8 ">
//               <NavLink to="/" icon="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6">
//                 Home
//               </NavLink>
//               <NavLink to="/find-events" icon="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z">
//                 Discover
//               </NavLink>
//               <NavLink to="/help-centre" icon="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z">
//                 Support
//               </NavLink>
//             </div>
//           </div>

//           {/* Right section */}
//           <div className="flex items-center space-x-4">
//             {user?.role === "organizer" && (
//               <Link
//                 to="/organizer-dashboard/create"
//                 className="hidden md:flex items-center border border-white hover:border-white/80 text-white px-4 py-2 rounded-md transition-all duration-300 font-medium text-sm shadow-sm hover:shadow-md bg-transparent"
//               >
//                 <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                 </svg>
//                 Create Event
//               </Link>
//             )}

//             {!user ? (
//               <div className="flex space-x-3 items-center">
//                 <Link
//                   to="/login"
//                   className="text-blue-100 hover:text-white transition-colors duration-200 font-medium text-m px-3 py-2"
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/signup-role-selector"
//                   className="bg-white text-blue-800 px-4 py-2 rounded-md hover:bg-blue-50 transition-all duration-300 font-medium text-sm shadow-sm hover:shadow-md"
//                 >
//                   Join Now
//                 </Link>
//               </div>
//             ) : (
//               <>
//                 {user?.role === "organizer" && (
//                   <Link
//                     to="/organizer-dashboard"
//                     className="hidden md:flex items-center text-blue-100 hover:text-white transition-colors duration-200 font-medium text-m mr-4"
//                   >
//                     <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
//                     </svg>
//                     Go to Dashboard
//                   </Link>
//                 )}

//                 <div className="relative" ref={dropdownRef}>
//                   <button
//                     onClick={() => setShowDropdown(!showDropdown)}
//                     className="flex items-center space-x-2 text-white hover:text-blue-200 transition-colors duration-200 group"
//                     aria-expanded={showDropdown}
//                     aria-label="User menu"
//                   >
//                     <div className="h-9 w-9 rounded-full bg-blue-700 flex items-center justify-center text-white font-medium shadow-sm">
//                       {user.name.charAt(0).toUpperCase()}
//                     </div>
//                     <span className="font-medium text-sm hidden md:inline">{user.name}</span>
//                     <svg
//                       className={`w-4 h-4 transition-transform duration-200 ${showDropdown ? "rotate-180" : ""}`}
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                     </svg>
//                   </button>

//                   {showDropdown && (
//                     <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-xl z-50 overflow-hidden border border-gray-200">
//                       <div className="px-4 py-3 border-b border-gray-200 bg-blue-50">
//                         <p className="text-sm font-semibold text-gray-900">{user.name}</p>
//                         <p className="text-xs text-gray-600 truncate">{user.email}</p>
//                       </div>

//                       <Link
//                         to="/profile"
//                         className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 transition-colors duration-150 border-b border-gray-200"
//                         onClick={() => setShowDropdown(false)}
//                       >
//                         <div className="flex items-center">
//                           <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                           </svg>
//                           My Profile
//                         </div>
//                       </Link>

//                       {user?.role === "organizer" && (
//                         <Link
//                           to="/organizer-profile"
//                           className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 transition-colors duration-150 border-b border-gray-200"
//                           onClick={() => setShowDropdown(false)}
//                         >
//                           <div className="flex items-center">
//                             <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
//                             </svg>
//                             Organizer Dashboard
//                           </div>
//                         </Link>
//                       )}

//                       <button
//                         onClick={handleLogout}
//                         className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 transition-colors duration-150 flex items-center"
//                       >
//                         <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
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
//     className="relative text-white hover:text-blue-200 transition-colors duration-200 font-medium text-sm group"
//   >
//     <div className="flex items-center py-2">
//       <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
//       </svg>
//       {children}
//     </div>
//     <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-300 transition-all duration-300 group-hover:w-full"></span>
//   </Link>
// );

// export default Navigation;

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState, useRef, useEffect } from "react";

const Navigation = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
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
    navigate("/login");
  };

  return (
    <nav className="bg-sky-500 shadow-lg sticky top-0 z-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center group">
              <span className="ml-3 text-white font-semibold text-2xl hidden sm:inline tracking-tight" style={{ fontFamily: "'Inter', sans-serif" }}>
                Eventsphere
              </span>
            </Link>
          </div>

          {/* Nav links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <NavLink to="/" icon="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6">
                Home
              </NavLink>
              <NavLink to="/find-events" icon="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z">
                Discover
              </NavLink>
              <NavLink to="/help-centre" icon="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z">
                Support
              </NavLink>
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            {user?.role === "organizer" && (
              <Link
                to="/organizer-dashboard/create"
                className="hidden md:flex items-center border border-white hover:border-sky-100 text-white px-4 py-2 rounded-md transition-all duration-300 font-medium text-sm shadow-sm hover:shadow-md bg-sky-700 hover:bg-sky-800"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Create Event
              </Link>
            )}

            {!user ? (
              <div className="flex space-x-3 items-center">
                <Link
                  to="/login"
                  className="text-sky-100 hover:text-white transition-colors duration-200 font-medium text-sm px-3 py-2"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup-role-selector"
                  className="bg-white text-sky-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-all duration-300 font-medium text-sm shadow-sm hover:shadow-md border border-gray-200"
                >
                  Join Now
                </Link>
              </div>
            ) : (
              <>
                {user?.role === "organizer" && (
                  <Link
                    to="/organizer-dashboard"
                    className="hidden md:flex items-center text-sky-100 hover:text-white transition-colors duration-200 font-medium text-sm mr-4"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    Dashboard
                  </Link>
                )}

                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center space-x-2 text-white hover:text-sky-100 transition-colors duration-200 group"
                    aria-expanded={showDropdown}
                    aria-label="User menu"
                  >
                    <div className="h-9 w-9 rounded-full bg-sky-700 flex items-center justify-center text-white font-medium shadow-sm border border-sky-500">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium text-sm hidden md:inline">{user.name}</span>
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${showDropdown ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-xl z-50 overflow-hidden border border-gray-200">
                      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>

                      <Link
                        to="/profile"
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150 border-b border-gray-200"
                        onClick={() => setShowDropdown(false)}
                      >
                        <div className="flex items-center">
                          <svg className="w-5 h-5 mr-2 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          My Profile
                        </div>
                      </Link>

                      {user?.role === "organizer" && (
                        <Link
                          to="/organizer-profile"
                          className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150 border-b border-gray-200"
                          onClick={() => setShowDropdown(false)}
                        >
                          <div className="flex items-center">
                            <svg className="w-5 h-5 mr-2 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                            Organizer Dashboard
                          </div>
                        </Link>
                      )}

                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150 flex items-center"
                      >
                        <svg className="w-5 h-5 mr-2 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

// Reusable NavLink component with hover effect
const NavLink = ({ to, icon, children }) => (
  <Link
    to={to}
    className="relative text-white hover:text-sky-100 transition-colors duration-200 font-medium text-sm group"
  >
    <div className="flex items-center py-2">
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
      </svg>
      {children}
    </div>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-sky-400 transition-all duration-300 group-hover:w-full"></span>
  </Link>
);

export default Navigation;