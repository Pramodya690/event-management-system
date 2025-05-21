import React, { useState } from 'react';
import './CreateEventForm.css';

function CreateEventForm() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [locationType, setLocationType] = useState('Venue');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('0.00');

  const handleSubmit = (e) => {
    e.preventDefault();
    const eventData = {
      title,
      date,
      startTime,
      endTime,
      locationType,
      location,
      price,
    };

    alert('Event data submitted:\n' + JSON.stringify(eventData, null, 2));
  };

  return (
    <div className="create-event-container">
      <h1>Create an event</h1>
      <p>
        Answer a few questions about your event and our AI creation tool will use internal data to build an event page.
        You can still <a href="#">create an event without AI</a>.
      </p>

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

        {/* Conditional Location Inputs */}
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

            <div className="add-location-details">
              <span>🏠 Add location details</span>
            </div>

            <div className="map-placeholder">
              <img
                src="https://maps.googleapis.com/maps/api/staticmap?center=San+Francisco,CA&zoom=13&size=600x300&key=YOUR_API_KEY"
                alt="Map placeholder"
              />
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
          <p style={{ fontStyle: 'italic', color: '#666' }}>
            Event location will be announced soon.
          </p>
        )}

        {/* Ticket price section */}
        <div>
          <h3>How much do you want to charge for tickets?</h3>
          <p>
            Our tool can only generate one General Admission ticket for now. You can edit and add more ticket types later.
          </p>
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
          <div className="free-ticket-note">❌ My tickets are free</div>
        </div>

        <button type="submit" className="submit-btn">Create Event</button>
      </form>
    </div>
  );
}

export default CreateEventForm;
