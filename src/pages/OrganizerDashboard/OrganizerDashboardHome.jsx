import React from 'react';
import { useNavigate } from 'react-router-dom'; 

const OrganizerDashboardHome = () => {
  const navigate = useNavigate();

  const handleCreateEventClick = () => {
    navigate('/organizer-dashboard/create');
  };

  const handleCreateWithAI = () => {
    navigate('/create-event-form');
  };

  return (
    <div className="space-y-12 max-w-7xl mx-auto px-6 py-10">
      {/* Welcome Section */}
      <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">
        Oh hello, <span className="text-blue-600">Dileesha</span>
      </h1>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-8 flex flex-col justify-between">
          <div>
            <div className="bg-blue-50 w-12 h-12 flex items-center justify-center rounded-full mb-6">
              <span className="text-blue-600 text-3xl">✏️</span>
            </div>
            <h2 className="text-2xl font-semibold mb-3 text-gray-900">Start from scratch</h2>
            <p className="text-gray-600 leading-relaxed">
              Add all your event details, create new tickets, and set up recurring events.
            </p>
          </div>
          <button
            onClick={handleCreateEventClick}
            className="mt-6 self-start bg-blue-600 text-white font-semibold rounded-lg px-6 py-3 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition"
          >
            Create event
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-8 flex flex-col justify-between">
          <div>
            <div className="bg-blue-100 w-12 h-12 flex items-center justify-center rounded-full mb-6">
              <span className="text-blue-700 text-3xl">✨</span>
            </div>
            <h2 className="text-2xl font-semibold mb-3 text-gray-900">Create my event faster with AI</h2>
            <p className="text-gray-600 leading-relaxed">
              Answer a few quick questions to generate an event that’s ready to publish almost instantly.
            </p>
          </div>
          <button
            onClick={handleCreateWithAI}
            className="mt-6 self-start bg-blue-700 text-white font-semibold rounded-lg px-6 py-3 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-1 transition"
          >
            Create with AI
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col justify-between">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Set up your organizer profile</h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            A complete profile can increase discovery of your event on search engines and build trust with attendees.
          </p>
          <a
            href="#"
            className="inline-block text-blue-600 font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
          >
            Set up your profile &rarr;
          </a>
        </div>
      </div>


      {/* Community Spotlight */}
      <div className="bg-white rounded-2xl shadow-md p-8 max-w-5xl mx-auto">
        <h2 className="text-3xl font-semibold text-gray-900 mb-6">Community spotlight</h2>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
          <img
            src="https://images.unsplash.com/photo-1590080878068-842e7fef1ca1?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
            alt="Spotlight"
            className="w-48 h-48 object-cover rounded-2xl shadow-sm"
          />
          <div>
            <h3 className="text-xl font-semibold text-blue-600 mb-2">Meet Prashant</h3>
            <p className="text-gray-700 mb-4 leading-relaxed text-sm">
              “As someone who completely relies on people buying tickets to [our] event to get the word out,
              Eventbrite plays a huge part in my business.”
            </p>
            <button className="bg-gray-100 border border-gray-300 rounded-lg px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-400 transition">
              Read article
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizerDashboardHome;
