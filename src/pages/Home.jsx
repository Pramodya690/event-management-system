import { useState } from "react";
import EventCard from "../components/EventCard/EventCard.jsx";
import { eventList } from "../utils/EventDatabase.jsx";
import Navigation from "../components/Navigation/Navigation.jsx";
import ImageSlideshow from "../components/ImageSlideshow.jsx";

const categories = [
  { name: "Music", icon: "/icons/music.png" },
  { name: "Food", icon: "/icons/food.png" },
  { name: "Art", icon: "/icons/art.png" },
  { name: "Culture", icon: "/icons/culture.png" },
  { name: "Comedy", icon: "/icons/comedy.png" },
  { name: "Party", icon: "/icons/party.png" },
];

const EventList = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredEvents =
    selectedCategory === "All"
      ? eventList
      : eventList.filter((event) => event.category === selectedCategory);

  const renderEventCards = () =>
    filteredEvents.map(({ id, date, heading, location, img }) => (
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

      <div className="max-w-6xl mx-auto px-4 py-6">
  <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
    Browse by Category
  </h2>

  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
    <button
      onClick={() => setSelectedCategory("All")}
      className={`flex flex-col items-center px-4 py-3 rounded-lg transition ${
        selectedCategory === "All"
          ? "bg-blue-300 text-white"
          : "bg-white text-gray-700 hover:bg-blue-100"
      }`}
    >
      <img src="/icons/all.png" alt="All" className="w-8 h-8 mb-1" />
      <span className="text-sm">All</span>
    </button>

    {categories.map(({ name, icon }) => (
      <button
        key={name}
        onClick={() => setSelectedCategory(name)}
        className={`flex flex-col items-center px-4 py-3 rounded-lg transition ${
          selectedCategory === name
            ? "bg-blue-300 text-white"
            : "bg-white text-gray-700 hover:bg-blue-100"
        }`}
      >
        <img src={icon} alt={name} className="w-8 h-8 mb-1" />
        <span className="text-sm">{name}</span>
      </button>
    ))}
  </div>
</div>


      {/* Event Cards */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
          {selectedCategory === "All"
            ? "Upcoming Events"
            : `${selectedCategory} Events`}
        </h1>
        {filteredEvents.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {renderEventCards()}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-20 text-lg">
            No events available for this category.
          </p>
        )}
      </div>
    </div>
  );
};

export default EventList;
