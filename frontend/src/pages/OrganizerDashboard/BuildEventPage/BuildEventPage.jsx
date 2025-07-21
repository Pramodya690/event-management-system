// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import axios from "axios";

// const BuildEventPage = ({ form, setForm, tagInput, setTagInput, bannerImage, setBannerImage }) => {
//   // const [bannerImage, setBannerImage] = useState(null);
//   const [bannerImagePreview, setBannerImagePreview] = useState(null);
//   const [selectedVenue, setSelectedVenue] = useState(null);
//   const [venueSuggestions, setVenueSuggestions] = useState([]);

//   const fetchVenueSuggestions = async (city, headcount) => {
//     if (!city || !headcount) {
//       setVenueSuggestions([]);
//       return;
//     }

//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/venues?city=${encodeURIComponent(city)}&headcount=${headcount}`
//       );
//       if (!response.ok) throw new Error("Failed to fetch");
//       const data = await response.json();
//       setVenueSuggestions(data);
//     } catch (error) {
//       console.error("Error fetching venue suggestions:", error);
//       setVenueSuggestions([]);
//     }
//   };

//   useEffect(() => {
//     fetchVenueSuggestions(form.city, form.headcount);
//   }, [form.city, form.headcount]);

//   const handleVenueSelect = (venue) => {
//     setSelectedVenue(venue);
//     setForm((prev) => ({
//       ...prev,
//       location: `${venue.venue_name}, ${venue.address}`,
//     }));
//   };

//   const handleSave = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("event_title", form.eventName);
//     formData.append("date", form.date);
//     formData.append("time", form.time);
//     formData.append("location", form.location);
//     formData.append("description", form.description);
//     formData.append("tags", JSON.stringify(form.tags));
//     formData.append("faqs", form.faqs);

//     if (selectedVenue?.id) {
//       formData.append("venue_id", selectedVenue.id);
//     }

//     if (bannerImage) {
//       formData.append("bannerImage", bannerImage);
//     }

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/createEvent",
//         formData
//       );
//       if (response.status === 201) {
//         alert("Event created successfully!");
//       } else {
//         alert("Failed to create event.");
//       }
//     } catch (err) {
//       console.error("Error creating event:", err);
//       alert("Something went wrong!");
//     }
//   };

//   return (
//     <motion.div
//       key="step1"
//       initial={{ opacity: 0, x: 50 }}
//       animate={{ opacity: 1, x: 0 }}
//       exit={{ opacity: 0, x: -50 }}
//       transition={{ duration: 0.3 }}
//       className="space-y-6"
//     >
//       <h2 className="text-2xl font-bold text-gray-800 mb-6">
//         Build Conference Event Page
//       </h2>

//       {/* Upload Banner Image */}
//       <div className="p-4 border border-sky-300 rounded-lg">
//         <label className="font-semibold block mb-1">Upload Banner Image</label>
//         <p className="text-sm text-gray-500 mb-2">
//           Upload a high-quality banner that represents your event.
//         </p>
//         {/* <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => {
//             const file = e.target.files[0];
//             if (file) {
//               setBannerImage(file);
//               setBannerImagePreview(URL.createObjectURL(file));
//             }
//           }}
//         /> */}
//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => {
//             const file = e.target.files[0];
//             if (file) {
//               setBannerImage(file); // <== update using prop
//               setBannerImagePreview(URL.createObjectURL(file)); // optional for preview
//             }
//           }}
//         />

//         {bannerImagePreview && (
//           <img
//             src={bannerImagePreview}
//             alt="Preview"
//             className="mt-4 max-h-48 rounded shadow"
//           />
//         )}
//       </div>

//       {/* Event Title */}
//       <div className="p-4 border border-sky-300 rounded-lg">
//         <label className="font-semibold block mb-1">Event Title</label>
//         <input
//           type="text"
//           name="eventName"
//           value={form.eventName}
//           onChange={(e) =>
//             setForm((prev) => ({ ...prev, eventName: e.target.value }))
//           }
//           placeholder="Enter event title"
//           className="w-full border px-3 py-2 rounded"
//           required
//         />
//       </div>

