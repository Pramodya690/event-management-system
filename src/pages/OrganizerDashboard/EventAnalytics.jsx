import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

// Sample event data
const events = [
  {
    id: 1,
    name: "Tech Conference 2025",
    type: "Conference",
    date: "2025-07-15",
    ticketsSold: 310,
    capacity: 500,
    revenue: 15500,
    attendees: 290,
    checkIns: [
      { hour: "9-10 AM", count: 45 },
      { hour: "10-11 AM", count: 85 },
      { hour: "11-12 PM", count: 70 },
      { hour: "12-1 PM", count: 50 },
      { hour: "1-2 PM", count: 25 },
      { hour: "2-3 PM", count: 15 }
    ],
    ticketTypes: [
      { name: "VIP", value: 35, price: 100 },
      { name: "General", value: 55, price: 50 },
      { name: "Student", value: 10, price: 25 }
    ],
    demographics: {
      age: [
        { name: "18-24", value: 25 },
        { name: "25-34", value: 50 },
        { name: "35-44", value: 15 },
        { name: "45+", value: 10 }
      ],
      gender: [
        { name: "Female", value: 35 },
        { name: "Male", value: 60 },
        { name: "Other", value: 5 }
      ],
      location: [
        { city: "Colombo", attendees: 120 },
        { city: "Kandy", attendees: 80 },
        { city: "Galle", attendees: 50 },
        { city: "Other", attendees: 40 }
      ]
    }
  },
  {
    id: 2,
    name: "Music Festival",
    type: "Festival",
    date: "2025-08-20",
    ticketsSold: 1200,
    capacity: 1500,
    revenue: 36000,
    attendees: 1150,
    checkIns: [
      { hour: "12-1 PM", count: 150 },
      { hour: "1-2 PM", count: 250 },
      { hour: "2-3 PM", count: 300 },
      { hour: "3-4 PM", count: 250 },
      { hour: "4-5 PM", count: 150 },
      { hour: "5-6 PM", count: 50 }
    ],
    ticketTypes: [
      { name: "VIP", value: 15, price: 150 },
      { name: "General", value: 75, price: 30 },
      { name: "Early Bird", value: 10, price: 20 }
    ],
    demographics: {
      age: [
        { name: "18-24", value: 60 },
        { name: "25-34", value: 30 },
        { name: "35-44", value: 8 },
        { name: "45+", value: 2 }
      ],
      gender: [
        { name: "Female", value: 55 },
        { name: "Male", value: 42 },
        { name: "Other", value: 3 }
      ],
      location: [
        { city: "Colombo", attendees: 600 },
        { city: "Kandy", attendees: 300 },
        { city: "Galle", attendees: 150 },
        { city: "Other", attendees: 100 }
      ]
    }
  },
  {
    id: 3,
    name: "Art Exhibition",
    type: "Exhibition",
    date: "2025-09-05",
    ticketsSold: 180,
    capacity: 200,
    revenue: 3600,
    attendees: 170,
    checkIns: [
      { hour: "10-11 AM", count: 30 },
      { hour: "11-12 PM", count: 50 },
      { hour: "12-1 PM", count: 40 },
      { hour: "1-2 PM", count: 30 },
      { hour: "2-3 PM", count: 20 }
    ],
    ticketTypes: [
      { name: "General", value: 85, price: 20 },
      { name: "Student", value: 15, price: 10 }
    ],
    demographics: {
      age: [
        { name: "18-24", value: 20 },
        { name: "25-34", value: 35 },
        { name: "35-44", value: 25 },
        { name: "45+", value: 20 }
      ],
      gender: [
        { name: "Female", value: 65 },
        { name: "Male", value: 32 },
        { name: "Other", value: 3 }
      ],
      location: [
        { city: "Colombo", attendees: 100 },
        { city: "Kandy", attendees: 40 },
        { city: "Galle", attendees: 20 },
        { city: "Other", attendees: 10 }
      ]
    }
  }
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

const EventAnalytics = () => {
  const [selectedEvent, setSelectedEvent] = useState(events[0]);
  const [compareMode, setCompareMode] = useState(false);
  const [comparedEvents, setComparedEvents] = useState([]);
  const [timeRange, setTimeRange] = useState("month");

  const toggleCompareEvent = (event) => {
    if (comparedEvents.some(e => e.id === event.id)) {
      setComparedEvents(comparedEvents.filter(e => e.id !== event.id));
    } else {
      if (comparedEvents.length < 2) {
        setComparedEvents([...comparedEvents, event]);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Event Analytics Dashboard</h1>
            <p className="text-gray-600">Detailed analytics for your events</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-4">
            <div className="relative">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              >
                <option value="week">Last 7 days</option>
                <option value="month">Last 30 days</option>
                <option value="quarter">Last 90 days</option>
                <option value="year">Last 12 months</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
            <button className="bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition shadow-sm text-sm">
              Export Report
            </button>
          </div>
        </div>

        {/* Event Selector */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="w-full md:w-auto">
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Event</label>
              <select
                value={selectedEvent.id}
                onChange={(e) => {
                  const event = events.find(ev => ev.id === parseInt(e.target.value));
                  setSelectedEvent(event);
                }}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              >
                {events.map((event) => (
                  <option key={event.id} value={event.id}>
                    {event.name} ({new Date(event.date).toLocaleDateString()})
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={compareMode}
                  onChange={() => setCompareMode(!compareMode)}
                  className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">Compare Events</span>
              </label>
              {compareMode && (
                <div className="flex gap-2">
                  {events.map((event) => (
                    <button
                      key={event.id}
                      onClick={() => toggleCompareEvent(event)}
                      className={`px-3 py-1 text-sm rounded-full border ${
                        comparedEvents.some(e => e.id === event.id)
                          ? "bg-sky-100 border-sky-500 text-sky-700"
                          : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {event.name.substring(0, 12)}...
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Tickets Sold</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                    {selectedEvent.ticketsSold}
                    {compareMode && comparedEvents.length > 0 && (
                    <span className="text-sm text-gray-500 ml-2">
                        (
                        {(
                        (selectedEvent.ticketsSold /
                            comparedEvents.reduce((sum, e) => sum + e.ticketsSold, 0)) *
                        100
                        ).toFixed(1)}
                        %)
                    </span>
                    )}
                </p>
                </div>

              <div className="p-3 bg-blue-50 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
              </div>
            </div>
            <p className="text-xs text-green-600 mt-2 flex items-center">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
              {Math.round((selectedEvent.ticketsSold / selectedEvent.capacity) * 100)}% of capacity
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                    ${selectedEvent.revenue.toLocaleString()}
                    {compareMode && comparedEvents.length > 0 && (
                    <span className="text-sm text-gray-500 ml-2">
                        (
                        {(
                        (selectedEvent.revenue /
                            comparedEvents.reduce((sum, e) => sum + e.revenue, 0)) *
                        100
                        ).toFixed(1)}
                        %)
                    </span>
                    )}
                </p>
                </div>

              <div className="p-3 bg-green-50 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-xs text-green-600 mt-2 flex items-center">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
              Avg. ${Math.round(selectedEvent.revenue / selectedEvent.ticketsSold)} per ticket
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Attendance Rate</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {Math.round((selectedEvent.attendees / selectedEvent.ticketsSold) * 100)}%
                  {compareMode && comparedEvents.length > 0 && (
                    <span className="text-sm text-gray-500 ml-2">
                      (vs {Math.round((comparedEvents.reduce((sum, e) => sum + e.attendees, 0) / comparedEvents.reduce((sum, e) => sum + e.ticketsSold, 0)) * 100)}%)
                    </span>
                  )}
                </p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {selectedEvent.attendees} attended of {selectedEvent.ticketsSold} sold
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Event Type</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{selectedEvent.type}</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {new Date(selectedEvent.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Ticket Sales by Type */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Ticket Sales by Type</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={selectedEvent.ticketTypes}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {selectedEvent.ticketTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name, props) => [`${value} tickets ($${props.payload.price * value})`, name]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Check-in Times */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Check-in Times</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={selectedEvent.checkIns}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#4F46E5" name="Check-ins" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Demographics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Age Distribution */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Age Distribution</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={selectedEvent.demographics.age}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    <Cell fill="#3B82F6" />
                    <Cell fill="#10B981" />
                    <Cell fill="#F59E0B" />
                    <Cell fill="#EF4444" />
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Gender Distribution */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Gender Distribution</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={selectedEvent.demographics.gender}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    <Cell fill="#EC4899" />
                    <Cell fill="#3B82F6" />
                    <Cell fill="#8B5CF6" />
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Location Distribution */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Location Distribution</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={selectedEvent.demographics.location}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="city" width={80} />
                  <Tooltip />
                  <Bar dataKey="attendees" fill="#8B5CF6" name="Attendees" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Comparison Section (when in compare mode) */}
        {compareMode && comparedEvents.length > 0 && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Event Comparison</h2>
            
            {/* Comparison Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Tickets Sold</h3>
                <div className="space-y-2">
                  {[selectedEvent, ...comparedEvents].map((event, index) => (
                    <div key={event.id} className="flex items-center justify-between">
                      <span className={`text-sm ${index === 0 ? 'font-bold text-sky-600' : 'text-gray-700'}`}>
                        {event.name.substring(0, 15)}...
                      </span>
                      <span className="font-medium">{event.ticketsSold}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Revenue</h3>
                <div className="space-y-2">
                  {[selectedEvent, ...comparedEvents].map((event, index) => (
                    <div key={event.id} className="flex items-center justify-between">
                      <span className={`text-sm ${index === 0 ? 'font-bold text-sky-600' : 'text-gray-700'}`}>
                        {event.name.substring(0, 15)}...
                      </span>
                      <span className="font-medium">${event.revenue.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Attendance Rate</h3>
                <div className="space-y-2">
                  {[selectedEvent, ...comparedEvents].map((event, index) => (
                    <div key={event.id} className="flex items-center justify-between">
                      <span className={`text-sm ${index === 0 ? 'font-bold text-sky-600' : 'text-gray-700'}`}>
                        {event.name.substring(0, 15)}...
                      </span>
                      <span className="font-medium">
                        {Math.round((event.attendees / event.ticketsSold) * 100)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Avg. Ticket Price</h3>
                <div className="space-y-2">
                  {[selectedEvent, ...comparedEvents].map((event, index) => (
                    <div key={event.id} className="flex items-center justify-between">
                      <span className={`text-sm ${index === 0 ? 'font-bold text-sky-600' : 'text-gray-700'}`}>
                        {event.name.substring(0, 15)}...
                      </span>
                      <span className="font-medium">
                        ${Math.round(event.revenue / event.ticketsSold)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Comparison Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-md font-medium text-gray-700 mb-4">Tickets Sold Comparison</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[selectedEvent, ...comparedEvents].map(event => ({
                        name: event.name.substring(0, 12) + '...',
                        tickets: event.ticketsSold,
                        revenue: event.revenue
                      }))}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="tickets" fill="#0284C7" name="Tickets Sold" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-md font-medium text-gray-700 mb-4">Revenue Comparison</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[selectedEvent, ...comparedEvents].map(event => ({
                        name: event.name.substring(0, 12) + '...',
                        tickets: event.ticketsSold,
                        revenue: event.revenue
                      }))}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="revenue" fill="#10B981" name="Revenue ($)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventAnalytics;