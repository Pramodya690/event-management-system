// // import React from 'react';
// // import { useNavigate } from 'react-router-dom';

// // const OrganizerCreateEventLanding = () => {
// //   const navigate = useNavigate();

// //   const options = [

// //     {
// //       title: 'Create Conference',
// //       description: 'Bring professionals together to share knowledge.',
// //       image: '/conference.jpg',
// //       route: '/organizer-dashboard/create/conference',
// //     },
// //     {
// //       title: 'Create Exhibition',
// //       description: 'Showcase art, science, tech, and more.',
// //       image: '/exhibition.jpg',
// //       route: '/organizer-dashboard/create/exhibition',
// //     },
// //   ];

// //   return (
// //     <div className="min-h-screen bg-gray-50 py-12 px-6 flex flex-col items-center">
// //       <h1 className="text-3xl font-bold mb-10 text-center">
// //         What type of event would you like to create?
// //       </h1>

// //       <div className="flex flex-wrap justify-center gap-6 w-full max-w-6xl">
// //         {options.map(({ title, description, image, route }) => (
// //           <div
// //             key={route}
// //             className="bg-white rounded-xl shadow-md p-6 w-full sm:w-[300px] flex flex-col items-center text-center hover:shadow-lg transition"
// //           >
// //             <img
// //               src={image}
// //               alt={title}
// //               className="w-full h-44 object-cover rounded-md mb-4"
// //             />
// //             <h3 className="text-xl font-semibold mb-2">{title}</h3>
// //             <p className="text-gray-600 mb-6">{description}</p>
// //             <button
// //               onClick={() => navigate(route)}
// //               className="bg-sky-600 text-white px-6 py-2 rounded hover:bg-sky-700 transition"
// //             >
// //               Start Building
// //             </button>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default OrganizerCreateEventLanding;
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FiArrowRight, FiInfo, FiCalendar, FiUsers, FiSettings } from 'react-icons/fi';

// const OrganizerCreateEventLanding = () => {
//   const navigate = useNavigate();

//   const options = [

//     {
//       title: 'Create Exhibition',
//       description: 'Showcase art, science, technology, and more to your audience.',
//       image: '/exhibition.png',
//       route: '/organizer-dashboard/create/exhibition',
//       icon: <FiCalendar className="text-sky-600 text-2xl mb-2" />
//     },

//   ];

//   const features = [
//     {
//       title: "Easy Setup",
//       description: "Get your event page ready in minutes with our intuitive builder",
//       icon: <FiSettings className="text-sky-600 text-xl" />
//     },
//     {
//       title: "Marketing Tools",
//       description: "Promote your event with built-in email and social tools",
//       icon: <FiUsers className="text-sky-600 text-xl" />
//     },
//     {
//       title: "Ticketing",
//       description: "Sell tickets and manage registrations seamlessly",
//       icon: <FiCalendar className="text-sky-600 text-xl" />
//     },
//     {
//       title: "Analytics",
//       description: "Track attendance and engagement with real-time data",
//       icon: <FiInfo className="text-sky-600 text-xl" />
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header Section */}
//         <div className="text-center mb-12">
//           <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//             What type of event would you like to create?
//           </h1>
//           <p className="text-lg text-gray-600 max-w-3xl mx-auto">
//             Select from our professionally designed templates or start from scratch.
//             We'll guide you through every step of the process.
//           </p>
//         </div>

//         {/* Event Type Cards */}
//         <div className="flex flex-wrap justify-center gap-8 mb-16">
//           {options.map(({ title, description, image, route, icon }) => (
//             <div
//               key={route}
//               className="bg-white rounded-xl shadow-md overflow-hidden w-full sm:w-[320px] hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
//             >
//               <div className="relative h-48 overflow-hidden">
//                 <img
//                   src={image}
//                   alt={title}
//                   className="w-full h-full object-cover"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-sky/60 to-transparent"></div>
//               </div>
//               <div className="p-6 text-center">
//                 <div className="flex justify-center">
//                   {icon}
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
//                 <p className="text-gray-600 mb-6">{description}</p>
//                 <button
//                   onClick={() => navigate(route)}
//                   className="flex items-center justify-center space-x-2 bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-lg w-full transition-colors duration-300"
//                 >
//                   <span>Start Building</span>
//                   <FiArrowRight className="text-lg" />
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Divider */}
//         <div className="relative my-12">
//           <div className="absolute inset-0 flex items-center" aria-hidden="true">
//             <div className="w-full border-t border-gray-300"></div>
//           </div>
//           <div className="relative flex justify-center">
//             <span className="px-4 bg-gray-50 text-lg font-medium text-gray-500">
//               Why choose Eventsphere?
//             </span>
//           </div>
//         </div>

