// OrganizerWelcome.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './OrganizerWelcome.css'; // for styling

function OrganizerWelcome() {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <h1>How would you like to get started?</h1>
      <div className="card-container">
        <div className="card">
          <img src="/create.jpg" alt="Create event" />
          <h3>Create my first event</h3>
          <p>There's no time like the present – let's go!</p>
          <button onClick={() => navigate('/create-event')}>Build event</button>
        </div>
        <div className="card">
          <img src="/explore.jpg" alt="Discover Eventbrite" />
          <h3>Discover Eventbrite</h3>
          <p>Get to know the platform and features first</p>
          <button onClick={() => navigate('/')}>Explore homepage</button>
        </div>
      </div>
    </div>
  );
}

export default OrganizerWelcome;
