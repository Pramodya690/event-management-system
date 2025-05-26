import { Link } from "react-router-dom";
import "./EventCard.css";

const EventCard = ({ id, heading, date, location, img }) => {
  const { year, month } = date;
  return (
    <Link to={`/events/${id}`}>
      <div className="event-card">
        <div className="event-card-content">
          <h3 className="event-card-heading">{heading}</h3>
          <p className="event-card-date">
            <span>Year: {year}</span> <span>Month: {month}</span>
          </p>
          <p className="event-card-location">{location}</p>
        </div>

        <div className="event-card-img-wrapper">
          <img src={img} alt="image not found" />
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
