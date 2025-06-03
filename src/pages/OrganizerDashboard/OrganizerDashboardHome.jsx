import React from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ import

const OrganizerDashboardHome = () => {
  const navigate = useNavigate(); // ✅ initialize

  const handleCreateEventClick = () => {
    navigate('/organizer-dashboard/create'); // ✅ navigate to create tab
  };

  return (
    <div className="space-y-10">
      {/* Welcome Section */}
      <h1 className="text-4xl font-bold text-gray-800">Oh hello, Dileesha</h1>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-start justify-between">
          <div>
            <div className="bg-blue-100 w-10 h-10 flex items-center justify-center rounded-full mb-4">
              <span className="text-blue-700 text-xl">✏️</span>
            </div>
            <h2 className="text-xl font-semibold mb-2">Start from scratch</h2>
            <p className="text-gray-600 mb-4">
              Add all your event details, create new tickets, and set up recurring events.
            </p>
          </div>
          <button
            onClick={handleCreateEventClick}
            className="border border-gray-300 rounded px-4 py-2 hover:bg-gray-100"
          >
            Create event
          </button>
        </div>

        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-start justify-between">
          <div>
            <div className="bg-purple-100 w-10 h-10 flex items-center justify-center rounded-full mb-4">
              <span className="text-purple-700 text-xl">✨</span>
            </div>
            <h2 className="text-xl font-semibold mb-2">Create my event faster with AI</h2>
            <p className="text-gray-600 mb-4">
              Answer a few quick questions to generate an event that’s ready to publish almost instantly.
            </p>
          </div>
          <button className="border border-gray-300 rounded px-4 py-2 hover:bg-gray-100">
            Create with AI
          </button>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Set up your organizer profile</h3>
          <p className="text-gray-600 text-sm mb-4">
            A complete profile can increase discovery of your event on search engines and build trust with attendees.
          </p>
          <a href="#" className="text-blue-600 font-medium hover:underline">
            Set up your profile &rarr;
          </a>
        </div>
      </div>

      {/* Checklist */}
      <div className="bg-white rounded-xl shadow p-6 space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Your checklist</h2>
        <p className="text-gray-600">We make it easy to plan successful events. Here's how to start!</p>
        <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
          <li>
            <a href="#" className="text-blue-600 hover:underline">Create event</a> – Publish an event to reach millions of people on Eventbrite.
          </li>
          <li>
            <a href="#" className="text-blue-600 hover:underline">Set up your organizer profile</a> – Add a name, image, and bio.
          </li>
          <li>
            <a href="#" className="text-blue-600 hover:underline">Add your bank account</a> – Get paid for ticket sales.
          </li>
        </ul>
      </div>

      {/* Community Spotlight */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Community spotlight</h2>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <img
            src="https://images.unsplash.com/photo-1590080878068-842e7fef1ca1?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
            alt="Spotlight"
            className="w-40 h-40 object-cover rounded-lg"
          />
          <div>
            <h3 className="text-lg font-semibold text-orange-600 mb-1">Meet Prashant</h3>
            <p className="text-gray-600 mb-2 text-sm">
              “As someone who completely relies on people buying tickets to [our] event to get the word out,
              Eventbrite plays a huge part in my business.”
            </p>
            <button className="border border-gray-300 rounded px-4 py-2 hover:bg-gray-100 text-sm">Read article</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizerDashboardHome;
