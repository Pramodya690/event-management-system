import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FiSend,
  FiMail,
  FiDatabase,
  FiCheckCircle,
  FiAlertCircle,
  FiEdit3,
  FiPlus,
  FiTrendingUp,
  FiCalendar
} from "react-icons/fi";
import { useLocation } from "react-router-dom";

const Marketing = () => {
  const location = useLocation();
  const { eventDetails, vendorDetails, activeTab: initialTab } = location.state || {};

  const [activeTab, setActiveTab] = useState(initialTab || "event");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Event tab state
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState(eventDetails?.eventId || "");
  const [event, setEvent] = useState({
    eventName: eventDetails?.eventName || "",
    description: eventDetails?.description || "",
    date: eventDetails?.date || "",
    city: eventDetails?.city || "",
    image: eventDetails?.image || null // Base64 string
  });
  const [selectedVendors, setSelectedVendors] = useState(vendorDetails || []);
  const [fetchingEvent, setFetchingEvent] = useState(false);

  // Email tab state
  const [campaignName, setCampaignName] = useState("");
  const [emailSubject, setEmailSubject] = useState("Service Request for Upcoming Event");
  const [eventDescription, setEventDescription] = useState("");
  const [emails, setEmails] = useState("");
  const [generatingEmail, setGeneratingEmail] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);
  const [generatedEmail, setGeneratedEmail] = useState("");

  // Tasks tab state
  const [tasks, setTasks] = useState([]);
  const [generatingTasks, setGeneratingTasks] = useState(false);

  // Social tab state
  const [socialForm, setSocialForm] = useState({
    title: "",
    description: "",
    organizer: "",
    phone: "",
    event_time: "",
    date: "",
    location: "",
    image: null // Base64 string
  });
  const [caption, setCaption] = useState("");
  const [generatingCaption, setGeneratingCaption] = useState(false);
  const [postingSocial, setPostingSocial] = useState(false);
  const [postResults, setPostResults] = useState(null);

  const BACKEND_URL = "http://localhost:5000";
  const API_BASE = "http://localhost:5001";

  // Fetch all events for dropdown
  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/events`);
      setEvents(response.data);
    } catch (err) {
      setError(`Failed to fetch events: ${err.response?.data?.error || err.message}`);
    }
  };

  // Fetch event details and vendors
  const fetchEventDetails = async (eventId) => {
    setFetchingEvent(true);
    setError("");
    try {
      // Fetch event details
      const eventResponse = await axios.get(`${BACKEND_URL}/api/events/${eventId}`);
      const eventData = eventResponse.data;

      // Fetch selected vendors
      const vendorsResponse = await axios.get(`${BACKEND_URL}/api/getEventVendors/${eventId}`);
      const vendors = vendorsResponse.data.vendors || [];

      setEvent({
        eventName: eventData.event_title || "",
        description: eventData.description || "",
        date: eventData.date ? new Date(eventData.date).toISOString().split('T')[0] : "",
        city: eventData.city || "",
        image: eventData.image || null
      });
      setSelectedVendors(vendors);

      // Pre-populate email tab
      setCampaignName(eventData.event_title || "");
      setEmailSubject(`Service Request for ${eventData.event_title || 'Upcoming Event'}`);
      setEventDescription(
        `Event: ${eventData.event_title || 'N/A'}\n` +
        `Date: ${eventData.date ? new Date(eventData.date).toLocaleDateString() : 'N/A'}\n` +
        `Location: ${eventData.city || 'N/A'}\n` +
        `Description: ${eventData.description || 'N/A'}`
      );
      setEmails(vendors.map(v => v.email).join(', '));

      // Pre-populate social tab
      setSocialForm({
        title: eventData.event_title || "",
        description: eventData.description || "",
        organizer: "", // Replace with auth data if available
        phone: "", // Replace with auth data if available
        event_time: eventData.time || "",
        date: eventData.date ? new Date(eventData.date).toISOString().split('T')[0] : "",
        location: eventData.city || "",
        image: eventData.image || null
      });
    } catch (err) {
      setError(`Failed to fetch event details: ${err.response?.data?.error || err.message}`);
    } finally {
      setFetchingEvent(false);
    }
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(',')[1]; // Remove data:image/jpeg;base64, prefix
        setEvent(prev => ({ ...prev, image: base64String }));
        setSocialForm(prev => ({ ...prev, image: base64String }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Email generation
  const generateEmail = async () => {
    setError("");
    if (!eventDescription.trim()) {
      setError("Please enter an event description");
      return;
    }
    setGeneratingEmail(true);
    try {
      const { data } = await axios.post(`${API_BASE}/generate-email`, {
        event_description: eventDescription,
        company_name: "EventSphere",
        company_phone: "+94 712345678",
        company_email: "info@eventshere.com",
        company_website: "www.eventshere.com",
      });
      setGeneratedEmail(data.email_body);
      setMessage("Email generated successfully");
    } catch (err) {
      setError(`Failed to generate email: ${err.response?.data?.message || err.message}`);
    } finally {
      setGeneratingEmail(false);
    }
  };

  const sendEmails = async () => {
    if (!generatedEmail) {
      setError("Please generate an email first");
      return;
    }
    setSendingEmail(true);
    setError("");
    setMessage("");
    try {
      const recipientList = emails.split(",").map(e => e.trim()).filter(Boolean);
      const { data } = await axios.post(`${API_BASE}/send-emails`, {
        emails: recipientList,
        subject: emailSubject,
        campaignName,
        email_body: generatedEmail,
      });
      setMessage(data.message);
    } catch (err) {
      setError(`Failed to send emails: ${err.response?.data?.message || err.message}`);
    } finally {
      setSendingEmail(false);
    }
  };

  // Tasks generation
  const generateTasks = async () => {
    setError("");
    if (!eventDescription.trim()) {
      setError("Please enter an event description first");
      return;
    }
    setGeneratingTasks(true);
    try {
      const { data } = await axios.post(`${API_BASE}/infer-tasks`, {
        description: eventDescription,
      });
      setTasks(data.tasks || []);
      setMessage("Tasks inferred successfully");
    } catch (err) {
      setError(`Failed to infer tasks: ${err.response?.data?.message || err.message}`);
    } finally {
      setGeneratingTasks(false);
    }
  };

  // Social caption
  const generateCaption = async () => {
    setError("");
    setGeneratingCaption(true);
    try {
      const { data } = await axios.post(`${API_BASE}/generate-caption`, {
        ...socialForm,
        image_url: socialForm.image || undefined
      });
      setCaption(data.caption);
      setMessage(`Caption generated in ${data.generation_time}`);
    } catch (err) {
      setError(`Caption generation failed: ${err.response?.data?.error || err.message}`);
    } finally {
      setGeneratingCaption(false);
    }
  };

  const postCaption = async () => {
    setPostingSocial(true);
    setError("");
    setMessage("");
    try {
      const { data } = await axios.post(`${API_BASE}/post-social-media`, {
        caption,
        image_url: socialForm.image || undefined,
        
        
        platforms: ["instagram", "whatsapp"],
      });
      setPostResults(data.results);
      setMessage(data.message);
    } catch (err) {
      setError(`Posting failed: ${err.response?.data?.error || err.message}`);
    } finally {
      setPostingSocial(false);
    }
  };

  // Fetch events on mount
  useEffect(() => {
    fetchEvents();
    if (selectedEventId || eventDetails?.eventId) {
      fetchEventDetails(selectedEventId || eventDetails.eventId);
    }
  }, [selectedEventId, eventDetails]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-8">
        {[
          { id: "event", label: "Event Selection", icon: <FiCalendar className="mr-2" /> },
          { id: "email", label: "Vendor Outreach", icon: <FiMail className="mr-2" /> },
          { id: "tasks", label: "Event Tasks", icon: <FiDatabase className="mr-2" /> },
          { id: "social", label: "Social Caption", icon: <FiTrendingUp className="mr-2" /> },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 font-medium text-sm flex items-center border-b-2 transition-colors ${
              activeTab === tab.id
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.icon}{tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {activeTab === "event" && (
          <div className="p-6 space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Select Event</h2>
            {fetchingEvent && <p className="text-gray-600">Loading event details...</p>}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Event</label>
              <select
                className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={selectedEventId}
                onChange={(e) => setSelectedEventId(e.target.value)}
              >
                <option value="">Select an event</option>
                {events.map(event => (
                  <option key={event.id} value={event.id}>
                    {event.event_title}
                  </option>
                ))}
              </select>
            </div>
            {selectedEventId && (
              <>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Event Name</label>
                    <input
                      className="w-full px-4 py-2 border rounded bg-gray-100"
                      value={event.eventName}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                      className="w-full px-4 py-2 border rounded bg-gray-100"
                      value={event.date}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                      className="w-full px-4 py-2 border rounded bg-gray-100"
                      value={event.city}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Event Image</label>
                    {event.image ? (
                      <img
                        src={`data:image/jpeg;base64,${event.image}`}
                        alt="Event"
                        className="w-32 h-32 object-cover rounded"
                      />
                    ) : (
                      <p className="text-gray-500">No image available</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    className="w-full px-4 py-2 border rounded bg-gray-100"
                    rows={4}
                    value={event.description}
                    readOnly
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Selected Vendors</h3>
                  {selectedVendors.length > 0 ? (
                    <ul className="space-y-2">
                      {selectedVendors.map(vendor => (
                        <li key={vendor.id} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                          <span>{vendor.name} ({vendor.email}) - {vendor.status}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No vendors selected for this event.</p>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === "email" && (
          <div className="p-6 space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Create Vendor Outreach</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Name</label>
                <input
                  className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={campaignName}
                  onChange={e => setCampaignName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Subject</label>
                <input
                  className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={emailSubject}
                  onChange={e => setEmailSubject(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Event Description</label>
              <textarea
                className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={4}
                value={eventDescription}
                onChange={e => setEventDescription(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Vendor Emails</label>
              <textarea
                className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows="3"
                value={emails}
                onChange={e => setEmails(e.target.value)}
                placeholder="a@ex.com, b@ex.com"
              />
            </div>
            <div className="flex gap-4">
              <button
                onClick={generateEmail}
                disabled={generatingEmail}
                className={`px-6 py-3 rounded text-white flex items-center gap-2 ${
                  generatingEmail ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                <FiEdit3 />
                {generatingEmail ? "Generating..." : "Generate Email"}
              </button>
              <button
                onClick={sendEmails}
                disabled={sendingEmail || !generatedEmail}
                className={`px-6 py-3 rounded text-white flex items-center gap-2 ${
                  sendingEmail || !generatedEmail ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
                }`}
              >
                <FiSend />
                {sendingEmail ? "Sending..." : "Send to Vendors"}
              </button>
            </div>
            {generatedEmail && (
              <div className="bg-gray-100 p-6 rounded">
                <h3 className="font-semibold text-gray-800 mb-2">Generated Email</h3>
                <pre className="whitespace-pre-wrap text-gray-800">{generatedEmail}</pre>
              </div>
            )}
          </div>
        )}

        {activeTab === "tasks" && (
          <div className="p-6 space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Event Tasks</h2>
            <button
              onClick={generateTasks}
              disabled={generatingTasks}
              className={`px-6 py-3 rounded text-white flex items-center gap-2 ${
                generatingTasks ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              <FiPlus />
              {generatingTasks ? "Inferring..." : "Generate Tasks"}
            </button>
            <ul className="mt-4 space-y-2">
              {tasks.length > 0 ? (
                tasks.map((t, i) => (
                  <li key={i} className="flex items-start">
                    <span className="mr-2 font-semibold">{i + 1}.</span>
                    <span>{t}</span>
                  </li>
                ))
              ) : (
                <p className="text-gray-500">No tasks generated yet</p>
              )}
            </ul>
          </div>
        )}

        {activeTab === "social" && (
          <div className="p-6 space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Social Caption</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {Object.keys(socialForm).map(key => (
                key !== "image" && (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                      {key.replace(/_/g, ' ')}
                    </label>
                    <input
                      className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={socialForm[key]}
                      onChange={e => setSocialForm({ ...socialForm, [key]: e.target.value })}
                    />
                  </div>
                )
              ))}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Image</label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  onChange={handleImageUpload}
                />
                {socialForm.image && (
                  <img
                    src={`data:image/jpeg;base64,${socialForm.image}`}
                    alt="Social Media"
                    className="mt-2 w-32 h-32 object-cover rounded"
                  />
                )}
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={generateCaption}
                disabled={generatingCaption}
                className={`px-6 py-3 rounded text-white flex items-center gap-2 ${
                  generatingCaption ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                <FiEdit3 />
                Generate Caption
              </button>
              <button
                onClick={postCaption}
                disabled={postingSocial || !caption}
                className={`px-6 py-3 rounded text-white flex items-center gap-2 ${
                  postingSocial || !caption ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
                }`}
              >
                <FiSend />
                Post to Social
              </button>
            </div>
            {caption && (
              <div className="bg-gray-100 p-4 rounded">
                <h3 className="font-semibold mb-2">Generated Caption</h3>
                <p>{caption}</p>
              </div>
            )}
            {postResults && (
              <div className="bg-blue-50 p-4 rounded">
                <h4 className="font-semibold mb-2">Social Media Post Results</h4>
                <ul>
                  {Object.entries(postResults).map(([platform, result]) => (
                    <li key={platform}>
                      <strong>{platform}:</strong> {result}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {message && (
        <div className="mt-4 p-4 bg-green-50 text-green-700 rounded flex items-center">
          <FiCheckCircle className="mr-2" /> {message}
        </div>
      )}
      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-700 rounded flex items-center">
          <FiAlertCircle className="mr-2" /> {error}
        </div>
      )}
    </div>
  );
};

export default Marketing;