//       {/* Date & Time */}
//       <div className="p-4 border border-sky-300 rounded-lg">
//         <label className="font-semibold block mb-1">Date & Time</label>
//         <div className="flex gap-2">
//           <input
//             type="date"
//             name="date"
//             value={form.date}
//             onChange={(e) =>
//               setForm((prev) => ({ ...prev, date: e.target.value }))
//             }
//             className="w-1/2 border px-3 py-2 rounded"
//             required
//           />
//           <input
//             type="time"
//             name="time"
//             value={form.time}
//             onChange={(e) =>
//               setForm((prev) => ({ ...prev, time: e.target.value }))
//             }
//             className="w-1/2 border px-3 py-2 rounded"
//             required
//           />
//         </div>
//       </div>

//       {/* Location Tabs */}
//       <div className="p-4 border border-sky-300 rounded-lg space-y-4">
//         <label className="font-semibold block mb-1">Location</label>
//         <div className="flex gap-2">
//           {["manual", "map", "suggested"].map((type) => (
//             <button
//               key={type}
//               type="button"
//               onClick={() =>
//                 setForm((prev) => ({ ...prev, locationType: type }))
//               }
//               className={`px-4 py-2 rounded border ${
//                 form.locationType === type
//                   ? "bg-sky-600 text-white border-sky-600"
//                   : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
//               }`}
//             >
//               {type === "manual"
//                 ? "Type Manually"
//                 : type === "map"
//                 ? "Select via Map"
//                 : "System Suggests"}
//             </button>
//           ))}
//         </div>

//         <div className="mt-4">
//           {form.locationType === "manual" && (
//             <input
//               type="text"
//               name="location"
//               value={form.location}
//               onChange={(e) =>
//                 setForm((prev) => ({
//                   ...prev,
//                   [e.target.name]: e.target.value,
//                 }))
//               }
//               placeholder="Enter address manually"
//               className="w-full border px-3 py-2 rounded"
//             />
//           )}

//           {form.locationType === "suggested" && (
//             <>
//               <input
//                 type="text"
//                 name="city"
//                 value={form.city || ""}
//                 onChange={(e) =>
//                   setForm((prev) => ({ ...prev, city: e.target.value }))
//                 }
//                 placeholder="Enter city"
//                 className="w-full border px-3 py-2 rounded"
//               />
//               <input
//                 type="number"
//                 name="headcount"
//                 value={form.headcount || ""}
//                 onChange={(e) =>
//                   setForm((prev) => ({ ...prev, headcount: e.target.value }))
//                 }
//                 placeholder="Expected headcount"
//                 className="w-full border px-3 py-2 rounded mt-2"
//               />

//               <div className="mt-4">
//                 <h4 className="font-semibold mb-2">Suggested Venues</h4>
//                 {venueSuggestions.length > 0 ? (
//                   <ul className="list-disc list-inside max-h-40 overflow-y-auto">
//                     {venueSuggestions.map((venue) => (
//                       <li
//                         key={venue.id}
//                         className={`cursor-pointer p-1 rounded ${
//                           selectedVenue?.id === venue.id
//                             ? "bg-sky-200 font-semibold"
//                             : "hover:bg-sky-100"
//                         }`}
//                         onClick={() => handleVenueSelect(venue)}
//                       >
//                         <strong>{venue.venue_name}</strong> — Capacity:{" "}
//                         {venue.capacity} — Address: {venue.address}
//                       </li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <p className="text-gray-500">
//                     No venue suggestions available.
//                   </p>
//                 )}
//               </div>

//               {selectedVenue && (
//                 <p className="text-green-600 mt-2">
//                   Selected: <strong>{selectedVenue.venue_name}</strong>
//                 </p>
//               )}
//             </>
//           )}
//         </div>
//       </div>

