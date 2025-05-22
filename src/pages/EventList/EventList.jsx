import EventCard from "../../components/EventCard/EventCard.jsx";
import { eventList } from "../../utils/EventDatabase.jsx";
import Navigation from "../../components/Navigation/Navigation.jsx";
import "./EventList.css";

const EventList = () => {
  const renderEventCards = () =>
    eventList.map(({ id, date, heading, location, img }) => (
      <EventCard
        key={id}
        id={id}
        date={date}
        heading={heading}
        location={location}
        img={img}
      />
    ));

  return (
    <div>
      <Navigation />
      <div className="event-list-wrapper">
        <h1 className="event-title">Upcoming Events</h1>
        {eventList.length > 0 ? (
          <div className="event-list">{renderEventCards()}</div>
        ) : (
          <p className="empty-msg">No events available</p>
        )}
      </div>
    </div>
  );
};

export default EventList;
