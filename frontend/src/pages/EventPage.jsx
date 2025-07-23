import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdCalendarMonth, MdShare, MdBookmarkBorder } from "react-icons/md";
import { IoLocationSharp, IoTimeOutline } from "react-icons/io5";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const EventPage = ({ event }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    // State for tickets selection & purchase flow
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [confirmed, setConfirmed] = useState(false);

  // localStorage.setItem("loggedInUser", JSON.stringify(user)); // `user` should contain `id`, `email`, etc.
const user = JSON.parse(localStorage.getItem("user"));


  const handlePurchase = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/purchaseTicket", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        attendeeId: user.id, // You'll need to pass this from context or localStorage
        ticketId: selectedTicket.id,
        quantity: ticketQuantity,
      }),
    });

    const result = await res.json();

    if (result.success) {
      navigate("/payment", {
        state: {
          ticket: {
            ...selectedTicket,
            quantity: ticketQuantity,
          },
        },
      });
    } else {
      alert(result.error);
    }
  } catch (error) {
    console.error("Purchase error:", error);
    alert("An error occurred while purchasing.");
  }
};

// const handlePurchase = async () => {
//   if (!user) {
//     alert("You must be logged in to purchase tickets.");
//     navigate("/login");
//     return;
//   }

//   try {
//     const res = await fetch("http://localhost:5000/api/purchaseTicket", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         attendeeId: user.id,
//         ticketId: selectedTicket.id,
//         quantity: ticketQuantity,
//       }),
//     });

//     const result = await res.json();

