// import { useNavigate } from 'react-router-dom';
// import Navigation from '../../components/Navigation';
// import Footer from '../../components/Footer';

// function SignupRoleSelector() {
//   const navigate = useNavigate();

//   const handleRoleSelect = (role) => {
//     navigate(`/signup/${role}`);
//   };

//   const roles = [
//     {
//       name: 'Attendee',
//       description: 'Join events, purchase tickets, and enjoy experiences',
//       icon: (
//         <svg className="w-10 h-10 mb-4 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//         </svg>
//       ),
//       color: 'bg-sky-600 hover:bg-sky-700'
//     },
//     {
//       name: 'Vendor',
//       description: 'Sell products or services at events',
//       icon: (
//         <svg className="w-10 h-10 mb-4 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
//         </svg>
//       ),
//       color: 'bg-sky-500 hover:bg-sky-600'
//     },
//     {
//       name: 'Organizer',
//       description: 'Create and manage your own events',
//       icon: (
//         <svg className="w-10 h-10 mb-4 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//         </svg>
//       ),
//       color: 'bg-sky-400 hover:bg-sky-500'
//     },
//     {
//       name: 'Admin',
//       description: 'Manage platform settings and users',
//       icon: (
//         <svg className="w-10 h-10 mb-4 text-sky-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//         </svg>
//       ),
//       color: 'bg-sky-300 hover:bg-sky-400'
//     }
//   ];

//   return (
//     <div className="flex flex-col min-h-screen bg-sky-50">
//       <Navigation />

