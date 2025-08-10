import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import axios from "axios";

const TicketsBought = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  
  // localStorage.setItem("loggedInUser", JSON.stringify(user));
const user = JSON.parse(localStorage.getItem("user"));


  // Mock ticket data (replace with API call when backend is available)
  // const mockTickets = [
  //   {
  //     id: 1,
  //     eventId: 1,
  //     eventName: "Tech Conference 2025",
  //     quantity: 2,
  //     price: 50,
  //     totalCost: 100,
  //     purchaseDate: "2025-07-20",
  //     eventDate: "2025-07-25",
  //   },
  //   {
  //     id: 2,
  //     eventId: 2,
  //     eventName: "Art Exhibition: Modern Perspectives",
  //     quantity: 1,
  //     price: 75,
  //     totalCost: 75,
  //     purchaseDate: "2025-07-21",
  //     eventDate: "2025-07-28",
  //   },
  //   {
  //     id: 3,
  //     eventId: 3,
  //     eventName: "Book Club Gathering",
  //     quantity: 3,
  //     price: 0,
  //     totalCost: 0,
  //     purchaseDate: "2025-07-22",
  //     eventDate: "2025-07-30",
  //   },
  //   {
  //     id: 4,
  //     eventId: 4,
  //     eventName: "Music Festival",
  //     quantity: 1,
  //     price: 25,
  //     totalCost: 25,
  //     purchaseDate: "2025-07-23",
  //     eventDate: "2025-07-31",
  //   },
  // ];


useEffect(() => {
  const fetchTickets = async () => {
    if (!user || !user.id) {
      console.error("User not found in localStorage or missing ID");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/api/${user.id}`); 
      setTickets(response.data);
    } catch (error) {
      console.error("Failed to fetch tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchTickets();
}, []);


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

           {loading ? (
            <p>Loading tickets...</p>
          ) : tickets.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center shadow-sm">
              <p className="text-lg text-gray-600 mb-6">
                You haven't purchased any tickets yet.
              </p>
              <button
                className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-md"
                onClick={() => navigate("/")}
              >
                Discover Events
              </button>
            </div>
          ) : (
            <div className="grid gap-6">
              {tickets.map((ticket, i) => (
                <div
                  key={i}
                  className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
                >
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        {ticket.event_name}
                      </h3>
                      <p className="text-gray-600">
                        <span className="font-medium">Quantity:</span>{" "}
                        {ticket.quantity}
                      </p>
                      <p className="text-gray-600 mt-2">
                        <span className="font-medium">Event Date:</span>{" "}
                        {formatDate(ticket.event_date)}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-gray-600">
                        <span className="font-medium">Price per Ticket:</span>{" "}
                        ${Number(ticket.price).toFixed(2)}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Total Cost:</span>{" "}
                        ${Number(ticket.total_price).toFixed(2)}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Purchase Date:</span>{" "}
                        {formatDate(ticket.purchase_date)}
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <button
                      className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg"
                      onClick={() => navigate(`/events/${ticket.event_id}`)}
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
