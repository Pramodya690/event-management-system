import React from 'react';
import { useNavigate } from 'react-router-dom';

function OrganizerWelcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-10 text-center">
        How would you like to get started?
      </h1>

      <div className="flex flex-row flex-nowrap gap-6 max-w-6xl w-full">
        {/* Card 1 - Create Event */}
        <div className="bg-white rounded-lg shadow-md flex flex-col items-center p-6 w-1/3">
          <img
            src="/create.jpg"
            alt="Create event"
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <h3 className="text-xl font-semibold mb-2">Create my first event</h3>
          <p className="text-gray-600 mb-6 text-center">
            There's no time like the present – let's go!
          </p>
          <button
            onClick={() => navigate('/create-event-form')}
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
          >
            Build event
          </button>
        </div>

        {/* Card 2 - Discover */}
        <div className="bg-white rounded-lg shadow-md flex flex-col items-center p-6 w-1/3">
          <img
            src="/explore.jpg"
            alt="Discover Eventbrite"
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <h3 className="text-xl font-semibold mb-2">Discover Eventbrite</h3>
          <p className="text-gray-600 mb-6 text-center">
            Get to know the platform and features first
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
          >
            Explore homepage
          </button>
        </div>

        {/* Card 3 - Organizer Dashboard */}
        <div className="bg-white rounded-lg shadow-md flex flex-col items-center p-6 w-1/3">
          <img
            src="/dashboard.jpg"
            alt="Organizer Dashboard"
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <h3 className="text-xl font-semibold mb-2">Go to Organizer Dashboard</h3>
          <p className="text-gray-600 mb-6 text-center">
            Manage all your events and track performance.
          </p>
          <button
            onClick={() => navigate('/organizer-dashboard')}
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
          >
            View dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrganizerWelcome;
