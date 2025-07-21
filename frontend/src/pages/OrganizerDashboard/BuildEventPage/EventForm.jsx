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
    category: " ",
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
    city: "",
    headcount: "",
    venue_id: null,
  });

  const [bannerImage, setBannerImage] = useState(null);
  const [bannerImagePreview, setBannerImagePreview] = useState(null);
  const [tagInput, setTagInput] = useState("");
  const [ticketTypeTab, setTicketTypeTab] = useState("paid");

  const handleNext = async () => {
    if (currentStep === 0) {
      const formData = new FormData();
      formData.append("event_title", form.eventName);
      formData.append("date", form.date);
      formData.append("time", form.time);
      formData.append("category", form.category);
      formData.append("location", form.location);
      formData.append("description", form.description);
      formData.append("tags", JSON.stringify(form.tags));
      formData.append("faqs", form.faqs);
      if (form.city) formData.append("city", form.city);
      if (form.headcount) formData.append("headcount", form.headcount);
      if (form.venue_id) formData.append("venue_id", form.venue_id);
      if (bannerImage) formData.append("bannerImage", bannerImage);

      try {
        const response = await fetch("http://localhost:5000/api/createEvent", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) throw new Error("Failed to save");

        const data = await response.json();
        console.log("Event saved and returned:", data);
        console.log("Submitting tickets with event ID:", form.eventId);


        setForm((prev) => ({
          ...prev,
          eventName: data.event_title,
          date: data.date,
          time: data.time,
          category: data.category,
          location: data.location,
          venue_id: data.venue_id,
          description: data.description,
          tags: JSON.parse(data.tags || "[]"),
          faqs: data.faqs,
          city: data.city,
          headcount: data.headcount,
        }));

        if (data.banner_image) {
          const blob = new Blob([new Uint8Array(data.banner_image.data)], { type: "image/png" });
          const url = URL.createObjectURL(blob);
          setBannerImagePreview(url);
        }

        alert("Event data saved successfully!");
      } catch (err) {
        console.error("Save failed:", err);
        alert("Failed to save event.");
        return;
      }
    }

    // to add the tickets
    if (currentStep === 1) {
    const tickets = form.tickets || {};

    try {
      for (const type of Object.keys(tickets)) {
        if (!["paid", "free", "donation"].includes(type)) continue;

        for (const ticket of tickets[type]) {
          const payload = {
            eventId: form.eventId,
            type,
            name: ticket.name,
            quantity: ticket.quantity,
            price: type === "paid" ? ticket.price : 0,
            sales_start: ticket.sales_start,
            sales_end: ticket.sales_end,
          };

          const res = await fetch("http://localhost:5000/api/tickets", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

          if (!res.ok) throw new Error("Failed to save ticket");

          const data = await res.json();
          console.log("Ticket saved:", data.ticket);
        }
      }

      alert("All tickets saved successfully!");
    } catch (error) {
      console.error("Ticket save failed:", error);
      alert("Failed to save one or more tickets.");
      return;
    }
  }


    if (currentStep < steps.length - 1) setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      event_title: form.eventName,
      date: form.date,
      time: form.time,
      location: form.location,
      description: form.description,
      tags: form.tags,
      faqs: form.faqs,
      tickets: form.tickets,
    };
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-white shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-6">
          Event Setup
        </h2>
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
                bannerImage={bannerImage}
                setBannerImage={setBannerImage}
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
                save eventtt
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