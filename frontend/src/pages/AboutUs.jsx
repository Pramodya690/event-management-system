import React from "react";
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { FiCheck, FiUsers, FiCalendar, FiGlobe } from "react-icons/fi";

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation />

      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-sky-300 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About Eventsphere
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Connecting people with extraordinary experiences through
              innovative event management
            </p>
          </div>
        </div>

        {/* Our Story Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Founded in 2025, Eventsphere began with a simple idea: to make
                event discovery and management effortless for both attendees and
                organizers.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                What started as a local event platform has grown into a
                nationwide service, helping thousands of people find their
                perfect events every month.
              </p>
              <p className="text-lg text-gray-600">
                Today, we're proud to be one of India's fastest-growing event
                platforms, trusted by both individual attendees and corporate
                clients.
              </p>
            </div>
            <div className="bg-gray-100 rounded-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                alt="Team working on Eventsphere"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Our Mission & Values
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-8 rounded-lg">
                <div className="text-blue-600 mb-4">
                  <FiUsers size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Community First</h3>
                <p className="text-gray-600">
                  We believe events should bring people together. Our platform
                  fosters meaningful connections between attendees, organizers,
                  and speakers.
                </p>
              </div>

              <div className="bg-gray-50 p-8 rounded-lg">
                <div className="text-blue-600 mb-4">
                  <FiCalendar size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Seamless Experience
                </h3>
                <p className="text-gray-600">
                  From discovery to attendance, we streamline every step of the
                  event journey with intuitive technology and reliable support.
                </p>
              </div>

              <div className="bg-gray-50 p-8 rounded-lg">
                <div className="text-blue-600 mb-4">
                  <FiGlobe size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Diverse Events</h3>
                <p className="text-gray-600">
                  We celebrate all types of gatherings - from tech conferences
                  to cultural festivals - ensuring there's something for
                  everyone.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose Eventsphere
          </h2>

          <div className="space-y-6 max-w-3xl mx-auto">
            {[
              "Curated selection of high-quality events",
              "Secure and hassle-free ticket booking",
              "Real-time event updates and notifications",
              "Dedicated customer support",
              "Competitive pricing with no hidden fees",
              "User-friendly platform across all devices",
            ].map((item, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <FiCheck className="h-5 w-5 text-green-500" />
                </div>
                <p className="ml-3 text-lg text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team CTA */}
        <div className="bg-sky-400 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Join the Eventsphere Community
            </h2>
            <p className="text-xl mb-8">
              Whether you're looking to attend great events or organize your
              own, we're here to help you every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/find-events">
                <button className="px-6 py-3 bg-white text-sky-700 rounded-lg font-medium hover:bg-gray-100 transition">
                  Browse Events
                </button>
              </Link>
              <Link to="/signup-role-selector">
                <button className="px-6 py-3 border-2 border-white text-white rounded-lg font-medium hover:bg-sky-800 transition">
                  List Your Event
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;
