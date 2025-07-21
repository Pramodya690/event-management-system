import React from "react";
import EventCard from "../components/FilterEvents/EventCard";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { FiCalendar, FiMapPin, FiSearch, FiFilter } from "react-icons/fi";

const eventList = [
  {
    id: 1,
    heading: "Epic Comic Con",
    date: { year: 2023, month: "July", day: "15-17" },
    location: "Mumbai, India",
    description:
      "Experience the most anticipated gathering of comic enthusiasts! Meet artists, cosplayers, and collectors from around the world.",
    img: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=500&auto=format&fit=crop&q=60",
    category: "Comics",
    price: "₹999",
  },
  {
    id: 2,
    heading: "Fantasy Gaming Expo",
    date: { year: 2024, month: "May", day: "10-12" },
    location: "Delhi, India",
    description:
      "Embark on a journey through fantastical realms at the Fantasy Gaming Expo! Try new releases and compete in tournaments.",
    img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop",
    category: "Gaming",
    price: "₹1499",
  },
  {
    id: 3,
    heading: "Tech Innovators Summit",
    date: { year: 2023, month: "November", day: "5-7" },
    location: "Bangalore, India",
    description:
      "Connect with tech leaders and discover groundbreaking innovations shaping our digital future.",
    img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop",
    category: "Technology",
    price: "₹2999",
  },
  {
    id: 4,
    heading: "Food & Wine Festival",
    date: { year: 2023, month: "September", day: "22-24" },
    location: "Goa, India",
    description:
      "Savor exquisite flavors from top chefs and winemakers in this culinary celebration.",
    img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop",
    category: "Food",
    price: "₹1999",
  },
  {
    id: 5,
    heading: "Music Fest 2023",
    date: { year: 2023, month: "December", day: "30-31" },
    location: "Hyderabad, India",
    description:
      "Ring in the new year with electrifying performances from top international and local artists.",
    img: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2070&auto=format&fit=crop",
    category: "Music",
    price: "₹2499",
  },
  {
    id: 6,
    heading: "Startup Pitch Competition",
    date: { year: 2023, month: "August", day: "18" },
    location: "Pune, India",
    description:
      "Witness emerging startups pitch to top investors for funding and mentorship opportunities.",
    img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
    category: "Business",
    price: "Free",
  },
  {
    id: 7,
    heading: "Yoga & Wellness Retreat",
    date: { year: 2023, month: "October", day: "6-8" },
    location: "Rishikesh, India",
    description:
      "Rejuvenate your mind and body with expert-led yoga sessions in the yoga capital of the world.",
    img: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=2070&auto=format&fit=crop",
    category: "Wellness",
    price: "₹8999",
  },
  {
    id: 8,
    heading: "Fashion Week",
    date: { year: 2023, month: "March", day: "12-16" },
    location: "Delhi, India",
    description:
      "Discover the latest trends from top designers and emerging talent in the fashion industry.",
    img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop",
    category: "Fashion",
    price: "₹4999",
  },
];

const AllEventsGrid = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Simple Header */}
          <h1 className="text-3xl font-bold mb-8 text-center text-gray-900">
            Find Your Favourite Events Here
          </h1>

          {/* Events Grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {eventList.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AllEventsGrid;
