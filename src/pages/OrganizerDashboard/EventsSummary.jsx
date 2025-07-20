import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Sample Events Data
const events = [
  {
    id: 1,
    name: "Book Club Gathering",
    date: "2025-07-03",
    startTime: "10:00 AM",
    endTime: "11:30 AM",
    timezone: "PDT",
    ticketsSold: 3,
    capacity: 100,
    gross: "$0.00",
    status: "On Sale",
    type: "Online event",
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 2,
    name: "Tech Conference 2025",
    date: "2025-07-14",
    startTime: "10:00 AM",
    endTime: "05:30 PM",
    timezone: "PDT",
    ticketsSold: 14,
    capacity: 0,
    gross: "$1,400.00",
    status: "Draft",
    type: "Online event",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 3,
    name: "Art Exhibition: Modern Perspectives",
    date: "2025-07-14",
    startTime: "10:00 AM",
    endTime: "05:30 PM",
    timezone: "PDT",
    ticketsSold: 14,
    capacity: 200,
    gross: "$2,800.00",
    status: "On Sale",
    type: "In-person event",
    image:
      "https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 4,
    name: "Music Festival",
    date: "2025-07-21",
    startTime: "12:00 PM",
    endTime: "10:00 PM",
    timezone: "PDT",
    ticketsSold: 245,
    capacity: 500,
    gross: "$12,250.00",
    status: "On Sale",
    type: "In-person event",
    image:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 5,
    name: "Workshop: Digital Marketing",
    date: "2025-07-08",
    startTime: "02:00 PM",
    endTime: "04:30 PM",
    timezone: "PDT",
    ticketsSold: 18,
    capacity: 30,
    gross: "$900.00",
    status: "On Sale",
    type: "Online event",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
];

// Utility to build calendar grid
const buildCalendarWeeks = (monthDate, eventList) => {
  const start = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
  const end = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0);

  const startDay = start.getDay(); // 0-6
  const totalDays = end.getDate();

  const days = [];
  let currentDay = 1;

  // Build 6 weeks (42 days) for the calendar grid
  for (let i = 0; i < 6; i++) {
    const week = [];
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < startDay) {
        week.push({ day: null, events: [] });
      } else if (currentDay > totalDays) {
        week.push({ day: null, events: [] });
      } else {
        const dayString = new Date(
          monthDate.getFullYear(),
          monthDate.getMonth(),
          currentDay
        )
          .toISOString()
          .split("T")[0];
        const eventsForDay = eventList
          .filter((e) => e.date === dayString)
          .map((e) => ({
            id: e.id,
            name: e.name,
            time: e.startTime,
            type: e.type,
          }));
        week.push({ day: currentDay, events: eventsForDay });
        currentDay++;
      }
    }
    days.push(week);
  }

  return days;
};

const statusStyles = {
  "On Sale": "bg-green-100 text-green-800",
  Draft: "bg-gray-100 text-gray-800",
  Cancelled: "bg-red-100 text-red-800",
  "Sold Out": "bg-yellow-100 text-yellow-800",
};

