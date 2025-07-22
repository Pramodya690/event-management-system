import { useState } from "react";
import EventCard from "../../components/FilterEvents/EventCard.jsx";
import Navigation from "../../components/Navigation.jsx";
import ImageSlideshow from "../../components/ImageSlideshow.jsx";
import Footer from "../../components/Footer.jsx";
import CategoryFilter from "./CategoryFilter.jsx";
import LocationFilter from "./LocationFilter.jsx";
import FeaturedEvents from "./FeaturedEvents.jsx";
import NewsletterSignup from "./NewsletterSignup.jsx";
import Testimonials from "./Testimonials.jsx";
// import EventDetails from "./EventDetails.jsx";
import { useEffect } from "react";

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");

  // new states to fetch data from db
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  
  const filteredByCategory = events;

  const filteredByLocation = events;

  const featuredEvents = events.filter((event) => event.featured);

useEffect(() => {
  const fetchEvents = async () => {
    try {
      let url = "http://localhost:5000/api/events"; // default

      const safeCategory = (selectedCategory || "").trim();
      const safeLocation = (selectedLocation || "").trim();

      if (safeCategory !== "All" && safeLocation === "All") {
        url = `http://localhost:5000/api/filterByCategory?category=${encodeURIComponent(safeCategory)}`;
      } else if (safeLocation !== "All" && safeCategory === "All") {
        url = `http://localhost:5000/api/filterByLocation?city=${encodeURIComponent(safeLocation)}`;
      } else if (safeCategory !== "All" && safeLocation !== "All") {
        url = "http://localhost:5000/api/events"; // fallback to client filtering
      }

      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch events");

      const data = await response.json();

      const transformed = data.map((e) => ({
        ...e,
        image: e.banner_image
          ? `data:image/jpeg;base64,${btoa(
              new Uint8Array(e.banner_image.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ""
              )
            )}`
          : "https://source.unsplash.com/random/500x300",
      }));

      // Client-side filtering if both filters are applied
      const finalFiltered =
        safeCategory !== "All" && safeLocation !== "All"
          ? transformed.filter(
              (e) =>
                e.category === safeCategory && e.city === safeLocation
            )
          : transformed;

      setEvents(finalFiltered);
      setError(null);
    } catch (err) {
      console.error("Error fetching events:", err.message);
      setEvents([]);
      setError(err.message);
    }
  };

  fetchEvents();
}, [selectedCategory, selectedLocation]);


  //message while the data is been loaded onto the page
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section with Slideshow */}
      <section className="relative">
        <ImageSlideshow />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-sky-800 to-transparent h-32 flex items-end pb-6">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <h1 className="text-4xl font-bold text-white">
              Discover Your Next Experience
            </h1>
            <p className="text-sky-100 mt-2">
              Find the best events in your city
            </p>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4">
        {/* Featured Events */}
        <FeaturedEvents events={featuredEvents} />

        {/* Category Section */}
        <section className="py-12">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800">
              Browse by Category
            </h2>
            <p className="text-gray-600 mt-2">
              Find events that match your interests
            </p>
          </div>

          <CategoryFilter
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          {/* Category Events Grid */}
          <div className="mt-10">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
              {selectedCategory === "All"
                ? "All Events"
                : `${selectedCategory} Events`}
            </h3>

            {filteredByCategory.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredByCategory.map((event) => (
                  <EventCard key={event.id} {...event} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg p-8 text-center">
                <p className="text-gray-500 text-lg">
                  No events available for this category.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Location Section */}
        <section className="w-full py-12 bg-sky-100 my-12">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-gray-800">
                Browse by Location
              </h2>
              <p className="text-gray-600 mt-2">Find events near you</p>
            </div>

            <LocationFilter
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
            />

            {/* Location Events Grid */}
            <div className="mt-10">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                {selectedLocation === "All"
                  ? "All Locations"
                  : `Events in ${selectedLocation}`}
              </h3>

              {filteredByLocation.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredByLocation.map((event) => (
                    <EventCard key={event.id} {...event} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg p-8 text-center">
                  <p className="text-gray-500 text-lg">
                    No events available for this location.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <Testimonials />

        {/* Newsletter */}
        <NewsletterSignup />
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
