import { useState, useEffect } from 'react';
import { FiSearch, FiFilter, FiStar, FiMapPin, FiUsers, FiDollarSign } from 'react-icons/fi';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const OrganizerDashboardFindVendors = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { eventDetails: initialEventDetails, eventId: initialEventId } = location.state || {};

  const [filters, setFilters] = useState({
    category: '',
    minBudget: '',
    maxBudget: '',
    location: '',
    capacity: ''
  });
  const [vendors, setVendors] = useState([]);
  const [selectedVendors, setSelectedVendors] = useState([]);
  const [eventVendors, setEventVendors] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(initialEventDetails || null);
  const [selectedEventId, setSelectedEventId] = useState(initialEventId || null);
  const [loading, setLoading] = useState(false);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [expandedFilter, setExpandedFilter] = useState(false);
  const [error, setError] = useState('');

  const BACKEND_URL = 'http://localhost:5000';

  // Fetch events
  const fetchEvents = async () => {
    setLoadingEvents(true);
    try {
      const response = await axios.get(`${BACKEND_URL}/api/events`);
      console.log('Events response:', response.data);
      const eventData = Array.isArray(response.data) ? response.data : Array.isArray(response.data.events) ? response.data.events : [];
      setEvents(eventData);
    } catch (err) {
      console.error('Failed to fetch events:', err.response || err.message);
      setError('Failed to fetch events. Please try again.');
      setEvents([]);
    } finally {
      setLoadingEvents(false);
    }
  };

  // Fetch vendors for the selected event
  const fetchEventVendors = async (eventId) => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/getEventVendors/${eventId}`);
      console.log('Event vendors response:', response.data);
      setEventVendors(response.data.vendors || []);
    } catch (err) {
      console.error('Failed to fetch event vendors:', err.response || err.message);
      setError('Failed to fetch event vendors.');
      setEventVendors([]);
    }
  };

  // Fetch vendors based on filters
  const handleSearch = async () => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams();
      if (filters.category) params.append('category', filters.category);
      if (filters.location) params.append('location', filters.location);
      if (filters.minBudget) params.append('minBudget', filters.minBudget);
      if (filters.maxBudget) params.append('maxBudget', filters.maxBudget);
      if (filters.capacity) params.append('capacity', filters.capacity);

      const response = await axios.get(`${BACKEND_URL}/api/findVendors?${params.toString()}`);
      setVendors(response.data.vendors || []);
    } catch (error) {
      console.error('Failed to fetch vendors:', error);
      setError('Failed to fetch vendors. Please try again.');
      setVendors([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle event selection
  const handleEventSelect = (e) => {
    const eventId = e.target.value;
    const event = events.find((ev) => ev.id === parseInt(eventId));
    if (event) {
      console.log('Selected event:', event);
      setSelectedEvent({
        eventId: event.id,
        eventName: event.event_title,
        date: event.date,
        time: event.time,
        category: event.category,
        description: event.description,
        city: event.city,
        headcount: event.headcount
      });
      setSelectedEventId(event.id);
      setFilters((prev) => ({
        ...prev,
        location: event.city || '',
        capacity: event.headcount || ''
      }));
      fetchEventVendors(event.id);
      handleSearch();
    } else {
      setSelectedEvent(null);
      setSelectedEventId(null);
      setFilters((prev) => ({
        ...prev,
        location: '',
        capacity: ''
      }));
      setVendors([]);
      setEventVendors([]);
    }
  };

  // Handle vendor selection
  const handleSelectVendor = (vendor) => {
    setSelectedVendors((prev) => {
      if (prev.some((v) => v.id === vendor.id)) {
        return prev.filter((v) => v.id !== vendor.id);
      }
      return [...prev, vendor];
    });
  };

  // Reserve selected vendors and navigate to Marketing
  const handleReserveVendors = async () => {
    if (!selectedEventId || selectedVendors.length === 0) {
      setError('Please select an event and at least one vendor.');
      return;
    }

    try {
      // Save selected vendors to event_vendors
      await axios.post(`${BACKEND_URL}/api/saveEventVendors`, {
        event_id: selectedEventId,
        vendor_ids: selectedVendors.map((v) => v.id)
      });

      // Navigate to Marketing component's email tab
      navigate('/organizer-dashboard/marketing', {
        state: {
          eventDetails: selectedEvent,
          vendorDetails: selectedVendors,
          activeTab: 'email'
        }
      });
    } catch (err) {
      console.error('Error saving vendors:', err);
      setError(err.response?.data?.error || 'Failed to save vendors.');
    }
  };

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const resetFilters = () => {
    setFilters({
      category: '',
      minBudget: '',
      maxBudget: '',
      location: selectedEvent?.city || '',
      capacity: selectedEvent?.headcount || ''
    });
    setVendors([]);
    setSelectedVendors([]);
  };

  useEffect(() => {
    fetchEvents();
    if (selectedEventId) {
      fetchEventVendors(selectedEventId);
    }
  }, [selectedEventId]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Find Vendors for {selectedEvent?.eventName || 'Event'}
          </h1>
          <p className="text-gray-600 mt-2">Discover trusted vendors for your event</p>
        </div>
        <div className="flex items-center gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Event</label>
            <select
              value={selectedEventId || ''}
              onChange={handleEventSelect}
              className="w-64 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              disabled={loadingEvents}
            >
              <option value="">Select an event</option>
              {Array.isArray(events) && events.length > 0 ? (
                events.map((event) => (
                  <option key={event.id} value={event.id}>
                    {event.event_title} — {new Date(event.date).toLocaleDateString()} — {event.city || 'N/A'}
                  </option>
                ))
              ) : (
                <option value="" disabled>No events available</option>
              )}
            </select>
          </div>
          <button
            onClick={() => setExpandedFilter(!expandedFilter)}
            className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition"
          >
            <FiFilter className="text-gray-600" />
            <span>{expandedFilter ? 'Hide Filters' : 'Show Filters'}</span>
          </button>
        </div>
      </div>

      {error && (
        <p className="text-red-600 mb-4 font-semibold bg-red-50 p-3 rounded">
          {error}
        </p>
      )}

      {loadingEvents && (
        <p className="text-gray-600 mb-4">Loading events...</p>
      )}

      {!loadingEvents && Array.isArray(events) && events.length === 0 && (
        <p className="text-gray-600 mb-4">No events found. Please create an event first.</p>
      )}

      {selectedEventId && eventVendors.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Vendors Booked for {selectedEvent?.eventName}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventVendors.map((vendor) => (
              <div key={vendor.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                {/* <div className="h-48 bg-gray-200 relative">
                  <img 
                    src={vendor.image} 
                    alt={vendor.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded-full flex items-center gap-1 text-sm font-medium">
                    <FiStar className="text-yellow-400" />
                    <span>{vendor.rating || 'N/A'}</span>
                  </div>
                </div> */}
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">{vendor.name}</h3>
                  <div className="flex items-center text-gray-600 text-sm mb-2">
                    <FiMapPin className="mr-1" />
                    <span>{vendor.address || 'N/A'}</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm mb-2">
                    <span>Category: {vendor.category}</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm mb-3">
                    <FiUsers className="mr-1" />
                    <span>Capacity: {vendor.capacity || 'N/A'} people</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm mb-3">
                    <span>Status: {vendor.status}</span>
                  </div>
                  {/* <div className="flex justify-between items-center">
                    <div className="text-gray-800 font-medium">
                      <FiDollarSign className="inline mr-1" />
                      <span>
                        {vendor.budgetRange?.min?.toLocaleString() || 'N/A'} - 
                        {vendor.budgetRange?.max?.toLocaleString() || 'N/A'}
                      </span>
                    </div>
                  </div> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className={`bg-white rounded-xl shadow-md p-6 mb-8 transition-all duration-300 ${expandedFilter ? 'block' : 'hidden md:block'}`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search Vendors</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                name="location"
                value={filters.location}
                onChange={handleChange}
                className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                placeholder="Location or vendor name"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              name="category"
              value={filters.category}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            >
              <option value="">All Categories</option>
              <option value="Catering">Catering</option>
              <option value="Lighting">Lighting</option>
              <option value="Decoration">Decoration</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Venue">Venue</option>
              <option value="Photography">Photography</option>
              <option value="Audio-Visual">Audio-Visual</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Budget Range (₹)</label>
            <div className="flex gap-2">
              <input
                type="number"
                name="minBudget"
                value={filters.minBudget}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                placeholder="Min"
              />
              <input
                type="number"
                name="maxBudget"
                value={filters.maxBudget}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                placeholder="Max"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Capacity</label>
            <input
              type="number"
              name="capacity"
              value={filters.capacity}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              placeholder="Number of people"
            />
          </div>

          <div className="flex items-end gap-3">
            <button
              onClick={handleSearch}
              className="flex-1 bg-sky-600 text-white px-6 py-3 rounded-lg hover:bg-sky-700 transition flex items-center justify-center gap-2"
              disabled={loading}
            >
              <FiSearch />
              {loading ? 'Searching...' : 'Search Vendors'}
            </button>
            <button
              onClick={resetFilters}
              className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {vendors.length} {vendors.length === 1 ? 'Vendor' : 'Vendors'} Found
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Sort by:</span>
            <select className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-sky-500">
              <option>Recommended</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Rating</option>
            </select>
          </div>
        </div>

        {vendors.length === 0 && !loading && (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <FiSearch className="text-gray-400 text-2xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">No vendors found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search filters</p>
            <button
              onClick={resetFilters}
              className="text-sky-600 hover:text-sky-800 font-medium"
            >
              Reset all filters
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vendors.map((vendor) => (
            <div key={vendor.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition">
              <div className="h-48 bg-gray-200 relative">
                <img 
                  src={vendor.image} 
                  alt={vendor.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded-full flex items-center gap-1 text-sm font-medium">
                  <FiStar className="text-yellow-400" />
                  <span>{vendor.rating || 'N/A'}</span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{vendor.name}</h3>
                <div className="flex items-center text-gray-600 text-sm mb-2">
                  <FiMapPin className="mr-1" />
                  <span>{vendor.address || vendor.location || 'N/A'}</span>
                </div>
                <div className="flex items-center text-gray-600 text-sm mb-3">
                  <FiUsers className="mr-1" />
                  <span>Capacity: {vendor.capacity || 'N/A'} people</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-gray-800 font-medium">
                    <FiDollarSign className="inline mr-1" />
                    <span>
                      {vendor.budgetRange?.min?.toLocaleString() || 'N/A'} - 
                      {vendor.budgetRange?.max?.toLocaleString() || 'N/A'}
                    </span>
                  </div>
                  <button
                    onClick={() => handleSelectVendor(vendor)}
                    className={`text-white px-4 py-2 rounded-lg ${
                      selectedVendors.some((v) => v.id === vendor.id)
                        ? 'bg-red-600 hover:bg-red-700'
                        : 'bg-sky-600 hover:bg-sky-700'
                    }`}
                  >
                    {selectedVendors.some((v) => v.id === vendor.id) ? 'Deselect' : 'Select Vendor'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedVendors.length > 0 && (
        <div className="flex justify-end mb-8">
          <button
            onClick={handleReserveVendors}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
          >
            Reserve Selected Vendors ({selectedVendors.length})
          </button>
        </div>
      )}

      {vendors.length > 0 && (
        <div className="flex justify-center items-center gap-2">
          <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50">
            Previous
          </button>
          <button className="px-3 py-1 bg-sky-600 text-white rounded hover:bg-sky-700">
            1
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
            2
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
            3
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default OrganizerDashboardFindVendors;