const EventsSummary = () => {
  const [view, setView] = useState("list");
  const [search, setSearch] = useState("");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [calendarWeeks, setCalendarWeeks] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);

  useEffect(() => {
    setCalendarWeeks(buildCalendarWeeks(currentMonth, events));
  }, [currentMonth]);

  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(search.toLowerCase())
  );

  const formatEventDateTime = (event) => {
    const date = new Date(event.date);
    const dateString = date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return `${dateString} at ${event.startTime} - ${event.endTime} ${event.timezone}`;
  };

  const prevMonth = () => {
    const prev = new Date(currentMonth);
    prev.setMonth(prev.getMonth() - 1);
    setCurrentMonth(prev);
  };

  const nextMonth = () => {
    const next = new Date(currentMonth);
    next.setMonth(next.getMonth() + 1);
    setCurrentMonth(next);
  };

  const openEventDetails = (event) => {
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  const closeEventModal = () => {
    setShowEventModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-gray-800 hidden md:block">
            Event Dashboard
          </h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search events..."
              className="pl-10 pr-4 py-2 w-full md:w-64 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setView("list")}
              className={`px-4 py-2 rounded-lg transition-all ${
                view === "list"
                  ? "bg-sky-500 text-white shadow-md hover:bg-sky-600"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 hover:border-gray-400"
              }`}
            >
              List View
            </button>
            <button
              onClick={() => setView("calendar")}
              className={`px-4 py-2 rounded-lg transition-all ${
                view === "calendar"
                  ? "bg-sky-500 text-white shadow-md hover:bg-sky-600"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 hover:border-gray-400"
              }`}
            >
              Calendar View
            </button>
          </div>
        </div>
        <button className="bg-sky-500 text-white px-6 py-2 rounded-lg hover:bg-sky-600 transition-all shadow-md hover:shadow-lg flex items-center gap-2">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Create Event
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="text-gray-500 text-sm font-medium">Total Events</div>
          <div className="text-2xl font-bold text-gray-800 mt-1">
            {events.length}
          </div>
          <div className="text-xs text-green-600 mt-1 flex items-center">
            <svg
              className="w-3 h-3 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
              />
            </svg>
            12% from last month
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="text-gray-500 text-sm font-medium">Tickets Sold</div>
          <div className="text-2xl font-bold text-gray-800 mt-1">
            {events.reduce((sum, event) => sum + event.ticketsSold, 0)}
          </div>
          <div className="text-xs text-green-600 mt-1 flex items-center">
            <svg
              className="w-3 h-3 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
              />
            </svg>
            24% from last month
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="text-gray-500 text-sm font-medium">Total Revenue</div>
          <div className="text-2xl font-bold text-gray-800 mt-1">
            $
            {events
              .reduce(
                (sum, event) =>
                  sum + parseFloat(event.gross.replace(/[^0-9.]/g, "")),
                0
              )
              .toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </div>
          <div className="text-xs text-green-600 mt-1 flex items-center">
            <svg
              className="w-3 h-3 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
              />
            </svg>
            8% from last month
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="text-gray-500 text-sm font-medium">
            Upcoming Events
          </div>
          <div className="text-2xl font-bold text-gray-800 mt-1">
            {events.filter((e) => new Date(e.date) >= new Date()).length}
          </div>
          <div className="text-xs text-gray-500 mt-1">Next 30 days</div>
        </div>
      </div>

      {view === "list" ? (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
          {/* Events List Header */}
          <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">All Events</h2>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <select className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-1.5 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500">
                  <option>All Status</option>
                  <option>On Sale</option>
                  <option>Draft</option>
                  <option>Sold Out</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              <div className="relative">
                <select className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-1.5 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500">
                  <option>All Types</option>
                  <option>Online</option>
                  <option>In-person</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Events List */}
          <div className="divide-y divide-gray-200">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="p-6 hover:bg-gray-50 transition cursor-pointer"
                  onClick={() => openEventDetails(event)}
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Event Image */}
                    <div className="w-full md:w-48 flex-shrink-0">
                      <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                        <img
                          src={event.image}
                          alt={event.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Event Details */}
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:justify-between gap-4">
                        {/* Left: Event Title + Info */}
                        <div className="md:w-2/3">
                          <h2 className="text-lg font-bold text-gray-800 hover:text-sky-600 transition">
                            {event.name}
                          </h2>
                          <p className="text-sm text-gray-500 mt-1">
                            {formatEventDateTime(event)}
                          </p>
                          <div className="mt-2 flex items-center gap-2">
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${
                                statusStyles[event.status]
                              }`}
                            >
                              {event.status}
                            </span>
                            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded-full">
                              {event.type}
                            </span>
                          </div>
                        </div>

                        {/* Right: Event Stats */}
                        <div className="md:w-1/3">
                          <div className="grid grid-cols-3 gap-2 text-center">
                            <div>
                              <div className="text-sm text-gray-500">Sold</div>
                              <div className="font-bold text-gray-800">
                                {event.ticketsSold}
                              </div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-500">
                                Capacity
                              </div>
                              <div className="font-bold text-gray-800">
                                {event.capacity || "∞"}
                              </div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-500">
                                Revenue
                              </div>
                              <div className="font-bold text-gray-800">
                                {event.gross}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  No events found
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try adjusting your search or filter to find what you're
                  looking for.
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 flex justify-between items-center bg-gray-50">
            <div className="text-sm text-gray-500">
              Showing <span className="font-medium">1</span> to{" "}
              <span className="font-medium">{filteredEvents.length}</span> of{" "}
              <span className="font-medium">{events.length}</span> events
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 transition">
                Previous
              </button>
              <button className="px-3 py-1 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 transition">
                Next
              </button>
            </div>
          </div>
        </div>
      ) : (
        // Calendar View
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={prevMonth}
              className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 transition flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Previous
            </button>
            <h2 className="text-xl font-semibold text-gray-800">
              {currentMonth.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </h2>
            <button
              onClick={nextMonth}
              className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 transition flex items-center gap-2"
            >
              Next
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Weekday Headers */}
          <div className="grid grid-cols-7 text-sm font-medium text-gray-500 mb-2">
            {[
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ].map((day) => (
              <div key={day} className="text-center p-2">
                {day.substring(0, 3)}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden border border-gray-200">
            {calendarWeeks.map((week, weekIndex) => (
              <React.Fragment key={weekIndex}>
                {week.map((dayData, dayIndex) => {
                  const isToday =
                    dayData.day === new Date().getDate() &&
                    currentMonth.getMonth() === new Date().getMonth() &&
                    currentMonth.getFullYear() === new Date().getFullYear();
                  return (
                    <div
                      key={dayIndex}
                      className={`min-h-[120px] p-2 bg-white ${
                        dayData.day === null ? "bg-gray-50" : "hover:bg-gray-50"
                      } ${isToday ? "border-2 border-sky-500" : ""}`}
                    >
                      {dayData.day !== null && (
                        <>
                          <div
                            className={`text-sm mb-1 text-right ${
                              isToday
                                ? "bg-sky-500 text-white rounded-full w-6 h-6 flex items-center justify-center ml-auto"
                                : "text-gray-900"
                            }`}
                          >
                            {dayData.day}
                          </div>
                          <div className="space-y-1 overflow-y-auto max-h-[90px]">
                            {dayData.events.map((event) => (
                              <div
                                key={event.id}
                                className={`text-xs p-1 rounded leading-tight truncate shadow-sm cursor-pointer ${
                                  event.type === "Online event"
                                    ? "bg-purple-50 text-purple-800 hover:bg-purple-100"
                                    : "bg-green-50 text-green-800 hover:bg-green-100"
                                }`}
                                title={`${event.time} - ${event.name}`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const evt = events.find(
                                    (e) => e.id === event.id
                                  );
                                  if (evt) openEventDetails(evt);
                                }}
                              >
                                <div className="font-semibold">
                                  {event.time}
                                </div>
                                <div className="truncate">{event.name}</div>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* Event Detail Modal */}
      {showEventModal && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {selectedEvent.name}
                  </h2>
                  <p className="text-gray-600 mt-1">
                    {formatEventDateTime(selectedEvent)}
                  </p>
                </div>
                <button
                  onClick={closeEventModal}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden bg-gray-100">
                    <img
                      src={selectedEvent.image}
                      alt={selectedEvent.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Event Description
                    </h3>
                    <p className="text-gray-600 mt-2">
                      This is a detailed description of the event. It should
                      provide all the necessary information attendees might
                      need, including what to expect, any special guests or
                      features, and what they should bring or prepare for the
                      event.
                    </p>
                  </div>
                </div>

                <div>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Event Details
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">
                          Status
                        </h4>
                        <div className="mt-1 flex items-center">
                          <span
                            className={`inline-block w-2 h-2 rounded-full mr-2 ${
                              selectedEvent.status === "On Sale"
                                ? "bg-green-500"
                                : "bg-gray-400"
                            }`}
                          ></span>
                          <span className="font-medium">
                            {selectedEvent.status}
                          </span>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-500">
                          Event Type
                        </h4>
                        <p className="mt-1 font-medium">{selectedEvent.type}</p>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-500">
                          Location
                        </h4>
                        <p className="mt-1 font-medium">
                          {selectedEvent.type === "Online event"
                            ? "Virtual Event"
                            : "Venue Name, City, State"}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">
                            Tickets Sold
                          </h4>
                          <p className="mt-1 font-medium">
                            {selectedEvent.ticketsSold}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">
                            Capacity
                          </h4>
                          <p className="mt-1 font-medium">
                            {selectedEvent.capacity || "Unlimited"}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">
                            Revenue
                          </h4>
                          <p className="mt-1 font-medium">
                            {selectedEvent.gross}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">
                            Timezone
                          </h4>
                          <p className="mt-1 font-medium">
                            {selectedEvent.timezone}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 space-y-3">
                      <button className="w-full bg-sky-600 text-white py-2 px-4 rounded-lg hover:bg-sky-700 transition">
                        View Event Page
                      </button>
                      <button className="w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition">
                        Edit Event
                      </button>
                      <button className="w-full bg-white border border-red-300 text-red-600 py-2 px-4 rounded-lg hover:bg-red-50 transition">
                        Cancel Event
                      </button>
                    </div>
                    {/* Feature Toggles */}
                    <div className="p-4 border border-sky-300 rounded-lg">
                      <label className="font-semibold block mb-2">
                        Optional Features
                      </label>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={enableAgenda}
                            onChange={() => setEnableAgenda(!enableAgenda)}
                          />
                          Enable Agenda Upload
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={enableStallAllocation}
                            onChange={() =>
                              setEnableStallAllocation(!enableStallAllocation)
                            }
                          />
                          Enable Stall Allocation
                        </label>
                      </div>
                    </div>

                    {/* Upload Agenda */}
                    {enableAgenda && (
                      <div className="p-4 border border-sky-300 rounded-lg space-y-4">
                        <label className="font-semibold block mb-1">
                          Upload Agenda
                        </label>
                        <p className="text-sm text-gray-500 mb-2">
                          Upload a detailed agenda so attendees know what
                          sessions to expect.
                        </p>
                        <input
                          type="file"
                          accept=".pdf,image/*"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              setForm((prev) => ({ ...prev, agenda: file }));
                            }
                          }}
                        />
                        {form.agenda && (
                          <p className="mt-2 text-sm text-green-600">
                            {form.agenda.name} selected
                          </p>
                        )}
                      </div>
                    )}

                    {/* Stall Allocation */}
                    {enableStallAllocation && (
                      <div className="p-4 border border-sky-300 rounded-lg">
                        <label className="font-semibold block mb-2">
                          Stall Allocation
                        </label>
                        <p className="text-sm text-gray-500 mb-3">
                          Visualize and auto-generate stall positions using your
                          uploaded layout.
                        </p>

                        <div className="mb-4">
                          <label className="block mb-2">Upload Place Map</label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files[0];
                              if (file) {
                                setForm((prev) => ({
                                  ...prev,
                                  placeMap: file,
                                }));
                                setStallMapPreview(URL.createObjectURL(file));
                              }
                            }}
                          />
                          {stallMapPreview && (
                            <img
                              src={stallMapPreview}
                              alt="Stall Map Preview"
                              className="mt-2 max-h-48 rounded border"
                            />
                          )}
                        </div>

                        <div className="mb-4">
                          <input
                            type="number"
                            name="stalls"
                            value={form.stalls}
                            onChange={(e) =>
                              setForm((prev) => ({
                                ...prev,
                                [e.target.name]: e.target.value,
                              }))
                            }
                            placeholder="Number of Stalls"
                            min="1"
                            className="w-full border rounded px-3 py-2"
                          />
                        </div>

                        <div className="bg-gray-100 border border-dashed border-gray-400 h-64 rounded flex items-center justify-center text-gray-500 mb-4">
                          {form.placeMap ? (
                            <img
                              src={stallMapPreview}
                              alt="Stall Allocation Preview"
                              className="max-h-full object-contain"
                            />
                          ) : (
                            <span>
                              Upload a map to see stall allocation here.
                            </span>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            alert(
                              "In the future, this button will use AI to auto-allocate stalls."
                            )
                          }
                          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:opacity-50"
                          disabled={!form.stalls || !form.placeMap}
                        >
                          Generate Stall Allocation with AI
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsSummary;
