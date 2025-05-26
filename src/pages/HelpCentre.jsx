import React from 'react';
import Navigation from "../components/Navigation/Navigation.jsx";
import helpBanner from '../assets/helpBanner.jpg'; // ✅ Adjust path as needed

const HelpCentre = () => {
  return (
    <>
      <Navigation /> {/* ✅ Navbar at the top */}

      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Top image */}
          <img
            src={helpBanner}
            alt="Help Center Banner"
            className="w-full h-auto rounded-xl mb-6 shadow-sm object-cover"
          />
          
          <h1 className="text-3xl font-bold text-blue-700 mb-6">Help Center</h1>

          <div className="bg-white p-6 rounded-lg shadow-md space-y-8">
            {/* Creating and Editing Ticket Types */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Creating and Editing Ticket Types
              </h2>
              <details className="text-gray-600">
                <summary className="cursor-pointer font-medium text-blue-600 hover:underline">
                  View Article
                </summary>
                <div className="mt-4 space-y-4 text-sm leading-6">
                  {/* Content omitted */}
                </div>
              </details>
            </section>

            {/* Add and Manage Payout Details */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Add and Manage Your Payout Details
              </h2>
              <details className="text-gray-600">
                <summary className="cursor-pointer font-medium text-blue-600 hover:underline">
                  View Article
                </summary>
                <div className="mt-4 space-y-4 text-sm leading-6">
                  {/* Content omitted */}
                </div>
              </details>
            </section>

            {/* Add Images and Video to Your Event */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Add Images and Video to Your Event
              </h2>
              <details className="text-gray-600">
                <summary className="cursor-pointer font-medium text-blue-600 hover:underline">
                  View Article
                </summary>
                <div className="mt-4 space-y-4 text-sm leading-6">
                  {/* Full content you already wrote goes here */}
                </div>
              </details>
            </section>

            {/* Contact Info */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Still need help?</h2>
              <p className="text-gray-600">
                Email us at <a href="mailto:support@eventhub.com" className="text-blue-600 underline">support@eventhub.com</a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default HelpCentre;
