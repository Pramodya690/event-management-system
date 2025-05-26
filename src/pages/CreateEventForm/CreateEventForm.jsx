import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MapPicker from './MapPicker';

function CreateEventForm() {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [locationType, setLocationType] = useState('Venue');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('0.00');
  const [coordinates, setCoordinates] = useState(null);
  const [isPublished, setIsPublished] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const id = Date.now();
    const eventData = {
      id,
      title,
      date,
      startTime,
      endTime,
      locationType,
      location,
      price,
      coordinates,
      isPublished
    };

    const existingEvents = JSON.parse(localStorage.getItem('events')) || [];
    existingEvents.push(eventData);
    localStorage.setItem('events', JSON.stringify(existingEvents));

    navigate(`/events/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Create an Event</h1>

      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white shadow-md p-6 rounded-lg space-y-6">
        <div>
          <label className="block font-medium mb-1">Event Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block font-medium mb-1">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Start Time</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">End Time</label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
        </div>

        <div>
          <label className="block font-medium mb-2">Where is it located?</label>
          <div className="flex gap-2 flex-wrap">
            {['Venue', 'Online event', 'To be announced'].map((option) => (
              <button
                type="button"
                key={option}
                onClick={() => setLocationType(option)}
                className={`px-4 py-2 rounded-full border ${
                  locationType === option
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 border-gray-300'
                } hover:bg-blue-50`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {locationType === 'Venue' && (
          <>
            <div>
              <label className="block font-medium mb-1">Location *</label>
              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Select on Map:</label>
              <MapPicker setCoordinates={setCoordinates} />
              {coordinates && (
                <p className="mt-2 text-sm text-gray-600">
                  📍 Selected: Lat {coordinates.lat.toFixed(5)}, Lng {coordinates.lng.toFixed(5)}
                </p>
              )}
            </div>
          </>
        )}

        {locationType === 'Online event' && (
          <div>
            <label className="block font-medium mb-1">Event Link *</label>
            <input
              type="url"
              placeholder="https://your-event-link.com"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
        )}

        {locationType === 'To be announced' && (
          <p className="italic text-gray-500">Event location will be announced soon.</p>
        )}

        <div>
          <label className="block font-medium mb-1">Price *</label>
          <div className="flex items-center gap-2">
            <span className="text-gray-700">$</span>
            <input
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-4 justify-between mt-6">
          <button
            type="button"
            onClick={() => setIsPublished(true)}
            className="bg-gray-200 text-gray-800 px-5 py-2 rounded hover:bg-gray-300"
          >
            Preview Event Page
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
          >
            {isPublished ? 'Publish Event' : 'Save Draft'}
          </button>
        </div>

        <div className="mt-6 text-center">
          <button
            type="button"
            className="text-blue-600 underline hover:text-blue-800"
            onClick={() => navigate('/find-speaker-vendor')}
          >
            Go to Organizer Dashboard
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateEventForm;
