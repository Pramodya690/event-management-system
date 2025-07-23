// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { MdCalendarMonth, MdShare, MdBookmarkBorder } from "react-icons/md";
// import { IoLocationSharp, IoTimeOutline } from "react-icons/io5";
// import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
// import Navigation from "../components/Navigation";
// import Footer from "../components/Footer";

// const EventPage = ({ event }) => {
//     // to get the event id 
//     const { id } = useParams();
//   const navigate = useNavigate();
// //   const location = useLocation();
// //   const [selectedTicket, setSelectedTicket] = useState(null);
// //   const [ticketQuantity, setTicketQuantity] = useState(1);
// //   const [confirmed, setConfirmed] = useState(false);

// //   const defaultEvent = {
// //     id: 1,
// //     eventName: "Untitled Exhibition",
// //     date: { day: "15", month: "June", year: "2023", fullDate: "2023-06-15" },
// //     time: "12:00 PM",
// //     location: "To be announced",
// //     description: "Join us for an exciting exhibition showcasing amazing works.",
// //     stalls: 20,
// //     hasAuthorMeet: false,
// //     coordinates: [20.5937, 78.9629],
// //     tags: ["Art", "Exhibition", "Culture"],
// //     faqs: "Q: What should I bring?\nA: Just yourself and your enthusiasm!",
// //     bannerImage: "/event.jpeg",
// //     placeMap: null,
// //     tickets: {
// //       paid: [{ name: "General Admission", price: 10, quantity: 100 }],
// //       free: [],
// //       donation: [],
// //     },
// //   };

// //   const data = event || defaultEvent;

//     const [eventData, setEventData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

// //   // Ticket-related state
// //   const [selectedTicket, setSelectedTicket] = useState(null);
// //   const [ticketQuantity, setTicketQuantity] = useState(1);
// //   const [confirmed, setConfirmed] = useState(false);


//   useEffect(() => {
//     const fetchEvent = async () => {
//       try {
//         const res = await fetch(`http://localhost:5000/api/events/${id}`);
//         // if (!res.ok) throw new Error("Event not found");
//         const data = await res.json();

//         const transformed = data.map((e) => ({
//         id: e.id,
//         name: e.event_title,
//         date: e.date,
//         time: e.time,
//         // startTime: e.time || "10:00 AM", 
//         // endTime: e.time || "12:00 PM",   
//         // timezone: "GMT+5:30",            
//         // ticketsSold: e.tickets_sold || 0, 
//         // capacity: e.headcount || 0,
//         // gross: `LKR ${e.revenue || 0}`,   
//         // status: e.status || "On Sale",
//         type: e.location?.toLowerCase().includes("online") ? "Online event" : "In-person event",
//         image: e.banner_image
//           ? `data:image/jpeg;base64,${btoa(
//               new Uint8Array(e.banner_image.data).reduce(
//                 (data, byte) => data + String.fromCharCode(byte),
//                 ""
//               )
//             )}`
//           : "https://source.unsplash.com/random/500x300",
//           organizer: e.organizer,
//         email: e.email,
//         contact_number: e.contact_number,
//         description: e.description,
//         location: e.location,
//       }));

//         setEventData(transformed);
//       } catch (err) {
//         console.error(err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEvent();
//   }, [id]);


//     if (loading) return <div className="p-8 text-center">Loading event...</div>;
//   if (error)
//     return <div className="p-8 text-center text-red-500">{error}</div>;

//   const data = eventData;




//   return (
//     <div className="min-h-screen bg-sky-50 flex flex-col">
//       <Navigation />

//       <main className="flex-grow">
//         <div className="max-w-6xl mx-auto bg-white shadow-lg border border-sky-200 rounded-xl overflow-hidden my-8">
//           {/* Banner */}
//           <div className="w-full h-64 bg-sky-100 flex items-center justify-center relative">
//             <img
//               src={data.bannerImage}
//               alt="Event banner"
//               className="w-full h-full object-cover"
//               onError={(e) =>
//                 (e.target.src =
//                   "https://via.placeholder.com/1200x300?text=Event+Banner")
//               }
//             />
//             <div className="absolute top-4 right-4 flex space-x-2">
//               <button className="p-2 bg-white rounded-full shadow-md hover:bg-sky-50">
//                 <MdShare className="text-sky-600 text-xl" />
//               </button>
//               <button className="p-2 bg-white rounded-full shadow-md hover:bg-sky-50">
//                 <MdBookmarkBorder className="text-sky-600 text-xl" />
//               </button>
//             </div>
//           </div>

//           {/* Content */}
//           <div className="p-8 flex gap-8">
//             {/* Left: Event Info */}
//             <div className="w-2/3">
//               <h1 className="text-4xl font-bold text-gray-900 mb-4">
//                 {data.eventName}
//               </h1>

//               {/* Date, Time, Location */}
//               <div className="flex items-center gap-4 mb-6 text-gray-600">
//                 <div className="flex items-center gap-2">
//                   <MdCalendarMonth className="text-xl text-sky-600" />
//                   <span>
//                     {data.date.month} {data.date.day}, {data.date.year}
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <IoTimeOutline className="text-xl text-sky-600" />
//                   <span>{data.time}</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <IoLocationSharp className="text-xl text-sky-600" />
//                   <span>{data.location}</span>
//                 </div>
//               </div>

//               {/* Description */}
//               <div className="mb-8">
//                 <h2 className="text-xl font-semibold mb-3 text-gray-800">
//                   About This Event
//                 </h2>
//                 <p className="text-gray-700 whitespace-pre-line">
//                   {data.description}
//                 </p>
//               </div>

//               {/* Stalls */}
//               {/* <div className="mb-8">
//                 <h2 className="text-xl font-semibold mb-3 text-gray-800">
//                   Exhibition Details
//                 </h2>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="bg-sky-50 p-4 rounded-lg border border-sky-200">
//                     <h3 className="font-medium text-gray-900 mb-1">
//                       Number of Stalls
//                     </h3>
//                     <p className="text-2xl font-bold text-sky-600">
//                       {data.stalls}
//                     </p>
//                   </div>
//                   {data.hasAuthorMeet && (
//                     <div className="bg-sky-50 p-4 rounded-lg border border-sky-200">
//                       <h3 className="font-medium text-gray-900 mb-1">
//                         Author Meet & Greet
//                       </h3>
//                       <p className="text-green-600 font-medium">Available</p>
//                     </div>
//                   )}
//                 </div>
//               </div> */}

//               {/* Tags */}
//               {data.tags?.length > 0 && (
//                 <div className="mb-8">
//                   <h2 className="text-xl font-semibold mb-3 text-gray-800">
//                     Event Tags
//                   </h2>
//                   <div className="flex gap-2">
//                     {data.tags.map((tag, idx) => (
//                       <span
//                         key={idx}
//                         className="bg-sky-100 text-sky-800 px-3 py-1 rounded-full text-sm"
//                       >
//                         {tag}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* FAQs */}
//               {data.faqs && (
//                 <div className="mb-8">
//                   <h2 className="text-xl font-semibold mb-3 text-gray-800">
//                     Frequently Asked Questions
//                   </h2>
//                   <div className="space-y-4">
//                     {data.faqs.split("\n").map((faq, index) => (
//                       <div key={index} className="border-b border-sky-200 pb-4">
//                         <p className="font-medium text-gray-900">{faq}</p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Right: Ticket Box */}
//             <div className="w-1/3">
//               <div className="sticky top-4 bg-sky-50 border border-sky-200 rounded-lg p-6 shadow-sm">
//                 {/* <h2 className="text-xl font-bold mb-4 text-gray-900">
//                   Get Tickets
//                 </h2> */}

//                 {/* {data.tickets.paid.map((ticket, index) => {
//                   const isSelected = selectedTicket?.name === ticket.name;

//                   return (
//                     <div
//                       key={index}
//                       className={`border rounded-lg p-4 transition-all duration-300 mb-4 ${
//                         isSelected
//                           ? "border-sky-500 bg-sky-100"
//                           : "border-sky-300 hover:border-sky-400"
//                       }`}
//                     >
//                       <div className="flex justify-between items-start mb-2">
//                         <h3 className="font-semibold text-gray-900">
//                           {ticket.name}
//                         </h3>
//                         <span className="font-bold text-sky-600">
//                           ${ticket.price}
//                         </span>
//                       </div>
//                       <p className="text-sm text-gray-500 mb-3">
//                         {ticket.quantity} tickets available
//                       </p>

//                       {!isSelected ? (
//                         <button
//                           className="w-full bg-sky-600 hover:bg-sky-700 text-white py-2 rounded-lg font-medium"
//                           onClick={() => {
//                             setSelectedTicket(ticket);
//                             setTicketQuantity(1);
//                             setConfirmed(false);
//                           }}
//                         >
//                           Buy Ticket
//                         </button>
//                       ) : (
//                         <>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Quantity
//                           </label>
//                           <input
//                             type="number"
//                             value={ticketQuantity}
//                             onChange={(e) =>
//                               setTicketQuantity(Number(e.target.value))
//                             }
//                             min="1"
//                             max={ticket.quantity}
//                             className="w-full p-2 mb-2 border border-sky-300 rounded focus:ring-2 focus:ring-sky-500"
//                           />

//                           {!confirmed ? (
//                             <button
//                               className="w-full bg-sky-600 text-white py-2 rounded-lg hover:bg-sky-700"
//                               onClick={() => setConfirmed(true)}
//                             >
//                               Confirm
//                             </button>
//                           ) : (
//                             <button
//                               className="w-full bg-sky-600 text-white py-2 rounded-lg hover:bg-sky-700"
//                               onClick={() =>
//                                 navigate("/payment", {
//                                   state: {
//                                     ticket: {
//                                       ...ticket,
//                                       type: "paid",
//                                       quantity: ticketQuantity,
//                                     },
//                                   },
//                                 })
//                               }
//                             >
//                               Proceed to Payment
//                             </button>
//                           )}
//                         </>
//                       )}
//                     </div>
//                   );
//                 })} */}

//                 {/* Share Buttons */}
//                 <h3 className="font-medium mb-2 text-gray-900">
//                   Share with friends
//                 </h3>
//                 <div className="flex gap-2">
//                   <button className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700">
//                     <FaFacebook size={16} />
//                   </button>
//                   <button className="w-8 h-8 rounded-full bg-blue-400 text-white flex items-center justify-center hover:bg-blue-500">
//                     <FaTwitter size={16} />
//                   </button>
//                   <button className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center justify-center hover:from-purple-600 hover:to-pink-600">
//                     <FaInstagram size={16} />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Organizer */}
//           {/* <div className="p-8 border-t border-sky-200 bg-sky-50">
//             <h2 className="text-2xl font-bold mb-4 text-gray-900">Organizer</h2>
//             <div className="flex items-center gap-4">
//               <div className="w-16 h-16 rounded-full bg-sky-200 flex items-center justify-center">
//                 <svg
//                   className="w-8 h-8 text-sky-600"
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
//                 <h3 className="font-semibold text-lg text-gray-900">
//                   Event Organizer
//                 </h3>
//                 <p className="text-gray-600">
//                   Contact organizer for more information
//                 </p>
//               </div>
//             </div>
//           </div> */}
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default EventPage;