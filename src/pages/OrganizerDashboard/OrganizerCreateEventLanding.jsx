// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const OrganizerCreateEventLanding = () => {
//   const navigate = useNavigate();

//   const options = [

//     {
//       title: 'Create Conference',
//       description: 'Bring professionals together to share knowledge.',
//       image: '/conference.jpg',
//       route: '/organizer-dashboard/create/conference',
//     },
//     {
//       title: 'Create Exhibition',
//       description: 'Showcase art, science, tech, and more.',
//       image: '/exhibition.jpg',
//       route: '/organizer-dashboard/create/exhibition',
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-6 flex flex-col items-center">
//       <h1 className="text-3xl font-bold mb-10 text-center">
//         What type of event would you like to create?
//       </h1>

//       <div className="flex flex-wrap justify-center gap-6 w-full max-w-6xl">
//         {options.map(({ title, description, image, route }) => (
//           <div
//             key={route}
//             className="bg-white rounded-xl shadow-md p-6 w-full sm:w-[300px] flex flex-col items-center text-center hover:shadow-lg transition"
//           >
//             <img
//               src={image}
//               alt={title}
//               className="w-full h-44 object-cover rounded-md mb-4"
//             />
//             <h3 className="text-xl font-semibold mb-2">{title}</h3>
//             <p className="text-gray-600 mb-6">{description}</p>
//             <button
//               onClick={() => navigate(route)}
//               className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
//             >
//               Start Building
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default OrganizerCreateEventLanding;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight, FiInfo, FiCalendar, FiUsers, FiSettings } from 'react-icons/fi';

const OrganizerCreateEventLanding = () => {
  const navigate = useNavigate();

  const options = [
    {
      title: 'Create Conference',
      description: 'Bring professionals together to share knowledge and network.',
      image: '/conference.png',
      route: '/organizer-dashboard/create/conference',
      icon: <FiUsers className="text-blue-600 text-2xl mb-2" />
    },
    {
      title: 'Create Exhibition',
      description: 'Showcase art, science, technology, and more to your audience.',
      image: '/exhibition.png',
      route: '/organizer-dashboard/create/exhibition',
      icon: <FiCalendar className="text-blue-600 text-2xl mb-2" />
    },
    {
      title: 'Create Using AI',
      description: 'Leverage AI to design effectively and efficiently.',
      image: '/ai.png',
      route: '/organizer-dashboard/create/workshop',
      icon: <FiSettings className="text-blue-600 text-2xl mb-2" />
    },
  ];

  const features = [
    {
      title: "Easy Setup",
      description: "Get your event page ready in minutes with our intuitive builder",
      icon: <FiSettings className="text-blue-600 text-xl" />
    },
    {
      title: "Marketing Tools",
      description: "Promote your event with built-in email and social tools",
      icon: <FiUsers className="text-blue-600 text-xl" />
    },
    {
      title: "Ticketing",
      description: "Sell tickets and manage registrations seamlessly",
      icon: <FiCalendar className="text-blue-600 text-xl" />
    },
    {
      title: "Analytics",
      description: "Track attendance and engagement with real-time data",
      icon: <FiInfo className="text-blue-600 text-xl" />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What type of event would you like to create?
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Select from our professionally designed templates or start from scratch. 
            We'll guide you through every step of the process.
          </p>
        </div>

        {/* Event Type Cards */}
        <div className="flex flex-wrap justify-center gap-8 mb-16">
          {options.map(({ title, description, image, route, icon }) => (
            <div
              key={route}
              className="bg-white rounded-xl shadow-md overflow-hidden w-full sm:w-[320px] hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue/60 to-transparent"></div>
              </div>
              <div className="p-6 text-center">
                <div className="flex justify-center">
                  {icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600 mb-6">{description}</p>
                <button
                  onClick={() => navigate(route)}
                  className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg w-full transition-colors duration-300"
                >
                  <span>Start Building</span>
                  <FiArrowRight className="text-lg" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="relative my-12">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-4 bg-gray-50 text-lg font-medium text-gray-500">
              Why choose Eventsphere?
            </span>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition">
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-full bg-blue-50 mr-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
              </div>
              <p className="text-gray-600 pl-12">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-400 to-blue-800 rounded-xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Need help deciding?
          </h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Our event specialists can help you choose the right format and guide you through 
            the setup process to ensure your event is a success.
          </p>
          <button
            onClick={() => navigate('/contact-support')}
            className="bg-white text-blue-700 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition-colors duration-300 inline-flex items-center"
          >
            <span>Contact Our Team</span>
            <FiArrowRight className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrganizerCreateEventLanding;