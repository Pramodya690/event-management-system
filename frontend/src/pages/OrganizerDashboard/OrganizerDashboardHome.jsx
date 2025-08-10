// import React from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   FiPlus,
//   FiZap,
//   FiUser,
//   FiCalendar,
//   FiBarChart2,
//   FiHelpCircle,
//   FiArrowRight,
// } from "react-icons/fi";

// const OrganizerDashboardHome = () => {
//   const navigate = useNavigate();

//   const handleCreateEventClick = () => {
//     navigate("/organizer-dashboard/create/Event");
//   };

//   const stats = [
//     {
//       value: "12,450",
//       label: "Total attendees",
//       icon: <FiUser className="text-sky-600" />,
//     },
//     {
//       value: "24",
//       label: "Upcoming events",
//       icon: <FiCalendar className="text-sky-600" />,
//     },
//     {
//       value: "89%",
//       label: "Satisfaction rate",
//       icon: <FiBarChart2 className="text-sky-600" />,
//     },
//   ];

//   const quickLinks = [
//     { title: "Help Center", icon: <FiHelpCircle />, link: "/help-centre" },
//     { title: "Pricing", icon: <FiBarChart2 />, link: "/pricing" },
//   ];

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       {/* Header Section */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
//         <div>
//           <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
//             Event Dashboard
//           </h1>
//           <p className="text-lg text-gray-600 mt-2">
//             Welcome back! Here's what's happening with your events.
//           </p>
//         </div>
//         <div className="mt-4 md:mt-0">
//           <button
//             onClick={handleCreateEventClick}
//             className="flex items-center bg-sky-500 hover:bg-sky-600 text-white font-medium rounded-lg px-6 py-3 transition-colors duration-200"
//           >
//             <FiPlus className="mr-2" />
//             Create New Event
//           </button>
//         </div>
//       </div>

//       {/* Stats Overview */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
//         {stats.map((stat, index) => (
//           <div
//             key={index}
//             className="bg-white rounded-xl shadow-sm p-6 flex items-center"
//           >
//             <div className="p-3 bg-sky-50 rounded-lg mr-4">{stat.icon}</div>
//             <div>
//               <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
//               <p className="text-gray-600">{stat.label}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Main Action Cards */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
//         {/* Create Event Card */}
//         <div className="bg-gradient-to-br from-gray-50 to-sky-100 rounded-xl shadow-md p-8 flex flex-col border border-sky-200">
//           <div className="p-3 bg-sky-50 rounded-lg w-12 h-12 flex items-center justify-center mb-6">
//             <FiPlus className="text-sky-600 text-xl" />
//           </div>
//           <h2 className="text-xl font-semibold mb-3 text-gray-900">
//             Create Event Manually
//           </h2>
//           <p className="text-gray-600 mb-6 flex-grow">
//             Full control over every detail of your event setup, perfect for
//             complex or custom events.
//           </p>
//           <button
//             onClick={handleCreateEventClick}
//             className="self-start bg-sky-500 hover:bg-sky-600 text-white font-medium rounded-lg px-5 py-2.5 transition-colors duration-200 flex items-center"
//           >
//             Get Started
//             <FiArrowRight className="ml-2" />
//           </button>
//         </div>

//         {/* Profile Completion Card */}
//         <div className="bg-gradient-to-br from-gray-50 to-sky-100 rounded-xl shadow-md p-8 flex flex-col border border-sky-200">
//           <h3 className="text-lg font-semibold text-gray-900 mb-2">
//             Complete Your Profile
//           </h3>
//           <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
//             <div
//               className="bg-sky-600 h-2 rounded-full"
//               style={{ width: "65%" }}
//             ></div>
//           </div>
//           <p className="text-gray-700 text-sm mb-6">
//             A complete profile increases event discoverability by 40% and builds
//             attendee trust.
//           </p>
//           <a
//             href="/organizer-profile"
//             className="inline-flex items-center text-sky-600 font-medium hover:text-sky-800 transition-colors duration-200"
//           >
//             Complete Profile
//             <FiArrowRight className="ml-2" />
//           </a>
//         </div>
//       </div>

//       {/* Recent Events & Quick Actions */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
//         {/* Recent Events */}
//         <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-xl font-semibold text-gray-900">
//               Recent Events
//             </h2>
//             <a href="/events" className="text-sm text-sky-600 hover:underline">
//               View All
//             </a>
//           </div>
//           <div className="space-y-4">
//             {[1, 2, 3].map((item) => (
//               <div
//                 key={item}
//                 className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors duration-150"
//               >
//                 <div className="flex items-center">
//                   <div className="bg-sky-100 text-sky-800 p-2 rounded-lg mr-4">
//                     <FiCalendar />
//                   </div>
//                   <div>
//                     <h3 className="font-medium text-gray-900">
//                       Tech Event 2023
//                     </h3>
//                     <p className="text-sm text-gray-500">
//                       October 15, 2023 • 450 attendees
//                     </p>
//                   </div>
//                 </div>
//                 <button className="text-sky-600 hover:text-sky-800 p-2">
//                   <FiArrowRight />
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Quick Links */}
//         <div className="bg-white rounded-xl shadow-sm p-6">
//           <h2 className="text-xl font-semibold text-gray-900 mb-6">
//             Quick Links
//           </h2>
//           <div className="space-y-3">
//             {quickLinks.map((link, index) => (
//               <a
//                 key={index}
//                 href={link.link}
//                 className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors duration-150"
//               >
//                 <span className="bg-gray-100 text-gray-700 p-2 rounded-lg mr-3">
//                   {link.icon}
//                 </span>
//                 <span className="font-medium text-gray-700">{link.title}</span>
//                 <FiArrowRight className="ml-auto text-gray-400" />
//               </a>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Success Story */}
//       <div className="bg-white rounded-xl shadow-sm overflow-hidden">
//         <div className="md:flex">
//           <div className="md:w-1/3">
//             <img
//               src="/man.jpg"
//               alt="Success story"
//               className="w-full h-full object-cover"
//             />
//           </div>
//           <div className="p-8 md:w-2/3">
//             <div className="uppercase tracking-wide text-sm text-sky-600 font-semibold mb-1">
//               Featured Organizer
//             </div>
//             <h2 className="text-2xl font-bold text-gray-900 mb-4">
//               Meet Prashant from TechSummit
//             </h2>
//             <blockquote className="text-gray-700 mb-6 border-l-4 border-sky-200 pl-4 py-1">
//               "Using this platform transformed how we manage our annual
//               Event. We saw a 40% increase in attendance and saved dozens
//               of hours in administrative work."
//             </blockquote>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrganizerDashboardHome;

