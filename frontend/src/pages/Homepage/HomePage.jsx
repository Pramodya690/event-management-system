import { useState } from "react";
import EventCard from "../../components/FilterEvents/EventCard.jsx";
import { eventList } from "../../utils/EventDatabase.jsx";
import Navigation from "../../components/Navigation.jsx";
import ImageSlideshow from "../../components/ImageSlideshow.jsx";
import Footer from "../../components/Footer.jsx";
import CategoryFilter from "./CategoryFilter.jsx";
import LocationFilter from "./LocationFilter.jsx";
import FeaturedEvents from "./FeaturedEvents.jsx";
import NewsletterSignup from "./NewsletterSignup.jsx";
import Testimonials from "./Testimonials.jsx";

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");

  const filteredByCategory = 
    selectedCategory === "All" 
      ? eventList 
      : eventList.filter(event => event.category === selectedCategory);

  const filteredByLocation = 
    selectedLocation === "All" 
      ? eventList 
      : eventList.filter(event => event.location.includes(selectedLocation));

  const featuredEvents = eventList.filter(event => event.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section with Slideshow */}
      <section className="relative">
        <ImageSlideshow />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-sky-800 to-transparent h-32 flex items-end pb-6">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <h1 className="text-4xl font-bold text-white">Discover Your Next Experience</h1>
            <p className="text-sky-100 mt-2">Find the best events in your city</p>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4">
        {/* Featured Events */}
        <FeaturedEvents events={featuredEvents} />

        {/* Category Section */}
        <section className="py-12">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800">Browse by Category</h2>
            <p className="text-gray-600 mt-2">Find events that match your interests</p>
          </div>
          
          <CategoryFilter 
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          {/* Category Events Grid */}
          <div className="mt-10">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
              {selectedCategory === "All" ? "All Events" : `${selectedCategory} Events`}
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
            <h2 className="text-3xl font-bold text-gray-800">Browse by Location</h2>
            <p className="text-gray-600 mt-2">Find events near you</p>
          </div>

          <LocationFilter 
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
          />

          {/* Location Events Grid */}
          <div className="mt-10">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
              {selectedLocation === "All" ? "All Locations" : `Events in ${selectedLocation}`}
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