//       {/* Description */}
//       <div className="p-4 border border-sky-300 rounded-lg">
//         <label className="font-semibold block mb-1">Description</label>
//         <textarea
//           name="description"
//           value={form.description}
//           onChange={(e) =>
//             setForm((prev) => ({ ...prev, description: e.target.value }))
//           }
//           rows="4"
//           placeholder="Describe your event..."
//           className="w-full border px-3 py-2 rounded"
//         />
//       </div>

//       {/* Tags */}
//       <div className="p-4 border border-sky-300 rounded-lg">
//         <label className="font-semibold block mb-1">Tags</label>
//         <input
//           type="text"
//           value={tagInput}
//           onChange={(e) => setTagInput(e.target.value)}
//           onKeyDown={(e) => {
//             if (e.key === "Enter" || e.key === ",") {
//               e.preventDefault();
//               const trimmed = tagInput.trim();
//               if (trimmed && !form.tags.includes(trimmed)) {
//                 setForm((prev) => ({
//                   ...prev,
//                   tags: [...prev.tags, trimmed],
//                 }));
//               }
//               setTagInput("");
//             }
//           }}
//           placeholder="Type a tag and press Enter"
//           className="w-full border px-3 py-2 rounded"
//         />
//         <div className="flex flex-wrap gap-2 mt-2">
//           {form.tags.map((tag, idx) => (
//             <span
//               key={idx}
//               className="bg-sky-100 text-sky-800 px-2 py-1 rounded-full flex items-center"
//             >
//               {tag}
//               <button
//                 type="button"
//                 onClick={() =>
//                   setForm((prev) => ({
//                     ...prev,
//                     tags: prev.tags.filter((t) => t !== tag),
//                   }))
//                 }
//                 className="ml-2 text-sky-500"
//               >
//                 &times;
//               </button>
//             </span>
//           ))}
//         </div>
//       </div>

//       {/* FAQs */}
//       <div className="p-4 border border-sky-300 rounded-lg">
//         <label className="font-semibold block mb-1">FAQs</label>
//         <textarea
//           name="faqs"
//           value={form.faqs}
//           onChange={(e) =>
//             setForm((prev) => ({ ...prev, faqs: e.target.value }))
//           }
//           rows="3"
//           placeholder="Enter FAQs separated by line breaks"
//           className="w-full border px-3 py-2 rounded"
//         />
//       </div>

//       {/* Save Button */}
//       {/* <button
//         type="button"
//         onClick={handleSave}
//         className="bg-sky-600 text-white px-6 py-2 rounded hover:bg-sky-700"
//       >
//         Save Event
//       </button> */}
//     </motion.div>
//   );
// };

// export default BuildEventPage;



