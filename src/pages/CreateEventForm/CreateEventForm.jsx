// CreateEventForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateEventForm.css';
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
    <div className="create-event-container">
      <h1>Create an event</h1>

      <form onSubmit={handleSubmit} className="event-form">
        <label>Event title *</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <div className="form-section">
          <div>
            <label>Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Start time</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </div>
          <div>
            <label>End time</label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <label>Where is it located?</label>
          <div className="location-options">
            {['Venue', 'Online event', 'To be announced'].map((option) => (
              <button
                type="button"
                key={option}
                className={locationType === option ? 'selected' : ''}
                onClick={() => setLocationType(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {locationType === 'Venue' && (
          <>
            <div>
              <label>Location *</label>
              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
            <div className="map-picker-wrapper">
              <label>Select on Map:</label>
              <MapPicker setCoordinates={setCoordinates} />
              {coordinates && (
                <p>📍 Selected: Lat {coordinates.lat.toFixed(5)}, Lng {coordinates.lng.toFixed(5)}</p>
              )}
            </div>
          </>
        )}

        {locationType === 'Online event' && (
          <div>
            <label>Event link *</label>
            <input
              type="url"
              placeholder="https://your-event-link.com"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
        )}

        {locationType === 'To be announced' && (
          <p style={{ fontStyle: 'italic' }}>Event location will be announced soon.</p>
        )}

        <div>
          <label>Price *</label>
          <div className="price-input-wrapper">
            <span>$</span>
            <input
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="template-actions">
          <button type="button" onClick={() => setIsPublished(true)}>
            Preview Event Page
          </button>
          <button type="submit" className="submit-btn">
            {isPublished ? 'Publish Event' : 'Save Draft'}
          </button>
        </div>

        <div className="dashboard-button-wrapper">
          <button
            type="button"
            className="dashboard-btn"
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