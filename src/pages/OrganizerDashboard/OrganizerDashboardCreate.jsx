import React, { useState } from "react";
import { MdCalendarMonth } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";

const OrganizerDashboardCreate = () => {
  const [form, setForm] = useState({
    eventName: "",
    date: "",
    location: "",
    description: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Creating event with data:", form);
    if (imageFile) {
      console.log("With image file:", imageFile);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden p-6">

          {/* Image Upload Section at top with spacing */}
        <div className="mb-8">
        <label
            htmlFor="image"
            className="block text-gray-700 font-semibold mb-2"
        >
            Upload Event Image
        </label>
        <input
            type="file"
            accept="image/*"
            id="image"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-700
                    file:mr-4 file:py-2 file:px-4
                    file:rounded file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100 mb-4"
        />
        <div className="w-full h-[250px] border border-dashed border-gray-400 rounded flex items-center justify-center bg-gray-100">
            {imagePreview ? (
            <img
                src={imagePreview}
                alt="Event Preview"
                className="max-h-full max-w-full object-contain rounded"
            />
            ) : (
            <span className="text-gray-500">Image preview will appear here</span>
            )}
        </div>
        </div>



          <h2 className="text-3xl font-bold mb-6 text-gray-800">Create New Event</h2>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Event Name */}
            <div>
              <label
                className="block text-gray-700 font-semibold mb-1"
                htmlFor="eventName"
              >
                Event Name
              </label>
              <input
                type="text"
                name="eventName"
                id="eventName"
                value={form.eventName}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Enter event name"
              />
            </div>

            {/* Date */}
            <div>
              <label
                className="block text-gray-700 font-semibold mb-1"
                htmlFor="date"
              >
                Date
              </label>
              <input
                type="date"
                name="date"
                id="date"
                value={form.date}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {/* Location */}
            <div>
              <label
                className="block text-gray-700 font-semibold mb-1"
                htmlFor="location"
              >
                Location
              </label>
              <input
                type="text"
                name="location"
                id="location"
                value={form.location}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Enter location"
              />
            </div>

            {/* Description */}
            <div>
              <label
                className="block text-gray-700 font-semibold mb-1"
                htmlFor="description"
              >
                Event Description
              </label>
              <textarea
                name="description"
                id="description"
                rows={5}
                value={form.description}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Write a description for your event"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded font-semibold hover:bg-blue-700 transition"
            >
              Create Event
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrganizerDashboardCreate;