//         {/* Features Section */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
//           {features.map((feature, index) => (
//             <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition">
//               <div className="flex items-center mb-4">
//                 <div className="p-2 rounded-full bg-sky-50 mr-4">
//                   {feature.icon}
//                 </div>
//                 <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
//               </div>
//               <p className="text-gray-600 pl-12">{feature.description}</p>
//             </div>
//           ))}
//         </div>

//         {/* CTA Section */}
//         <div className="bg-gradient-to-r from-sky-400 to-sky-800 rounded-xl p-8 md:p-12 text-center">
//           <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
//             Need help deciding?
//           </h2>
//           <p className="text-sky-100 mb-6 max-w-2xl mx-auto">
//             Our event specialists can help you choose the right format and guide you through
//             the setup process to ensure your event is a success.
//           </p>
//           <button
//             onClick={() => navigate('/contact-support')}
//             className="bg-white text-sky-700 hover:bg-sky-50 px-6 py-3 rounded-lg font-medium transition-colors duration-300 inline-flex items-center"
//           >
//             <span>Contact Our Team</span>
//             <FiArrowRight className="ml-2" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrganizerCreateEventLanding;

import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowRight,
  FiInfo,
  FiCalendar,
  FiUsers,
  FiSettings,
} from "react-icons/fi";
import Navigation from "../../components/Navigation.jsx";
import Footer from "../../components/Footer.jsx";

const OrganizerCreateEventLanding = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "Easy Setup",
      description:
        "Get your conference page ready in minutes with our intuitive builder.",
      icon: <FiSettings className="text-sky-600 text-3xl" />,
    },
    {
      title: "Marketing Tools",
      description:
        "Promote your conference with built-in email and social tools.",
      icon: <FiUsers className="text-sky-600 text-3xl" />,
    },
    {
      title: "Ticketing",
      description: "Sell tickets and manage registrations seamlessly.",
      icon: <FiCalendar className="text-sky-600 text-3xl" />,
    },
    {
      title: "Analytics",
      description: "Track attendance and engagement with real-time data.",
      icon: <FiInfo className="text-sky-600 text-3xl" />,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-sky-50">
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="bg-white rounded-xl shadow-lg border border-sky-200 mb-16 overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-8 flex flex-col justify-center">
              <h1
                className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
                style={{
                  fontFamily:
                    "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                }}
              >
                Create Your Event
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                Bring professionals together to share knowledge and network. Our
                platform guides you through every step to create a successful
                conference.
              </p>
              <button
                onClick={() =>
                  navigate("/organizer-dashboard/create/conference")
                }
                className="flex items-center justify-center space-x-2 bg-sky-500 hover:bg-sky-600 text-white px-8 py-3 rounded-lg font-semibold shadow-md focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition-all duration-300 w-full md:w-auto"
                aria-label="Start building your conference"
              >
                <span>Start Building</span>
                <FiArrowRight className="text-lg" />
              </button>
            </div>
            <div className="md:w-1/2 h-96 md:h-auto">
              <img
                src="/conference.png"
                alt="Create Conference"
                className="w-full h-full object-cover"
                onError={(e) =>
                  (e.target.src =
                    "https://via.placeholder.com/600x384?text=Conference+Image")
                }
              />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="relative my-12">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-sky-200"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-4 bg-sky-50 text-lg font-semibold text-gray-600">
              Why choose Eventsphere?
            </span>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md border border-sky-200 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full bg-sky-50 mr-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {feature.title}
                </h3>
              </div>
              <p className="text-gray-600 pl-12">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-sky-600 to-sky-500 rounded-xl p-8 md:p-12 text-center">
          <h2
            className="text-2xl md:text-3xl font-bold text-white mb-4"
            style={{
              fontFamily:
                "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
            }}
          >
            Need help planning your conference?
          </h2>
          <p className="text-sky-100 mb-6 max-w-2xl mx-auto">
            Our event specialists are here to guide you through the setup
            process and ensure your conference is a success.
          </p>
          <button
            onClick={() => navigate("/contact")}
            className="bg-white text-sky-700 hover:bg-sky-50 px-8 py-3 rounded-lg font-semibold shadow-md focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition-all duration-300 inline-flex items-center"
            aria-label="Contact our team"
          >
            <span>Contact Our Team</span>
            <FiArrowRight className="ml-2" />
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrganizerCreateEventLanding;