import React from "react";
import { Link } from "react-router-dom";

// const dummyEvent = {
//   id: 1,
//   image: "/event.jpeg",
//   eventName: "Tech & Innovation Fair 2025",
//   date: "June 15, 2025",
//   time: "10:00 AM",
//   location: "Expo Center, New York",
//   category: "Music",
// };

// const EventCard = () => {
//   const event = dummyEvent;

//   return (
//     <Link
//       to={`/events/${event.id}`}
//       className="bg-white rounded-lg shadow hover:shadow-md transition p-4"
//     >
//       <img
//         src={event.image}
//         alt={event.eventName}
//         className="w-full h-40 object-cover rounded"
//       />
//       <h3 className="mt-3 font-bold text-lg">{event.eventName}</h3>
//       <p className="text-sm text-gray-500">
//         {event.date} • {event.time}
//       </p>
//       <p className="text-sm text-gray-600">{event.location}</p>
//       <span className="inline-block mt-2 text-xs bg-sky-100 text-sky-800 px-2 py-1 rounded">
//         {event.category}
//       </span>
//     </Link>
//   );
// };

// export default EventCard;

const EventCard = ({ id, heading, date, location, img, description }) => {
  return (
    <Link
      to={`/events/${id}`}
      className="bg-white rounded-lg shadow hover:shadow-md transition p-4"
    >
      <img
        src={img}
        alt={heading}
        className="w-full h-40 object-cover rounded"
      />
      <h3 className="mt-3 font-bold text-lg">{heading}</h3>
      <p className="text-sm text-gray-500">
        {date.month} {date.year}
      </p>
      <p className="text-sm text-gray-600">{location}</p>
      <span className="inline-block mt-2 text-xs bg-sky-100 text-sky-800 px-2 py-1 rounded">
        {/* Optional category badge */}
      </span>
    </Link>
  );
};

export default EventCard;
