// import React from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import { MdCalendarMonth, MdShare, MdBookmarkBorder } from "react-icons/md";
// import { IoLocationSharp, IoTimeOutline } from "react-icons/io5";
// import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
// import Navigation from "../components/Navigation";
// import Footer from "../components/Footer";

// const EventPage = ({ event }) => {
//   // Default event data if none provided
//   const defaultEvent = {
//     id: 1,
//     eventName: "Untitled Exhibition",
//     date: {
//       day: "15",
//       month: "June",
//       year: "2023",
//       fullDate: "2023-06-15",
//     },
//     time: "12:00 PM",
//     location: "To be announced",
//     description: "Join us for an exciting exhibition showcasing amazing works.",
//     stalls: 20,
//     hasAuthorMeet: false,
//     coordinates: [20.5937, 78.9629], // Default to India coordinates
//     tags: ["Art", "Exhibition", "Culture"],
//     faqs: "Q: What should I bring?\nA: Just yourself and your enthusiasm!",
//     bannerImage: "/event.jpeg",
//     placeMap: null,
//     tickets: {
//       paid: [{ name: "General Admission", price: 10, quantity: 100 }],
//       free: [],
//       donation: [],
//     },
//   };

//   const data = event || defaultEvent;

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col">
//       <Navigation />

//       <main className="flex-grow">
//         <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden my-8">
//           {/* Banner Image */}
//           <div className="w-full h-64 bg-gray-200 flex items-center justify-center relative">
//             {data.bannerImage ? (
//               <img
//                 src={data.bannerImage}
//                 alt="Event banner"
//                 className="w-full h-full object-cover"
//               />
//             ) : (
//               <span className="text-gray-500 text-lg">Event Banner</span>
//             )}
//             <div className="absolute top-4 right-4 flex space-x-2">
//               <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
//                 <MdShare className="text-gray-700 text-xl" />
//               </button>
//               <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
//                 <MdBookmarkBorder className="text-gray-700 text-xl" />
//               </button>
//             </div>
//           </div>

//           {/* Main Content */}
//           <div className="p-6 md:p-8">
//             {/* Event Header */}
//             <div className="flex flex-col md:flex-row gap-8">
//               {/* Left Column - Event Details */}
//               <div className="md:w-2/3">
//                 <h1 className="text-3xl font-bold text-gray-900 mb-2">
//                   {data.eventName}
//                 </h1>

//                 {/* Date, Time & Location */}
//                 <div className="flex flex-wrap items-center gap-4 mb-6 text-gray-600">
//                   <div className="flex items-center gap-2">
//                     <MdCalendarMonth className="text-xl text-sky-600" />
//                     <span>
//                       {data.date.month} {data.date.day}, {data.date.year}
//                     </span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <IoTimeOutline className="text-xl text-sky-600" />
//                     <span>{data.time}</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <IoLocationSharp className="text-xl text-sky-600" />
//                     <span>{data.location}</span>
//                   </div>
//                 </div>

//                 {/* Event Description */}
//                 <div className="mb-8">
//                   <h2 className="text-xl font-semibold mb-3 text-gray-800">
//                     About This Event
//                   </h2>
//                   <p className="text-gray-700 whitespace-pre-line">
//                     {data.description}
//                   </p>
//                 </div>