import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const BuildEventPage = ({ form, setForm, tagInput, setTagInput, bannerImage, setBannerImage }) => {
  const [bannerImagePreview, setBannerImagePreview] = useState(null);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [venueSuggestions, setVenueSuggestions] = useState([]);

  const fetchVenueSuggestions = async (city, headcount) => {
    if (!city || !headcount) {
      setVenueSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/venues?city=${encodeURIComponent(city)}&headcount=${headcount}`
      );
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setVenueSuggestions(data);
    } catch (error) {
      console.error("Error fetching venue suggestions:", error);
      setVenueSuggestions([]);
    }
  };

  useEffect(() => {
    fetchVenueSuggestions(form.city, form.headcount);
  }, [form.city, form.headcount]);

  const handleVenueSelect = (venue) => {
    setSelectedVenue(venue);
    setForm((prev) => ({
      ...prev,
      location: `${venue.venue_name}, ${venue.address}`,
      venue_id: venue.id, // optional to include venue ID
    }));
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
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Build Conference Event Page</h2>

      {/* Upload Banner Image */}
      <div className="p-4 border border-sky-300 rounded-lg">
        <label className="font-semibold block mb-1">Upload Banner Image</label>
        <p className="text-sm text-gray-500 mb-2">Upload a high-quality banner that represents your event.</p>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              setBannerImage(file);
              setBannerImagePreview(URL.createObjectURL(file));
            }
          }}
        />
        {bannerImagePreview && (
          <img src={bannerImagePreview} alt="Preview" className="mt-4 max-h-48 rounded shadow" />
        )}
      </div>

      {/* Event Title */}
      <div className="p-4 border border-sky-300 rounded-lg">
        <label className="font-semibold block mb-1">Event Title</label>
        <input
          type="text"
          name="eventName"
          value={form.eventName}
          onChange={(e) => setForm((prev) => ({ ...prev, eventName: e.target.value }))}
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
            onChange={(e) => setForm((prev) => ({ ...prev, date: e.target.value }))}
            className="w-1/2 border px-3 py-2 rounded"
            required
          />
          <input
            type="time"
            name="time"
            value={form.time}
            onChange={(e) => setForm((prev) => ({ ...prev, time: e.target.value }))}
            className="w-1/2 border px-3 py-2 rounded"
            required
          />
        </div>
      </div>

      {/* Location Section (Manual / Map / Suggested) */}
      <div className="p-4 border border-sky-300 rounded-lg space-y-4">
        <label className="font-semibold block mb-1">Location</label>
        <div className="flex gap-2">
          {["manual", "map", "suggested"].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setForm((prev) => ({ ...prev, locationType: type }))}
              className={`px-4 py-2 rounded border ${
                form.locationType === type
                  ? "bg-sky-600 text-white border-sky-600"
                  : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {type === "manual" ? "Type Manually" : type === "map" ? "Select via Map" : "System Suggests"}
            </button>
          ))}
        </div>

        <div className="mt-4">
          {form.locationType === "manual" && (
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={(e) => setForm((prev) => ({ ...prev, location: e.target.value }))}
              placeholder="Enter address manually"
              className="w-full border px-3 py-2 rounded"
            />
          )}

          {form.locationType === "suggested" && (
            <>
              <input
                type="text"
                name="city"
                value={form.city || ""}
                onChange={(e) => setForm((prev) => ({ ...prev, city: e.target.value }))}
                placeholder="Enter city"
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="number"
                name="headcount"
                value={form.headcount || ""}
                onChange={(e) => setForm((prev) => ({ ...prev, headcount: e.target.value }))}
                placeholder="Expected headcount"
                className="w-full border px-3 py-2 rounded mt-2"
              />

              <div className="mt-4">
                <h4 className="font-semibold mb-2">Suggested Venues</h4>
                {venueSuggestions.length > 0 ? (
                  <ul className="list-disc list-inside max-h-40 overflow-y-auto">
                    {venueSuggestions.map((venue) => (
                      <li
                        key={venue.id}
                        className={`cursor-pointer p-1 rounded ${
                          selectedVenue?.id === venue.id ? "bg-sky-200 font-semibold" : "hover:bg-sky-100"
                        }`}
                        onClick={() => handleVenueSelect(venue)}
                      >
                        <strong>{venue.venue_name}</strong> — Capacity: {venue.capacity} — Address: {venue.address}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No venue suggestions available.</p>
                )}
              </div>

              {selectedVenue && (
                <p className="text-green-600 mt-2">
                  Selected: <strong>{selectedVenue.venue_name}</strong>
                </p>
              )}
            </>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="p-4 border border-sky-300 rounded-lg">
        <label className="font-semibold block mb-1">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
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
                setForm((prev) => ({ ...prev, tags: [...prev.tags, trimmed] }));
              }
              setTagInput("");
            }
          }}
          placeholder="Type a tag and press Enter"
          className="w-full border px-3 py-2 rounded"
        />
        <div className="flex flex-wrap gap-2 mt-2">
          {form.tags.map((tag, idx) => (
            <span key={idx} className="bg-sky-100 text-sky-800 px-2 py-1 rounded-full flex items-center">
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
          onChange={(e) => setForm((prev) => ({ ...prev, faqs: e.target.value }))}
          rows="3"
          placeholder="Enter FAQs separated by line breaks"
          className="w-full border px-3 py-2 rounded"
        />
      </div>
    </motion.div>
  );
};

export default BuildEventPage;