//     if (result.success) {
//       navigate("/payment", {
//         state: {
//           ticket: {
//             ...selectedTicket,
//             quantity: ticketQuantity,
//           },
//         },
//       });
//     } else {
//       alert(result.error);
//     }
//   } catch (error) {
//     console.error("Purchase error:", error);
//     alert("An error occurred while purchasing.");
//   }
// };



  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/events/${id}`);
        const data = await res.json();

        // Transform single event object
        const transformed = {
          id: data.id,
          eventName: data.event_title || "Untitled Event",
          date: {
            day: new Date(data.date).getDate(),
            month: new Date(data.date).toLocaleString("default", { month: "long" }),
            year: new Date(data.date).getFullYear(),
            fullDate: data.date,
          },
          time: data.time,
          location: data.location,
          description: data.description,
          tags: Array.isArray(data.tags)
            ? data.tags
            : typeof data.tags === "string"
            ? data.tags.split(",").map((t) => t.trim())
            : [],
          faqs: data.faqs || "",
        //   tickets data
          tickets: Array.isArray(data.tickets) ? data.tickets : [],
        //   organizer: data.organizer,
        //   email: data.email,
        //   contact_number: data.contact_number,
          bannerImage: data.banner_image
            ? `data:image/jpeg;base64,${btoa(
                new Uint8Array(data.banner_image.data).reduce(
                  (acc, byte) => acc + String.fromCharCode(byte),
                  ""
                )
              )}`
            : "https://via.placeholder.com/1200x300?text=Event+Banner",
        };

        setEventData(transformed);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch event.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) return <div className="p-8 text-center">Loading event...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  const data = eventData || {};

  return (
    <div className="min-h-screen bg-sky-50 flex flex-col">
      <Navigation />

      <main className="flex-grow">
        <div className="max-w-6xl mx-auto bg-white shadow-lg border border-sky-200 rounded-xl overflow-hidden my-8">
          {/* Banner */}
          <div className="w-full h-64 bg-sky-100 flex items-center justify-center relative">
            <img
              src={data.bannerImage}
              alt="Event banner"
              className="w-full h-full object-cover"
              onError={(e) =>
                (e.target.src =
                  "https://via.placeholder.com/1200x300?text=Event+Banner")
              }
            />
            <div className="absolute top-4 right-4 flex space-x-2">
              <button className="p-2 bg-white rounded-full shadow-md hover:bg-sky-50">
                <MdShare className="text-sky-600 text-xl" />
              </button>
              <button className="p-2 bg-white rounded-full shadow-md hover:bg-sky-50">
                <MdBookmarkBorder className="text-sky-600 text-xl" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 flex gap-8">
            {/* Left: Event Info */}
            <div className="w-2/3">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {data.eventName}
              </h1>

              {/* Date, Time, Location */}
              <div className="flex items-center gap-4 mb-6 text-gray-600">
                <div className="flex items-center gap-2">
                  <MdCalendarMonth className="text-xl text-sky-600" />
                  <span>
                    {data.date?.month} {data.date?.day}, {data.date?.year}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <IoTimeOutline className="text-xl text-sky-600" />
                  <span>{data.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <IoLocationSharp className="text-xl text-sky-600" />
                  <span>{data.location}</span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-3 text-gray-800">
                  About This Event
                </h2>
                <p className="text-gray-700 whitespace-pre-line">
                  {data.description}
                </p>
              </div>

              {/* Tags */}
              {data.tags?.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-3 text-gray-800">
                    Event Tags
                  </h2>
                  <div className="flex gap-2 flex-wrap">
                    {data.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-sky-100 text-sky-800 px-3 py-1 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQs */}
              {data.faqs && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-3 text-gray-800">
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-4">
                    {data.faqs.split("\n").map((faq, index) => (
                      <div key={index} className="border-b border-sky-200 pb-4">
                        <p className="font-medium text-gray-900">{faq}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right: Sidebar */}
            {/* get tickets section */}
            <div className="w-1/3">
                    <div className="sticky top-4 bg-sky-50 border border-sky-200 rounded-lg p-6 shadow-sm">
                        <h2 className="text-xl font-bold mb-4 text-gray-900">Get Tickets</h2>

                        {data.tickets && data.tickets.length > 0 ? (
                        <div className="space-y-4">
                            {data.tickets.map((ticket, index) => {
                            const isSelected = selectedTicket?.name === ticket.name;

                            return (
                                <div
                                key={index}
                                className={`border rounded-lg p-4 transition-all duration-300 mb-4 ${
                                    isSelected
                                    ? "border-sky-500 bg-sky-100"
                                    : "border-sky-300 hover:border-sky-400"
                                }`}
                                >
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                    <h3 className="font-semibold text-gray-900">
                                        🎟️ {ticket.name || "Untitled Ticket"}
                                    </h3>
                                    <p className="text-sm text-gray-500 capitalize">
                                        Type of ticket: {ticket.type}
                                    </p>
                                    </div>
                                    <div className="text-right">
                                    <p className="text-sm text-gray-700">
                                        Tickets available: <strong>{ticket.availabe_quantity}</strong>
                                    </p>
                                    <p className="text-sm text-gray-700 font-bold text-sky-600">
                                        {ticket.price > 0
                                        ? `$${Number(ticket.price).toFixed(2)}`
                                        : "Free"}
                                    </p>
                                    </div>
                                </div>

                                {!isSelected ? (
                                    <button
                                    className="w-full bg-sky-600 hover:bg-sky-700 text-white py-2 rounded-lg font-medium"
                                    onClick={() => {
                                        setSelectedTicket(ticket);
                                        setTicketQuantity(1);
                                        setConfirmed(false);
                                    }}
                                    >
                                    Buy Ticket
                                    </button>
                                ) : (
                                    <>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Quantity
                                    </label>
                                    <input
                                        type="number"
                                        value={ticketQuantity}
                                        min={1}
                                        max={ticket.quantity}
                                        onChange={(e) =>
                                        setTicketQuantity(
                                            Math.min(
                                            ticket.quantity,
                                            Math.max(1, Number(e.target.value))
                                            )
                                        )
                                        }
                                        className="w-full p-2 mb-2 border border-sky-300 rounded focus:ring-2 focus:ring-sky-500"
                                    />

                                    {!confirmed ? (
                                        <button
                                        className="w-full bg-sky-600 text-white py-2 rounded-lg hover:bg-sky-700"
                                        onClick={() => setConfirmed(true)}
                                        >
                                        Confirm
                                        </button>
                                    ) : (
                                        <button
                                        className="w-full bg-sky-600 text-white py-2 rounded-lg hover:bg-sky-700"
                                        // onClick={() =>
                                        //     navigate("/payment", {
                                        //     state: {
                                        //         ticket: {
                                        //         ...ticket,
                                        //         quantity: ticketQuantity,
                                        //         type: ticket.price > 0 ? "paid" : "free",
                                        //         },
                                        //     },
                                        //     }
                                        //   )
                                        // }
                                        onClick={handlePurchase}
                                        >
                                        Proceed to Payment
                                        </button>
                                    )}
                                    </>
                                )}
                                </div>
                            );
                            })}
                        </div>
                        ) : (
                        <p>No tickets available at this time.</p>
                        )}

                        <h3 className="font-medium mb-2 text-gray-900">
                            Share with friends
                        </h3>
                        <div className="flex gap-2">
                        <button className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700">
                            <FaFacebook size={16} />
                        </button>
                        <button className="w-8 h-8 rounded-full bg-blue-400 text-white flex items-center justify-center hover:bg-blue-500">
                            <FaTwitter size={16} />
                        </button>
                        <button className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center justify-center hover:from-purple-600 hover:to-pink-600">
                            <FaInstagram size={16} />
                        </button>
                        </div>
                    </div>
            </div>      
              </div>
            </div>
      </main>
      <Footer />
    </div>
  );
};

export default EventPage;
