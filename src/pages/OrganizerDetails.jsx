import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-2">Let's get to know you first!</h1>
      <p className="text-gray-600 mb-6">
        Tell us what kind of events you want to host and we’ll help make it happen.
      </p>

      {/* Event Types */}
      <label className="block font-medium mb-2">
        What type of events do you host? <span className="text-red-500">*</span>
      </label>
      <div className="flex flex-wrap gap-2 mb-4">
        {eventTypes.map((type) => (
          <button
            key={type}
            onClick={() => handleSelect(type)}
            className={`px-4 py-2 rounded-full border text-sm ${
              selected.includes(type)
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <button
        onClick={() => setShowMoreOptions(!showMoreOptions)}
        className="text-blue-600 text-sm underline mb-6"
      >
        {showMoreOptions ? 'Hide options' : 'More options'}
      </button>

      {/* Step 1 */}
      {selected.length > 0 && (
        <div className="mb-6 space-y-4">
          <label className="block font-medium">
            How many events do you plan to organize in the next year?{' '}
            <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full p-2 border rounded"
            value={numEvents}
            onChange={(e) => setNumEvents(e.target.value)}
            required
          >
            <option value="">Number of events</option>
            <option value="1-3">1–3</option>
            <option value="4-10">4–10</option>
            <option value="11+">11 or more</option>
          </select>

          <label className="inline-flex items-center gap-2 mt-2">
            <input type="checkbox" className="accent-blue-600" />
            <span>My events are part of a recurring series</span>
          </label>
        </div>
      )}

      {/* Step 2 */}
      {numEvents && (
        <div className="mb-6 space-y-6">
          <div>
            <label className="block font-medium mb-1">
              On average, how big are your events? <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full p-2 border rounded"
              value={eventSize}
              onChange={(e) => setEventSize(e.target.value)}
              required
            >
              <option value="">Number of people</option>
              <option value="100">Up to 100 people</option>
              <option value="500">100–500 people</option>
              <option value="1000">500–1,000 people</option>
              <option value="1000+">1,000+ people</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-2">
              What matters most to you? <span className="text-red-500">*</span>
            </label>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  value: 'easy',
                  label: 'Something budget-friendly and easy to use',
                },
                {
                  value: 'reach',
                  label: 'To reach more people and keep them coming back',
                },
                {
                  value: 'tools',
                  label: 'More customer support and tools for professional event organizers',
                },
              ].map(({ value, label }) => (
                <label
                  key={value}
                  className={`p-4 border rounded cursor-pointer ${
                    goal === value
                      ? 'border-blue-600 bg-blue-50'
                      : 'hover:border-gray-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="goal"
                    value={value}
                    className="mr-2"
                    checked={goal === value}
                    onChange={(e) => setGoal(e.target.value)}
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Next Button */}
      {goal && (
        <div className="mt-6">
          <button
            onClick={handleNext}
            disabled={!goal}
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default OrganizerDetails;
