import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OrganizerDetails.css';

function OrganizerDetails() {
  const [selected, setSelected] = useState([]);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [numEvents, setNumEvents] = useState('');
  const [eventSize, setEventSize] = useState('');
  const [goal, setGoal] = useState('');
  const navigate = useNavigate();


  const eventTypes = [
    'Comedy',
    'Food & Drink',
    'Music',
    'Community & Culture',
    'Hobbies & Special Interest',
    'Performing & Visual Arts',
    'Parties',
  ];

    const handleSelect = (type) => {
        setSelected((prev) =>
        prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
        );
    };

    const handleNext = () => {
        if (goal) {
        navigate('/organizer-welcome');
        }
    };

  return (
    <div className="organizer-details-container">
      <h1>Let's get to know you first!</h1>
      <p>Tell us what kind of events you want to host and we’ll help make it happen.</p>

      <label className="event-label">What type of events do you host? <span>*</span></label>
      <div className="event-types">
        {eventTypes.map((type) => (
          <button
            key={type}
            className={`event-type-btn ${selected.includes(type) ? 'selected' : ''}`}
            onClick={() => handleSelect(type)}
          >
            {type}
          </button>
        ))}
      </div>

      <button className="more-options" onClick={() => setShowMoreOptions(!showMoreOptions)}>
        {showMoreOptions ? 'Hide options' : 'More options'}
      </button>

      {/* 👇 Step 1: Show only after selecting event type(s) */}
      {selected.length > 0 && (
        <div className="event-form-section">
          <label className="event-label">
            How many events do you plan to organize in the next year? <span>*</span>
          </label>
          <select
            className="event-dropdown"
            value={numEvents}
            required
            onChange={(e) => setNumEvents(e.target.value)}
          >
            <option value="">Number of events</option>
            <option value="1-3">1–3</option>
            <option value="4-10">4–10</option>
            <option value="11+">11 or more</option>
          </select>

          <label className="checkbox">
            <input type="checkbox" /> My events are part of a recurring series
          </label>
        </div>
      )}

      {/* 👇 Step 2: Show only after selecting number of events */}
      {numEvents && (
        <div className="event-details-section">
          <label className="event-label">
            On average, how big are your events? <span>*</span>
          </label>
          <select
            className="event-dropdown"
            required
            value={eventSize}
            onChange={(e) => setEventSize(e.target.value)}
          >
            <option value="">Number of people</option>
            <option value="100">Up to 100 people</option>
            <option value="500">100–500 people</option>
            <option value="1000">500–1,000 people</option>
            <option value="1000+">1,000+ people</option>
          </select>

          <label className="event-label">
            What matters most to you? <span>*</span>
          </label>
          <div className="radio-grid">
            <label className={`radio-card ${goal === 'easy' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="goal"
                value="easy"
                onChange={(e) => setGoal(e.target.value)}
              />
              <div className="radio-content">
                <p>Something budget-friendly and easy to use</p>
                <img src="/icons/easy.svg" alt="Easy" />
              </div>
            </label>
            <label className={`radio-card ${goal === 'reach' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="goal"
                value="reach"
                onChange={(e) => setGoal(e.target.value)}
              />
              <div className="radio-content">
                <p>To reach more people and keep them coming back</p>
                <img src="/icons/megaphone.svg" alt="Reach" />
              </div>
            </label>
            <label className={`radio-card ${goal === 'tools' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="goal"
                value="tools"
                onChange={(e) => setGoal(e.target.value)}
              />
              <div className="radio-content">
                <p>More customer support and tools for professional event organizers</p>
                <img src="/icons/tools.svg" alt="Tools" />
              </div>
            </label>
          </div>
        </div>
      )}
      
      {/* Next Button */}
      {goal && (
        <div className="form-group">
          <button
            className="next-button"
            onClick={handleNext}
            disabled={!goal}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default OrganizerDetails;
