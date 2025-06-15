import React, { useState } from "react";
import CategoryFilter from "../components/FilterEvents/CategoryFilter";
import EventCard from "../components/FilterEvents/EventCard";
import FiltersPanel from "../components/FilterEvents/FilterPanel";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const mockEvents = [
  {
    id: 1,
    eventName: "Art Fiesta",
    category: "Art",
    location: "Delhi",
    date: "2025-06-15",
    time: "12:00 PM",
    image: "/event.jpeg",
  },
  {
    id: 2,
    eventName: "Food Carnival",
    category: "Food",
    location: "Mumbai",
    date: "2025-06-20",
    time: "4:00 PM",
    image: "/event.jpeg",
  },
  {
    id: 3,
    eventName: "Book Bazaar",
    category: "Books",
    location: "Bangalore",
    date: "2025-06-25",
    time: "10:00 AM",
    image: "/event.jpeg",
  },
  {
    id: 4,
    eventName: "Tech Talks 2025",
    category: "Technology",
    location: "Hyderabad",
    date: "2025-07-05",
    time: "9:00 AM",
    image: "/event.jpeg",
  },
];

const FilterEvents = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [locationFilter, setLocationFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const filteredEvents = mockEvents.filter((event) => {
    const matchCategory =
      selectedCategory === "All" || event.category === selectedCategory;
    const matchLocation =
      !locationFilter ||
      event.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchDate = !dateFilter || event.date === dateFilter;
    return matchCategory && matchLocation && matchDate;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation />

      <main className="flex-grow max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">All Events</h1>

        {/* Filters */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <FiltersPanel
          setLocation={setLocationFilter}
          setDate={setDateFilter}
        />

        {/* Event List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <p className="text-center mt-10 text-gray-500">
            No events match your filters.
          </p>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default FilterEvents;