import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FiPlus,
  FiUser,
  FiCalendar,
  FiBarChart2,
  FiHelpCircle,
  FiArrowRight,
} from "react-icons/fi";
import Footer from "../../components/Footer.jsx";

const OrganizerDashboardHome = () => {
  const navigate = useNavigate();

  const handleCreateEventClick = () => {
    navigate("/organizer-dashboard/create");
  };

  const stats = [
    {
      value: "12,450",
      label: "Total Attendees",
      icon: <FiUser className="text-sky-600 text-3xl" />,
    },
    {
      value: "24",
      label: "Upcoming Events",
      icon: <FiCalendar className="text-sky-600 text-3xl" />,
    },
    // {
    //   value: "89%",
    //   label: "Satisfaction Rate",
    //   icon: <FiBarChart2 className="text-sky-600 text-3xl" />,
    // },
  ];

  const quickLinks = [
    {
      title: "Help Center",
      icon: <FiHelpCircle className="text-sky-600 text-xl" />,
      link: "/help",
    },
    {
      title: "Pricing",
      icon: <FiBarChart2 className="text-sky-600 text-xl" />,
      link: "/pricing",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-sky-50">
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <h1
              className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight"
              style={{
                fontFamily:
                  "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
              }}
            >
              Event Dashboard
            </h1>
            <p className="text-lg text-gray-600 mt-2">
              Welcome back! Manage your Events and track their success.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <button
              onClick={handleCreateEventClick}
              className="flex items-center bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-lg px-6 py-3 shadow-md focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition-all duration-300"
              aria-label="Create new Event"
            >
              <FiPlus className="mr-2" />
              Create New Event
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg border border-sky-200 p-6 flex items-center hover:shadow-xl transition-all duration-300"
            >
              <div className="p-3 bg-sky-50 rounded-lg mr-4">{stat.icon}</div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Create Event Card */}
          <div className="bg-white rounded-xl shadow-lg border border-sky-200 p-8 flex flex-col hover:shadow-xl transition-all duration-300">
            <div className="p-3 bg-sky-50 rounded-lg w-12 h-12 flex items-center justify-center mb-6">
              <FiPlus className="text-sky-600 text-xl" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Create Event
            </h2>
            <p className="text-gray-600 mb-6 flex-grow">
              Full control over every detail of your Event setup, perfect
              for professional events.
            </p>
            <button
              onClick={handleCreateEventClick}
              className="self-start bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-lg px-5 py-2.5 shadow-md focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition-all duration-300 flex items-center"
              aria-label="Start creating Event"
            >
              Get Started
              <FiArrowRight className="ml-2" />
            </button>
          </div>

          {/* Profile Completion Card */}
          <div className="bg-white rounded-xl shadow-lg border border-sky-200 p-8 flex flex-col hover:shadow-xl transition-all duration-300">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Complete Your Profile
            </h3>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
              <div
                className="bg-sky-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: "65%" }}
              ></div>
            </div>
            <p className="text-gray-600 text-sm mb-6">
              A complete profile increases Event discoverability by 40% and
              builds attendee trust.
            </p>
            <a
              href="/organizer-profile"
              className="inline-flex items-center text-sky-600 font-semibold hover:text-sky-700 hover:underline transition-all duration-300"
              aria-label="Complete your profile"
            >
              Complete Profile
              <FiArrowRight className="ml-2" />
            </a>
          </div>
        </div>

        {/* Recent Events & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Recent Events */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg border border-sky-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Recent Events
              </h2>
              <a
                href="/events"
                className="text-sm text-sky-600 font-semibold hover:text-sky-700 hover:underline transition-all duration-300"
                aria-label="View all Events"
              >
                View All
              </a>
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between p-4 hover:bg-sky-50 rounded-lg transition-all duration-300"
                >
                  <div className="flex items-center">
                    <div className="bg-sky-50 text-sky-600 p-2 rounded-lg mr-4">
                      <FiCalendar />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Tech Event 2023
                      </h3>
                      <p className="text-sm text-gray-600">
                        October 15, 2023 • 450 attendees
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate("/events")}
                    className="text-sky-600 hover:text-sky-700 p-2"
                    aria-label="View Event details"
                  >
                    <FiArrowRight />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white rounded-xl shadow-lg border border-sky-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Quick Links
            </h2>
            <div className="space-y-3">
              {quickLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.link}
                  className="flex items-center p-3 hover:bg-sky-50 rounded-lg transition-all duration-300"
                  aria-label={link.title}
                >
                  <span className="bg-sky-50 text-sky-600 p-2 rounded-lg mr-3">
                    {link.icon}
                  </span>
                  <span className="font-semibold text-gray-700">
                    {link.title}
                  </span>
                  <FiArrowRight className="ml-auto text-sky-600" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Success Story */}
        <div className="bg-white rounded-xl shadow-lg border border-sky-200 overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3 h-80 relative">
              <img
                src="/man.jpg"
                alt="Success story"
                className="w-full h-full object-cover"
                onError={(e) =>
                  (e.target.src =
                    "https://via.placeholder.com/400x320?text=Organizer+Image")
                }
              />
              <div className="absolute inset-0 bg-gradient-to-r from-sky-600/60 to-transparent"></div>
            </div>
            <div className="p-8 md:w-2/3">
              <div className="uppercase tracking-wide text-sm text-sky-600 font-semibold mb-1">
                Featured Organizer
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Meet Prashant from TechSummit
              </h2>
              <blockquote className="text-gray-600 mb-6 border-l-4 border-sky-200 pl-4 py-1">
                "Using Eventsphere transformed how we manage our annual
                Event. We saw a 40% increase in attendance and saved dozens
                of hours in administrative work."
              </blockquote>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrganizerDashboardHome;