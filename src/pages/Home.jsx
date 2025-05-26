import EventCard from "../components/EventCard/EventCard.jsx";
import { eventList } from "../utils/EventDatabase.jsx";
import Navigation from "../components/Navigation/Navigation.jsx";
import ImageSlideshow from "../components/ImageSlideshow.jsx";

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
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <ImageSlideshow />

      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
          Upcoming Events
        </h1>
        {eventList.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {renderEventCards()}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-20 text-lg">
            No events available
          </p>
        )}
      </div>
    </div>
  );
};

export default EventList;
