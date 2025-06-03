import React, { useState, useEffect } from "react";

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
    type: "Online event"
  },
  {
    id: 2,
    name: "Tech Conference",
    date: "2025-07-14",
    startTime: "10:00 AM",
    endTime: "05:30 PM",
    timezone: "PDT",
    ticketsSold: 14,
    capacity: 0,
    gross: "$0.00",
    status: "Draft",
    type: "Online event"
  },
  {
    id: 3,
    name: "Art Exhibition",
    date: "2025-07-14",
    startTime: "10:00 AM",
    endTime: "05:30 PM",
    timezone: "PDT",
    ticketsSold: 14,
    capacity: 0,
    gross: "$0.00",
    status: "Draft",
    type: "In-person event"
  }
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
        const dayString = new Date(monthDate.getFullYear(), monthDate.getMonth(), currentDay).toISOString().split("T")[0];
        const eventsForDay = eventList
          .filter((e) => e.date === dayString)
          .map((e) => ({
            id: e.id,
            name: e.name,
            time: e.startTime,
          }));
        week.push({ day: currentDay, events: eventsForDay });
        currentDay++;
      }
    }
    days.push(week);
  }

  return days;
};

const EventsSummary = () => {
  const [view, setView] = useState("list");
  const [search, setSearch] = useState("");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [calendarWeeks, setCalendarWeeks] = useState([]);

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

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search events"
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="flex gap-2">
            <button
              onClick={() => setView("list")}
              className={`px-4 py-2 rounded-md transition ${
                view === "list"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
              }`}
            >
              List
            </button>
            <button
              onClick={() => setView("calendar")}
              className={`px-4 py-2 rounded-md transition ${
                view === "calendar"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
              }`}
            >
              Calendar
            </button>
          </div>
        </div>
        <button className="bg-orange-600 text-white px-6 py-2 rounded-md hover:bg-orange-700 transition shadow-md">
          Create Event
        </button>
      </div>

      {view === "list" ? (
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
          {/* Events List */}
          <div className="divide-y divide-gray-200">
            {filteredEvents.map((event) => (
              <div key={event.id} className="p-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                  {/* Left: Event Title + Info */}
                  <div className="md:w-1/2">
                    <h2 className="text-lg font-bold text-gray-800">{event.name}</h2>
                    <p className="text-sm text-gray-500 mt-1">
                      {formatEventDateTime(event)}
                    </p>
                    <p className="text-sm text-gray-500">{event.type}</p>
                  </div>

                  {/* Right: Event Stats */}
                  <div className="md:w-1/2 ml-auto overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-right text-gray-500 text-sm border-b border-gray-200">
                          <th className="pb-3 font-medium">Sold</th>
                          <th className="pb-3 font-medium">Capacity</th>
                          <th className="pb-3 font-medium">Gross</th>
                          <th className="pb-3 font-medium text-left">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-100 text-right">
                          <td className="py-4 font-medium">{event.ticketsSold}</td>
                          <td className="py-4">{event.capacity || '∞'}</td>
                          <td className="py-4 font-medium">{event.gross}</td>
                          <td className="py-4 text-left">
                            <div className="flex items-center">
                              <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                                event.status === "On Sale" ? "bg-green-500" : "bg-gray-400"
                              }`}></span>
                              <span className="font-medium">{event.status}</span>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 flex justify-end">
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              CSV Export
            </button>
          </div>
        </div>
      ) : (
        // Calendar View
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={prevMonth}
              className="px-3 py-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
            >
              &lt;
            </button>
            <h2 className="text-lg font-semibold text-gray-800">
              {currentMonth.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </h2>
            <button
              onClick={nextMonth}
              className="px-3 py-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
            >
              &gt;
            </button>
          </div>

          {/* Weekday Headers */}
          <div className="grid grid-cols-7 text-sm font-medium text-gray-700 border-b border-gray-200 pb-2 mb-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-center">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-px bg-gray-100 rounded overflow-hidden">
            {calendarWeeks.map((week, weekIndex) => (
              <React.Fragment key={weekIndex}>
                {week.map((dayData, dayIndex) => (
                  <div
                    key={dayIndex}
                    className={`min-h-[100px] p-2 bg-white ${
                      dayData.day === null ? "bg-gray-50" : "hover:bg-gray-50"
                    }`}
                  >
                    {dayData.day !== null && (
                      <>
                        <div className="text-xs text-gray-900 font-semibold text-right mb-1">
                          {dayData.day}
                        </div>
                        <div className="space-y-1">
                          {dayData.events.map((event) => (
                            <div
                              key={event.id}
                              className="text-xs bg-blue-50 text-blue-800 p-1 rounded leading-tight truncate shadow-sm"
                              title={`${event.time} - ${event.name}`}
                            >
                              <div className="font-semibold">{event.time}</div>
                              <div>{event.name}</div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsSummary;
