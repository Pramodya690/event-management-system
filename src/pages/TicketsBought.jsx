import React from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const TicketsBought = () => {
  const navigate = useNavigate();

  // Mock ticket data (replace with API call when backend is available)
  const mockTickets = [
    {
      id: 1,
      eventId: 1,
      eventName: "Tech Conference 2025",
      quantity: 2,
      price: 50,
      totalCost: 100,
      purchaseDate: "2025-07-20",
      eventDate: "2025-07-25",
    },
    {
      id: 2,
      eventId: 2,
      eventName: "Art Exhibition: Modern Perspectives",
      quantity: 1,
      price: 75,
      totalCost: 75,
      purchaseDate: "2025-07-21",
      eventDate: "2025-07-28",
    },
    {
      id: 3,
      eventId: 3,
      eventName: "Book Club Gathering",
      quantity: 3,
      price: 0,
      totalCost: 0,
      purchaseDate: "2025-07-22",
      eventDate: "2025-07-30",
    },
    {
      id: 4,
      eventId: 4,
      eventName: "Music Festival",
      quantity: 1,
      price: 25,
      totalCost: 25,
      purchaseDate: "2025-07-23",
      eventDate: "2025-07-31",
    },
  ];

  // Format date to "Month Day, Year"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navigation />
      <main className="flex-grow py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Your Purchased Tickets
            </h2>
            <p className="mt-2 text-lg text-gray-600">
              Review your ticket details and explore upcoming events.
            </p>
          </div>
          {mockTickets.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center shadow-sm">
              <p className="text-lg text-gray-600 mb-6">
                You haven't purchased any tickets yet.
              </p>
              <button
                className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300"
                onClick={() => navigate("/events")}
                aria-label="Find events"
              >
                Discover Events
              </button>
            </div>
          ) : (
            <div className="grid gap-6">
              {mockTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        {ticket.eventName}
                      </h3>
                      <p className="text-gray-600">
                        <span className="font-medium">Quantity:</span>{" "}
                        {ticket.quantity}
                      </p>
                      <p className="text-gray-600 mt-2">
                        <span className="font-medium">Event Date:</span>{" "}
                        {formatDate(ticket.eventDate)}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-gray-600">
                        <span className="font-medium">Price per Ticket:</span> $
                        {ticket.price.toFixed(2)}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Total Cost:</span> $
                        {ticket.totalCost.toFixed(2)}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Purchase Date:</span>{" "}
                        {formatDate(ticket.purchaseDate)}
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <button
                      className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300"
                      onClick={() => navigate(`/events/${ticket.eventId}`)}
                      aria-label={`View details for ${ticket.eventName}`}
                    >
                      View Event Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TicketsBought;
