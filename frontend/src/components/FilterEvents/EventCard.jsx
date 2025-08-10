import React from "react";
import { Link } from "react-router-dom";

const EventCard = ({ id, event_title, date, location, image}) => {
  return (
    <Link
      to={`/events/${id}`}
      className="bg-white rounded-lg shadow hover:shadow-md transition p-4"
    >
      <img
        src={image || "https://via.placeholder.com/400x200?text=No+Image"}
        alt={event_title}
        className="w-full h-40 object-cover rounded"
      />
      <h3 className="mt-3 font-bold text-lg">{event_title}</h3>
      <p className="text-sm text-gray-500">
        {date.day} {date.month} {date.year}
      </p>
      <p className="text-sm text-gray-500">
  {new Date(date).toLocaleString("default", { month: "short", year: "numeric" })}
</p>

      <p className="text-sm text-gray-600">{location}</p>
    </Link>
  );
};

export default EventCard;
