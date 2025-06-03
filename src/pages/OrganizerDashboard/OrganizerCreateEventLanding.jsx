import React from 'react';
import { useNavigate } from 'react-router-dom';

const OrganizerCreateEventLanding = () => {
  const navigate = useNavigate();

  const options = [

    {
      title: 'Create Conference',
      description: 'Bring professionals together to share knowledge.',
      image: '/conference.jpg',
      route: '/organizer-dashboard/create/conference',
    },
    {
      title: 'Create Exhibition',
      description: 'Showcase art, science, tech, and more.',
      image: '/exhibition.jpg',
      route: '/organizer-dashboard/create/exhibition',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-10 text-center">
        What type of event would you like to create?
      </h1>

      <div className="flex flex-wrap justify-center gap-6 w-full max-w-6xl">
        {options.map(({ title, description, image, route }) => (
          <div
            key={route}
            className="bg-white rounded-xl shadow-md p-6 w-full sm:w-[300px] flex flex-col items-center text-center hover:shadow-lg transition"
          >
            <img
              src={image}
              alt={title}
              className="w-full h-44 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600 mb-6">{description}</p>
            <button
              onClick={() => navigate(route)}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              Start Building
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrganizerCreateEventLanding;
