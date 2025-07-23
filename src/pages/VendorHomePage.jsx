import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  //   FaCalendarMonth,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaExclamationCircle,
} from "react-icons/fa";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const VendorHomePage = () => {
  const navigate = useNavigate();

  // Mock event data
  const mockEvents = [
    {
      id: 1,
      eventName: "Tech Conference 2025",
      date: { month: "July", day: "23", year: "2025", fullDate: "2025-07-23" },
      location: "San Francisco, CA",
      stalls: 50,
      bannerImage: "/tech-conference.jpeg",
    },
    {
      id: 2,
      eventName: "Art Exhibition",
      date: {
        month: "August",
        day: "10",
        year: "2025",
        fullDate: "2025-08-10",
      },
      location: "New York, NY",
      stalls: 30,
      bannerImage: "/art-exhibition.jpeg",
    },
    {
      id: 3,
      eventName: "Food & Wine Festival",
      date: {
        month: "September",
        day: "15",
        year: "2025",
        fullDate: "2025-09-15",
      },
      location: "Napa Valley, CA",
      stalls: 40,
      bannerImage: "/food-wine-festival.jpeg",
    },
  ];

  // Contact form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    eventId: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.eventId) {
      newErrors.eventId = "Please select an event";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    alert("Message sent to organizer (mock action).");
    setFormData({ name: "", email: "", eventId: "", message: "" });
    setErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  return (
    <div className="min-h-screen bg-sky-50 flex flex-col">
      <Navigation />
      <main className="flex-grow">
        <div className="max-w-6xl mx-auto my-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1
              className="text-4xl font-bold text-gray-900 mb-4"
              style={{
                fontFamily:
                  "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
              }}
            >
              Vendor Opportunities
            </h1>
            <p className="text-lg text-gray-600">
              Explore upcoming events and connect with organizers to showcase
              your products.
            </p>
            <button
              className="mt-4 bg-sky-600 hover:bg-sky-700 text-white py-2 px-6 rounded-lg font-semibold text-lg transition-all duration-300 focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
              onClick={() => navigate("/find-events")}
              aria-label="Explore more events"
            >
              Browse All Events
            </button>
          </div>

          {/* Events Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Featured Events
            </h2>
            {mockEvents.length === 0 ? (
              <div className="bg-white border border-sky-200 rounded-xl p-8 text-center">
                <p className="text-gray-600">
                  No events available at the moment.
                </p>
                <p className="text-gray-500 mt-2">
                  Check back soon or{" "}
                  <a
                    href="/contact-us"
                    className="text-sky-600 hover:text-sky-700"
                  >
                    contact us
                  </a>{" "}
                  for updates.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-6">
                {mockEvents.map((event) => (
                  <div
                    key={event.id}
                    className="bg-white border border-sky-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <img
                      src={event.bannerImage}
                      alt={`${event.eventName} banner`}
                      className="w-full h-48 object-cover rounded-t-xl"
                      onError={(e) =>
                        (e.target.src =
                          "https://via.placeholder.com/400x200?text=Event+Banner")
                      }
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {event.eventName}
                      </h3>
                      <div className="flex items-center gap-2 text-gray-600 mb-2">
                        {/* <FaCalendarMonth className="text-sky-600" /> */}
                        <span>
                          {event.date.month} {event.date.day}, {event.date.year}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 mb-4">
                        <FaMapMarkerAlt className="text-sky-600" />
                        <span>{event.location}</span>
                      </div>
                      <p className="text-gray-700 mb-4">
                        {event.stalls} stalls available
                      </p>
                      <button
                        className="w-full bg-sky-600 hover:bg-sky-700 text-white py-2 rounded-lg font-medium transition-all duration-300 focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                        onClick={() => navigate(`/events/${event.id}`)}
                        aria-label={`View details for ${event.eventName}`}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Contact Organizers Section */}
          <div className="bg-white border border-sky-200 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Contact Event Organizers
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className="w-full p-3 border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300"
                      aria-label="Full name"
                    />
                    {errors.name && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                        <FaExclamationCircle className="text-red-500" />
                        <span className="text-red-500 text-sm">
                          {errors.name}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      className="w-full p-3 border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300"
                      aria-label="Email address"
                    />
                    {errors.email && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                        <FaExclamationCircle className="text-red-500" />
                        <span className="text-red-500 text-sm">
                          {errors.email}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Select Event
                </label>
                <div className="relative">
                  <select
                    name="eventId"
                    value={formData.eventId}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300 appearance-none"
                    aria-label="Select event"
                  >
                    <option value="">Choose an event</option>
                    {mockEvents.map((event) => (
                      <option key={event.id} value={event.id}>
                        {event.eventName}
                      </option>
                    ))}
                  </select>
                  {errors.eventId && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                      <FaExclamationCircle className="text-red-500" />
                      <span className="text-red-500 text-sm">
                        {errors.eventId}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Message
                </label>
                <div className="relative">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Describe your interest or inquiry (e.g., stall booking, sponsorship)"
                    className="w-full p-3 border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300 h-32 resize-none"
                    aria-label="Message to organizer"
                  />
                  {errors.message && (
                    <div className="absolute right-3 top-4 flex items-center gap-1">
                      <FaExclamationCircle className="text-red-500" />
                      <span className="text-red-500 text-sm">
                        {errors.message}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-sky-600 hover:bg-sky-700 text-white py-3 rounded-lg font-semibold text-lg flex items-center justify-center gap-2 transition-all duration-300 focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                aria-label="Send message to organizer"
              >
                <FaPaperPlane />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VendorHomePage;
