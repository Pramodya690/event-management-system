import { useParams } from "react-router-dom";
import Navigation from "../../components/Navigation/Navigation";
import { MdCalendarMonth } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import "./EventPageCreation.css"; // Optional: rename this too if needed

const EventPageCreation = () => {
  const { id } = useParams();
  const numId = Number(id);

  const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
  const event = storedEvents.find((e) => e.id === numId);

  if (!event) {
    return (
      <div className="event-page-creation-container">
        <Navigation />
        <h2>Event not found.</h2>
      </div>
    );
  }

  return (
    <div className="event-page-creation-container">
      <Navigation />
      <div className="event-page-creation-wrapper">
        <img
          src="https://via.placeholder.com/600x300?text=Event+Image"
          alt="Event"
        />
        <div className="event-page-creation-content">
          <h3>Event Name: {event.title}</h3>
          <div className="small-details">
            <p className="date">
              <MdCalendarMonth className="icon" />
              <span className="font-weight-med">
                {new Date(event.date).toLocaleDateString()}
              </span>
              <span className="font-weight-med">
                {event.startTime} - {event.endTime}
              </span>
            </p>
            {event.location && (
              <p className="location font-weight-med">
                <IoLocationSharp className="icon" />
                {event.location}
              </p>
            )}
            {event.coordinates && (
              <p className="font-weight-med">
                📍 Lat: {event.coordinates.lat.toFixed(5)}, Lng:{" "}
                {event.coordinates.lng.toFixed(5)}
              </p>
            )}
          </div>
          <p className="description">
            <span className="description-heading">Ticket Price:</span> ${event.price}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventPageCreation;
