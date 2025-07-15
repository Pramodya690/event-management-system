import { useState } from "react";
import { motion } from "framer-motion";

const BuildEventPage = ({
  form,
  setForm,
  tagInput,
  setTagInput,
}) => {


  const handleSave = async (e) => {
  e.preventDefault();

  // connected to event
  const payload = {
        event_title: form.eventName,
        date: form.date,
        time: form.time,
        location: form.location,
        description: form.description,
        tags: form.tags,
        faqs: form.faqs,
  };

  try {
    const response = await fetch('http://localhost:5000/api/createEvent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      alert('Event created!');
    } else {
      alert('Event creation failed.');
    }
  } catch (err) {
    console.error('Error during event creation:', err);
    alert('Something went wrong.');
  }
};

  return (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Build Conference Event Page
      </h2>

      {/* Event Title */}
      <div className="p-4 border border-sky-300 rounded-lg">
        <label className="font-semibold block mb-1">Event Title</label>
        <input
          type="text"
          name="eventName"
          value={form.eventName}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, eventName: e.target.value }))
          }
          placeholder="Enter event title"
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>

      {/* Date & Time */}
      <div className="p-4 border border-sky-300 rounded-lg">
        <label className="font-semibold block mb-1">Date & Time</label>
        <div className="flex gap-2">
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, date: e.target.value }))
            }
            className="w-1/2 border px-3 py-2 rounded"
            required
          />
          <input
            type="time"
            name="time"
            value={form.time}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, time: e.target.value }))
            }
            className="w-1/2 border px-3 py-2 rounded"
            required
          />
        </div>
      </div>

      {/* Location */}
      <div className="p-4 border border-sky-300 rounded-lg">
        <label className="font-semibold block mb-1">Location</label>
        <input
          type="text"
          name="location"
          value={form.location}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, location: e.target.value }))
          }
          placeholder="Enter event location"
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>

      {/* Description */}
      <div className="p-4 border border-sky-300 rounded-lg">
        <label className="font-semibold block mb-1">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, description: e.target.value }))
          }
          rows="4"
          placeholder="Describe your event..."
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      {/* Tags */}
      <div className="p-4 border border-sky-300 rounded-lg">
        <label className="font-semibold block mb-1">Tags</label>
        <input
          type="text"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault();
              const trimmed = tagInput.trim();
              if (trimmed && !form.tags.includes(trimmed)) {
                setForm((prev) => ({
                  ...prev,
                  tags: [...prev.tags, trimmed],
                }));
              }
              setTagInput("");
            }
          }}
          placeholder="Type a tag and press Enter"
          className="w-full border px-3 py-2 rounded"
        />
        <div className="flex flex-wrap gap-2 mt-2">
          {form.tags.map((tag, idx) => (
            <span
              key={idx}
              className="bg-sky-100 text-sky-800 px-2 py-1 rounded-full flex items-center"
            >
              {tag}
              <button
                type="button"
                onClick={() =>
                  setForm((prev) => ({
                    ...prev,
                    tags: prev.tags.filter((t) => t !== tag),
                  }))
                }
                className="ml-2 text-sky-500"
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* FAQs */}
      <div className="p-4 border border-sky-300 rounded-lg">
        <label className="font-semibold block mb-1">FAQs</label>
        <textarea
          name="faqs"
          value={form.faqs}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, faqs: e.target.value }))
          }
          rows="3"
          placeholder="Enter FAQs separated by line breaks"
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <button
        type="button"
        onClick={handleSave}
        className="bg-sky-600 text-white px-6 py-2 rounded hover:bg-sky-700"
      >
        Save Event
      </button>
    </motion.div>
  );
};

export default BuildEventPage;