//                 {/* Exhibition Details */}
//                 <div className="mb-8">
//                   <h2 className="text-xl font-semibold mb-3 text-gray-800">
//                     Exhibition Details
//                   </h2>
//                   <div className="grid grid-cols-2 gap-4">
//                     <div className="bg-gray-50 p-4 rounded-lg">
//                       <h3 className="font-medium text-gray-900 mb-1">
//                         Number of Stalls
//                       </h3>
//                       <p className="text-2xl font-bold text-sky-600">
//                         {data.stalls}
//                       </p>
//                     </div>
//                     {data.hasAuthorMeet && (
//                       <div className="bg-gray-50 p-4 rounded-lg">
//                         <h3 className="font-medium text-gray-900 mb-1">
//                           Author Meet & Greet
//                         </h3>
//                         <p className="text-green-600 font-medium">Available</p>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Tags */}
//                 {data.tags && data.tags.length > 0 && (
//                   <div className="mb-8">
//                     <h2 className="text-xl font-semibold mb-3 text-gray-800">
//                       Event Tags
//                     </h2>
//                     <div className="flex flex-wrap gap-2">
//                       {data.tags.map((tag, index) => (
//                         <span
//                           key={index}
//                           className="bg-sky-100 text-sky-800 px-3 py-1 rounded-full text-sm"
//                         >
//                           {tag}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/* FAQs */}
//                 {data.faqs && (
//                   <div className="mb-8">
//                     <h2 className="text-xl font-semibold mb-3 text-gray-800">
//                       Frequently Asked Questions
//                     </h2>
//                     <div className="space-y-4">
//                       {data.faqs.split("\n").map((faq, index) => (
//                         <div
//                           key={index}
//                           className="border-b border-gray-200 pb-4"
//                         >
//                           <p className="font-medium text-gray-900">{faq}</p>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Right Column - Ticket Options */}
//               <div className="md:w-1/3">
//                 <div className="sticky top-4 bg-gray-50 border border-gray-200 rounded-lg p-6 shadow-sm">
//                   <h2 className="text-xl font-bold mb-4">Get Tickets</h2>

//                   {/* Ticket Options */}
//                   <div className="space-y-4 mb-6">
//                     {data.tickets.paid.map((ticket, index) => (
//                       <div
//                         key={`paid-${index}`}
//                         className="border border-gray-300 rounded-lg p-4 hover:border-sky-400 transition"
//                       >
//                         <div className="flex justify-between items-start mb-2">
//                           <h3 className="font-semibold">{ticket.name}</h3>
//                           <span className="font-bold">${ticket.price}</span>
//                         </div>
//                         <p className="text-sm text-gray-500 mb-3">
//                           {ticket.quantity} tickets available
//                         </p>
//                         <button className="w-full bg-sky-600 hover:bg-sky-700 text-white py-2 rounded-lg font-medium transition">
//                           Select
//                         </button>
//                       </div>
//                     ))}

//                     {data.tickets.free.map((ticket, index) => (
//                       <div
//                         key={`free-${index}`}
//                         className="border border-gray-300 rounded-lg p-4 hover:border-green-400 transition"
//                       >
//                         <div className="flex justify-between items-start mb-2">
//                           <h3 className="font-semibold">{ticket.name}</h3>
//                           <span className="font-bold text-green-600">Free</span>
//                         </div>
//                         <p className="text-sm text-gray-500 mb-3">
//                           {ticket.quantity} tickets available
//                         </p>
//                         <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition">
//                           Register
//                         </button>
//                       </div>
//                     ))}

//                     {data.tickets.donation.map((ticket, index) => (
//                       <div
//                         key={`donation-${index}`}
//                         className="border border-gray-300 rounded-lg p-4 hover:border-purple-400 transition"
//                       >
//                         <div className="flex justify-between items-start mb-2">
//                           <h3 className="font-semibold">{ticket.name}</h3>
//                           <span className="font-bold text-purple-600">
//                             Donation
//                           </span>
//                         </div>
//                         <p className="text-sm text-gray-500 mb-3">
//                           Pay what you can
//                         </p>
//                         <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-medium transition">
//                           Donate & Register
//                         </button>
//                       </div>
//                     ))}
//                   </div>

//                   {/* Share Buttons */}
//                   <div>
//                     <h3 className="font-medium mb-2">Share with friends</h3>
//                     <div className="flex gap-2">
//                       <button className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition">
//                         <FaFacebook size={16} />
//                       </button>
//                       <button className="w-8 h-8 rounded-full bg-blue-400 text-white flex items-center justify-center hover:bg-blue-500 transition">
//                         <FaTwitter size={16} />
//                       </button>
//                       <button className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center justify-center hover:from-purple-600 hover:to-pink-600 transition">
//                         <FaInstagram size={16} />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Stall Map Section */}
//           {data.placeMap && (
//             <div className="p-6 md:p-8 border-t border-gray-200">
//               <h2 className="text-2xl font-bold mb-4">Exhibition Layout</h2>
//               <div className="bg-gray-100 rounded-lg p-4">
//                 <img
//                   src={data.placeMap}
//                   alt="Exhibition stall map"
//                   className="w-full max-h-96 object-contain rounded border border-gray-300"
//                 />
//                 <div className="mt-4 grid grid-cols-4 gap-2">
//                   {Array.from({ length: data.stalls }, (_, i) => (
//                     <div
//                       key={i}
//                       className="bg-white p-2 rounded border border-gray-300 text-center hover:bg-sky-50 hover:border-sky-300 transition"
//                     >
//                       <span className="text-sm font-medium">Stall {i + 1}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Organizer Info */}
//           <div className="p-6 md:p-8 border-t border-gray-200 bg-gray-50">
//             <h2 className="text-2xl font-bold mb-4">Organizer</h2>
//             <div className="flex items-center gap-4">
//               <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center">
//                 <svg
//                   className="w-8 h-8 text-gray-500"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               </div>
//               <div>
//                 <h3 className="font-semibold text-lg">Event Organizer</h3>
//                 <p className="text-gray-600">
//                   Contact organizer for more information
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default EventPage;

import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MdCalendarMonth, MdShare, MdBookmarkBorder } from "react-icons/md";
import { IoLocationSharp, IoTimeOutline } from "react-icons/io5";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const EventPage = ({ event }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [confirmed, setConfirmed] = useState(false);

  const defaultEvent = {
    id: 1,
    eventName: "Untitled Exhibition",
    date: { day: "15", month: "June", year: "2023", fullDate: "2023-06-15" },
    time: "12:00 PM",
    location: "To be announced",
    description: "Join us for an exciting exhibition showcasing amazing works.",
    stalls: 20,
    hasAuthorMeet: false,
    coordinates: [20.5937, 78.9629],
    tags: ["Art", "Exhibition", "Culture"],
    faqs: "Q: What should I bring?\nA: Just yourself and your enthusiasm!",
    bannerImage: "/event.jpeg",
    placeMap: null,
    tickets: {
      paid: [{ name: "General Admission", price: 10, quantity: 100 }],
      free: [],
      donation: [],
    },
  };

  const data = event || defaultEvent;

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
                    {data.date.month} {data.date.day}, {data.date.year}
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

              {/* Stalls */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-3 text-gray-800">
                  Exhibition Details
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-sky-50 p-4 rounded-lg border border-sky-200">
                    <h3 className="font-medium text-gray-900 mb-1">
                      Number of Stalls
                    </h3>
                    <p className="text-2xl font-bold text-sky-600">
                      {data.stalls}
                    </p>
                  </div>
                  {data.hasAuthorMeet && (
                    <div className="bg-sky-50 p-4 rounded-lg border border-sky-200">
                      <h3 className="font-medium text-gray-900 mb-1">
                        Author Meet & Greet
                      </h3>
                      <p className="text-green-600 font-medium">Available</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Tags */}
              {data.tags?.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-3 text-gray-800">
                    Event Tags
                  </h2>
                  <div className="flex gap-2">
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

            {/* Right: Ticket Box */}
            <div className="w-1/3">
              <div className="sticky top-4 bg-sky-50 border border-sky-200 rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-4 text-gray-900">
                  Get Tickets
                </h2>

                {data.tickets.paid.map((ticket, index) => {
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
                        <h3 className="font-semibold text-gray-900">
                          {ticket.name}
                        </h3>
                        <span className="font-bold text-sky-600">
                          ${ticket.price}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mb-3">
                        {ticket.quantity} tickets available
                      </p>

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
                            onChange={(e) =>
                              setTicketQuantity(Number(e.target.value))
                            }
                            min="1"
                            max={ticket.quantity}
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
                              onClick={() =>
                                navigate("/payment", {
                                  state: {
                                    ticket: {
                                      ...ticket,
                                      type: "paid",
                                      quantity: ticketQuantity,
                                    },
                                  },
                                })
                              }
                            >
                              Proceed to Payment
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  );
                })}

                {/* Share Buttons */}
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

          {/* Organizer */}
          <div className="p-8 border-t border-sky-200 bg-sky-50">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Organizer</h2>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-sky-200 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-sky-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900">
                  Event Organizer
                </h3>
                <p className="text-gray-600">
                  Contact organizer for more information
                </p>
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