//       <main className="flex-grow">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//           <div className="text-center mb-12">
//             <h1 className="text-4xl font-bold text-sky-800 mb-4">Join Our Community</h1>
//             <p className="text-xl text-sky-600 max-w-2xl mx-auto">
//               Select your role to get started with your account registration
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {roles.map((role) => (
//               <div
//                 key={role.name}
//                 className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 cursor-pointer border border-sky-100 flex flex-col"
//                 onClick={() => handleRoleSelect(role.name.toLowerCase())}
//               >
//                 <div className="p-8 text-center flex-grow">
//                   <div className="mx-auto flex justify-center">
//                     {role.icon}
//                   </div>
//                   <h3 className="text-2xl font-semibold text-sky-800 mb-2">{role.name}</h3>
//                   <p className="text-sky-600 mb-6">{role.description}</p>
//                 </div>
//                 <div className="px-6 pb-6">
//                   <button
//                     className={`w-full py-3 px-6 ${role.color} text-white rounded-lg font-medium transition-colors duration-300 shadow-sm`}
//                   >
//                     Sign Up as {role.name}
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="mt-16 bg-white rounded-xl shadow-sm p-8 max-w-4xl mx-auto border border-sky-100">
//             <h2 className="text-2xl font-bold text-sky-800 mb-6 text-center">Not Sure Which Role to Choose?</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//               <div>
//                 <h3 className="text-lg font-semibold text-sky-700 mb-4">For Attendees</h3>
//                 <ul className="space-y-3 text-sky-600">
//                   <li className="flex items-start">
//                     <svg className="h-5 w-5 text-sky-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                     </svg>
//                     <span>Discover and attend exciting events</span>
//                   </li>
//                   <li className="flex items-start">
//                     <svg className="h-5 w-5 text-sky-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                     </svg>
//                     <span>Purchase tickets with ease</span>
//                   </li>
//                   <li className="flex items-start">
//                     <svg className="h-5 w-5 text-sky-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                     </svg>
//                     <span>Save favorite events</span>
//                   </li>
//                 </ul>
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold text-sky-700 mb-4">For Organizers & Vendors</h3>
//                 <ul className="space-y-3 text-sky-600">
//                   <li className="flex items-start">
//                     <svg className="h-5 w-5 text-sky-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                     </svg>
//                     <span>Create and manage events</span>
//                   </li>
//                   <li className="flex items-start">
//                     <svg className="h-5 w-5 text-sky-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                     </svg>
//                     <span>Sell tickets or products</span>
//                   </li>
//                   <li className="flex items-start">
//                     <svg className="h-5 w-5 text-sky-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                     </svg>
//                     <span>Access powerful analytics</span>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//             <div className="mt-8 text-center">
//               <p className="text-sky-600 mb-4">Already have an account?</p>
//               <button
//                 onClick={() => navigate('/login')}
//                 className="text-sky-600 font-medium hover:text-sky-800 transition-colors underline"
//               >
//                 Sign in here
//               </button>
//             </div>
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// }

// export default SignupRoleSelector;

import React from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";

function SignupRoleSelector() {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    navigate(`/signup/${role}`);
  };

  const roles = [
    {
      name: "Attendee",
      description:
        "Join events, purchase tickets, and enjoy unforgettable experiences.",
      icon: (
        <svg
          className="w-12 h-12 mb-4 text-sky-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
      color: "bg-sky-600 hover:bg-sky-700",
      recommended: true,
    },
    {
      name: "Vendor",
      description: "Showcase and sell your products or services at events.",
      icon: (
        <svg
          className="w-12 h-12 mb-4 text-sky-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      ),
      color: "bg-sky-500 hover:bg-sky-600",
      recommended: false,
    },
    {
      name: "Organizer",
      description: "Create, manage, and promote your own events with ease.",
      icon: (
        <svg
          className="w-12 h-12 mb-4 text-sky-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
      color: "bg-sky-400 hover:bg-sky-500",
      recommended: false,
    },
    {
      name: "Admin",
      description: "Manage platform settings, users, and advanced features.",
      icon: (
        <svg
          className="w-12 h-12 mb-4 text-sky-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      color: "bg-sky-300 hover:bg-sky-400",
      recommended: false,
    },
  ];

  const testimonials = [
    {
      quote:
        "Signing up as an Organizer was a breeze! The platform is intuitive and powerful.",
      author: "Sarah L., Event Planner",
    },
    {
      quote:
        "As a Vendor, I’ve reached new customers effortlessly. Highly recommend!",
      author: "Michael T., Food Vendor",
    },
    {
      quote:
        "The Attendee experience is seamless, from ticket purchase to event check-in.",
      author: "Emma R., Frequent Attendee",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-sky-50">
      <Navigation />

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Hero Section */}
          <div className="relative bg-gradient-to-r from-sky-800/90 to-sky-600/70 rounded-2xl shadow-lg py-12 mb-16 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Join the EventSphere Community
            </h1>
            <p className="text-xl text-sky-100 max-w-3xl mx-auto mb-6">
              Choose your role to unlock a world of events, opportunities, and
              seamless experiences.
            </p>
            <button
              onClick={() =>
                document
                  .getElementById("roles")
                  .scrollIntoView({ behavior: "smooth" })
              }
              className="bg-white text-sky-600 px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-sky-50 focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition-all duration-300"
            >
              Explore Roles
            </button>
          </div>

          {/* Role Selection */}
          <div id="roles" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Select Your Role
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {roles.map((role) => (
                <div
                  key={role.name}
                  className="relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-sky-200 flex flex-col"
                  onClick={() => handleRoleSelect(role.name.toLowerCase())}
                >
                  {role.recommended && (
                    <span className="absolute top-4 right-4 bg-sky-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Recommended
                    </span>
                  )}
                  <div className="p-8 text-center flex-grow">
                    <div className="mx-auto flex justify-center">
                      {role.icon}
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                      {role.name}
                    </h3>
                    <p className="text-gray-600 text-sm">{role.description}</p>
                  </div>
                  <div className="px-6 pb-6">
                    <button
                      className={`w-full py-3 px-6 ${role.color} text-white rounded-lg font-semibold shadow-md hover:scale-105 focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition-all duration-300`}
                    >
                      Sign Up as {role.name}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Comparison Table */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-16 border border-sky-200">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Role Comparison
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-sky-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                      Feature
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase">
                      Attendee
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase">
                      Vendor
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase">
                      Organizer
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase">
                      Admin
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[
                    {
                      feature: "Attend Events",
                      attendee: true,
                      vendor: true,
                      organizer: true,
                      admin: true,
                    },
                    {
                      feature: "Purchase Tickets",
                      attendee: true,
                      vendor: false,
                      organizer: false,
                      admin: false,
                    },
                    {
                      feature: "Sell Products/Services",
                      attendee: false,
                      vendor: true,
                      organizer: false,
                      admin: false,
                    },
                    {
                      feature: "Create Events",
                      attendee: false,
                      vendor: false,
                      organizer: true,
                      admin: true,
                    },
                    {
                      feature: "Manage Users",
                      attendee: false,
                      vendor: false,
                      organizer: false,
                      admin: true,
                    },
                    {
                      feature: "Access Analytics",
                      attendee: false,
                      vendor: true,
                      organizer: true,
                      admin: true,
                    },
                  ].map((row, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {row.feature}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {row.attendee ? (
                          <svg
                            className="h-5 w-5 text-sky-600 mx-auto"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {row.vendor ? (
                          <svg
                            className="h-5 w-5 text-sky-600 mx-auto"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {row.organizer ? (
                          <svg
                            className="h-5 w-5 text-sky-600 mx-auto"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {row.admin ? (
                          <svg
                            className="h-5 w-5 text-sky-600 mx-auto"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Testimonials Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              What Our Users Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-lg border border-sky-200 hover:shadow-xl transition-all duration-300"
                >
                  <p className="text-gray-600 text-sm mb-4 italic">
                    "{testimonial.quote}"
                  </p>
                  <p className="text-sky-600 font-semibold text-center">
                    {testimonial.author}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Not Sure Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto border border-sky-200">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Not Sure Which Role to Choose?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-sky-700 mb-4">
                  For Attendees
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-sky-600 mr-2 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Discover and attend exciting events
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-sky-600 mr-2 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Purchase tickets with ease
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-sky-600 mr-2 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Save favorite events and get personalized recommendations
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-sky-700 mb-4">
                  For Organizers & Vendors
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-sky-600 mr-2 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Create and manage events or vendor booths
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-sky-600 mr-2 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Sell tickets or products with secure payments
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-sky-600 mr-2 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Access powerful analytics and marketing tools
                  </li>
                </ul>
              </div>
            </div>
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                Need help choosing? Contact our support team.
              </p>
              <button
                onClick={() => navigate("/contact")}
                className="bg-sky-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-sky-700 focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition-all duration-300"
              >
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 bg-sky-600 text-white p-3 rounded-full shadow-lg hover:bg-sky-700 focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition-all duration-300"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>

      <Footer />
    </div>
  );
}

export default SignupRoleSelector;
