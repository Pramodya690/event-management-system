import { motion } from "framer-motion";
import MapPicker from "../../CreateEventForm/MapPicker";

const BuildEventPage = ({ form, setForm, bannerImagePreview, setBannerImagePreview, tagInput, setTagInput }) => {
  return (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Build Conference Event Page</h2>
      {/* Upload Banner Image */}
      <div className="p-4 border border-blue-300 rounded-lg">
        <label className="font-semibold block mb-1">Upload Banner Image</label>
        <p className="text-sm text-gray-500 mb-2">
          Upload a high-quality banner that represents your event.
        </p>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              setBannerImagePreview(URL.createObjectURL(file));
            }
          }}
        />
        {/* Preview Banner Image */}
        <div className="mt-2 w-full h-48 border rounded flex items-center justify-center bg-gray-50">
          {bannerImagePreview ? (
            <img
              src={bannerImagePreview}
              alt="Banner Preview"
              className="max-h-full max-w-full object-contain"
            />
          ) : (
            <span className="text-gray-400">No banner image selected</span>
          )}
        </div>
      </div>

      {/* Event Title */}
      <div className="p-4 border border-blue-300 rounded-lg">
        <label className="font-semibold block mb-1">Event Title</label>
        <p className="text-sm text-gray-500 mb-2">
          Be clear and descriptive with a title that tells people what your event is about.
        </p>
        <input
          type="text"
          name="eventName"
          value={form.eventName}
          onChange={(e) => {
            const { name, value } = e.target;
            setForm((prev) => ({ ...prev, [name]: value }));
          }}
          placeholder="Enter event title"
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>

      {/* Date & Time Selection */}
      <div className="p-4 border border-blue-300 rounded-lg">
        <label className="font-semibold block mb-1">Date & Time Selection</label>
        <div className="flex gap-2">
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={(e) => {
              const { name, value } = e.target;
              setForm((prev) => ({ ...prev, [name]: value }));
            }}
            className="w-1/2 border px-3 py-2 rounded"
            required
          />
          <input
            type="time"
            name="time"
            value={form.time}
            onChange={(e) => {
              const { name, value } = e.target;
              setForm((prev) => ({ ...prev, [name]: value }));
            }}
            className="w-1/2 border px-3 py-2 rounded"
            required
          />
        </div>
      </div>

      {/* Location */}
      <div className="p-4 border border-blue-300 rounded-lg">
        <label className="font-semibold block mb-1">Location</label>
        <p className="text-sm text-gray-500 mb-2">
          Click on the map to choose the location of your event.
        </p>

        <MapPicker
          value={form.coordinates || [20.5937, 78.9629]}
          onChange={(coords) => {
            setForm((prev) => ({
              ...prev,
              coordinates: coords,
            }));
          }}
        />

        <input
          type="text"
          name="location"
          value={form.location}
          onChange={(e) => {
            const { name, value } = e.target;
            setForm((prev) => ({ ...prev, [name]: value }));
          }}
          placeholder="Optional: venue name or landmark"
          className="w-full mt-3 border px-3 py-2 rounded"
        />
      </div>

      {/* Event Description */}
      <div className="p-4 border border-blue-300 rounded-lg">
        <label className="font-semibold block mb-1">Event Description</label>
        <p className="text-sm text-gray-500 mb-2">
          Add more details about your event and include what people can expect if they attend.
        </p>
        <textarea
          name="description"
          value={form.description}
          onChange={(e) => {
            const { name, value } = e.target;
            setForm((prev) => ({ ...prev, [name]: value }));
          }}
          rows="4"
          className="w-full border px-3 py-2 rounded"
          placeholder="Describe your event..."
        />
      </div>

      {/* Good to Know (Tags) */}
      <div className="p-4 border border-blue-300 rounded-lg">
        <label className="font-semibold block mb-1">Good to Know (Tags)</label>
        <p className="text-sm text-gray-500 mb-2">
          Use this section to feature specific information about your event. Add highlights and frequently asked questions for attendees.
        </p>
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
          className="w-full border px-3 py-2 rounded"
          placeholder="Type and press Enter"
        />
        <div className="flex flex-wrap gap-2 mt-2">
          {form.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full flex items-center"
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
                className="ml-2 text-blue-500"
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* FAQs */}
      <div className="p-4 border border-blue-300 rounded-lg">
        <label className="font-semibold block mb-1">FAQs</label>
        <p className="text-sm text-gray-500 mb-2">
          Make your event stand out even more. These sections help attendees find information and answer their questions - which means more ticket sales and less time answering messages.
        </p>
        <textarea
          name="faqs"
          value={form.faqs}
          onChange={(e) => {
            const { name, value } = e.target;
            setForm((prev) => ({ ...prev, [name]: value }));
          }}
          rows="3"
          className="w-full border px-3 py-2 rounded"
          placeholder="Enter FAQs separated by line breaks"
        />
      </div>

      {/* Upload Agenda */}
      <div className="p-4 border border-blue-300 rounded-lg space-y-4">
        <div>
          <label className="font-semibold block mb-1">Upload Agenda</label>
          <p className="text-sm text-gray-500 mb-2">
            Upload a detailed agenda or schedule so attendees know what sessions, activities, or timings to expect during the event.
          </p>
          <input
            type="file"
            accept=".pdf,image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setForm((prev) => ({ ...prev, agenda: file }));
              }
            }}
          />
          {form.agenda && (
            <p className="mt-2 text-sm text-green-600">{form.agenda.name} selected</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default BuildEventPage;