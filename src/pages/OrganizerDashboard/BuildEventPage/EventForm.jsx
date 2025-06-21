

import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import BuildEventPage from "./BuildEventPage";
import AddTickets from "./AddTickets";
import PublishEvent from "./PublishEvent";

const steps = ["Build Event Page", "Add Tickets", "Publish"];

const ConferenceForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form, setForm] = useState({
    eventName: "",
    date: "",
    time: "",
    location: "",
    description: "",
    stalls: "",
    hasAuthorMeet: false,
    placeMap: null,
    tags: [],
    agenda: null,
    faqs: "",
    tickets: {
      paid: [],
      free: [],
      donation: [],
      seatRows: "",
      seatCols: "",
      generatedSeating: "",
    },
  });

  const [bannerImagePreview, setBannerImagePreview] = useState(null);
  const [stallMapPreview, setStallMapPreview] = useState(null);
  const [tagInput, setTagInput] = useState("");
  const [ticketTypeTab, setTicketTypeTab] = useState("paid");

  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Final Submission:", form);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-6">Event Setup</h2>
        <ol className="space-y-4">
          {steps.map((step, index) => (
            <li
              key={index}
              className={`flex items-center space-x-2 ${
                index === currentStep ? "font-bold text-sky-600" : "text-gray-500"
              }`}
            >
              <div
                className={`w-6 h-6 flex items-center justify-center rounded-full border ${
                  index === currentStep ? "bg-sky-600 text-white" : "border-gray-300"
                }`}
              >
                {index + 1}
              </div>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </aside>

      {/* Form Content */}
      <div className="flex-1 p-10">
        <form
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8 space-y-6"
        >
          <AnimatePresence mode="wait">
            {currentStep === 0 && (
              <BuildEventPage
                form={form}
                setForm={setForm}
                bannerImagePreview={bannerImagePreview}
                setBannerImagePreview={setBannerImagePreview}
                tagInput={tagInput}
                setTagInput={setTagInput}
              />
            )}

            {currentStep === 1 && (
              <AddTickets
                form={form}
                setForm={setForm}
                ticketTypeTab={ticketTypeTab}
                setTicketTypeTab={setTicketTypeTab}
              />
            )}

            {currentStep === 2 && (
              <PublishEvent 
                form={form} 
                bannerImagePreview={bannerImagePreview} 
              />
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between mt-6">
            {currentStep > 0 ? (
              <button
                type="button"
                onClick={handleBack}
                className="text-gray-600 hover:underline"
              >
                ← Back
              </button>
            ) : (
              <div></div>
            )}
            {currentStep < steps.length - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className="bg-sky-600 text-white px-6 py-2 rounded hover:bg-sky-700"
              >
                Save & Continue →
              </button>
            ) : (
              <button
                type="submit"
                className="bg-sky-600 text-white px-6 py-2 rounded hover:bg-sky-700"
              >
                Create Event Page
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConferenceForm;