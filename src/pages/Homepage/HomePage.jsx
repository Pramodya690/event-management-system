// import { useState } from "react";
// import EventCard from "../components/EventCard/EventCard.jsx";
// import { eventList } from "../utils/EventDatabase.jsx";
// import Navigation from "../components/Navigation/Navigation.jsx";
// import ImageSlideshow from "../components/ImageSlideshow.jsx";
// import Footer from "../components/Footer/Footer.jsx";

// const categories = [
//   { name: "Music", icon: "/icons/music.png" },
//   { name: "Food", icon: "/icons/food.png" },
//   { name: "Art", icon: "/icons/art.png" },
//   { name: "Culture", icon: "/icons/culture.png" },
//   { name: "Comedy", icon: "/icons/comedy.png" },
//   { name: "Party", icon: "/icons/party.png" },
// ];

// const popularLocations = [
//   { name: "All", image: "/Images/all.jpg" },
//   { name: "Colombo", image: "/Images/colombo.jpg" },
//   { name: "Cinnamon Gardens", image: "/Images/cinnamon-garden.jpeg" },
//   { name: "Colombo Fort", image: "/Images/colombo-fort.jpeg" },
//   { name: "Kandy", image: "/Images/kandy.jpg" },
//   { name: "Galle", image: "/Images/galle.jpeg" },
// ];

// const HomePage = () => {
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [selectedLocation, setSelectedLocation] = useState("All");

//   const filteredByCategory = 
//     selectedCategory === "All" 
//       ? eventList 
//       : eventList.filter(event => event.category === selectedCategory);

//   const filteredByLocation = 
//     selectedLocation === "All" 
//       ? eventList 
//       : eventList.filter(event => event.location.includes(selectedLocation));

//   const renderEventCards = (events) =>
//     events.map(({ id, date, heading, location, img, price, organizer, followers }) => (
//       <EventCard
//         key={id}
//         id={id}
//         date={date}
//         heading={heading}
//         location={location}
//         img={img}
//         price={price}
//         organizer={organizer}
//         followers={followers}
//       />
//     ));

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navigation />
//       <ImageSlideshow />

//       {/* Category Section */}
//       <div className="max-w-[1200px] mx-auto px-4 py-6">
//         <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
//           Browse by Category
//         </h2>

//         <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-6 justify-items-center">
//           <button
//             onClick={() => setSelectedCategory("All")}
//             className={`flex flex-col items-center px-4 py-3 rounded-lg transition ${
//               selectedCategory === "All"
//                 ? "bg-blue-300 text-white"
//                 : "bg-white text-gray-700 hover:bg-blue-100"
//             }`}
//           >
//             <img src="/icons/all.png" alt="All" className="w-10 h-10 mb-1" />
//             <span className="text-sm">All</span>
//           </button>

//           {categories.map(({ name, icon }) => (
//             <button
//               key={name}
//               onClick={() => setSelectedCategory(name)}
//               className={`flex flex-col items-center px-4 py-3 rounded-lg transition ${
//                 selectedCategory === name
//                   ? "bg-blue-300 text-white"
//                   : "bg-white text-gray-700 hover:bg-blue-100"
//               }`}
//             >
//               <img src={icon} alt={name} className="w-10 h-10 mb-1" />
//               <span className="text-sm">{name}</span>
//             </button>
//           ))}
//         </div>

//         {/* Category Events Grid */}
//         <div className="mt-10">
//           <h1 className="text-2xl font-bold text-gray-800 mb-6">
//             {selectedCategory === "All" ? "All Events" : `${selectedCategory} Events`}
//           </h1>
//           {filteredByCategory.length > 0 ? (
//             <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//               {renderEventCards(filteredByCategory)}
//             </div>
//           ) : (
//             <p className="text-center text-gray-500 py-10 text-lg">
//               No events available for this category.
//             </p>
//           )}
//         </div>
//       </div>

//       {/* Location Section */}
//       <div className="max-w-[1440px] mx-auto px-4 py-12 bg-blue-100 mt-12">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
//           Browse by Location
//         </h2>

//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
//           {popularLocations.map(({ name, image }) => (
//             <button
//               key={name}
//               onClick={() => setSelectedLocation(name)}
//               className={`relative rounded-xl overflow-hidden h-40 transition-all ${
//                 selectedLocation === name ? "ring-4 ring-blue-500" : ""
//               }`}
//             >
//               <img 
//                 src={image} 
//                 alt={name} 
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
//                 <span className="text-white font-bold text-lg">{name}</span>
//               </div>
//             </button>
//           ))}
//         </div>

//         {/* Location Events Grid */}
//         <div className="mt-12">
//           <h1 className="text-3xl font-bold text-gray-800 mb-8">
//             {selectedLocation === "All" ? "All Locations" : `Events in ${selectedLocation}`}
//           </h1>
//           {filteredByLocation.length > 0 ? (
//             <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
//               {renderEventCards(filteredByLocation)}
//             </div>
//           ) : (
//             <p className="text-center text-gray-500 py-16 text-xl">
//               No events available for this location.
//             </p>
//           )}
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default HomePage;

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