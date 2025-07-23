import { motion } from "framer-motion";

const PublishEvent = ({ form, bannerImagePreview, previewURL,stallMapPreview, layoutURL,seatMapPreview,agenda }) => {
  return (
    <motion.div
      key="step3"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Your event is almost ready to publish</h2>
      <p className="text-gray-600 mb-4">Review your settings and let everyone find your event.</p>

      <div className="flex flex-col md:flex-row gap-6 border border-gray-200 rounded-lg p-6 bg-white shadow">
        
        {/* Left Card Preview */}
        <div className="w-full md:w-1/2 border border-gray-300 rounded-lg p-4 bg-gray-50">
          <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded mb-4">
            {bannerImagePreview ? (
              <img src={bannerImagePreview} alt="Banner" className="object-contain max-h-40 rounded" />
            ) : (
              <span className="text-gray-500">No Image</span>
            )}
          </div>

          <h3 className="text-lg font-semibold">{form.eventName || "Untitled Event"}</h3>
          <p className="text-sm text-gray-600">
            {form.date || "Date not set"} · {form.time || "Time not set"} GMT+5:30
          </p>
          <p className="text-sm text-gray-500 mt-1">{form.location || "To be announced"}</p>
          <p className="text-sm text-gray-500 mt-1">{form.mode || "Event mode not selected"}</p>
          <a href="#" className="text-sm text-sky-600 mt-2 inline-block">Preview</a>
            <h4 className="font-semibold text-gray-700 mb-1">Stall Map Preview</h4>

          <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded mb-4">
            {stallMapPreview ? (
              <img src={stallMapPreview} alt="stall" className="object-contain max-h-40 rounded" />
            ) : (
              <span className="text-gray-500">No Image</span>
            )}
          </div>
            <h4 className="font-semibold text-gray-700 mb-1">Seat Map Preview</h4>

          <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded mb-4">
            {seatMapPreview ? (
              <img src={seatMapPreview} alt="seat" className="object-contain max-h-40 rounded" />
            ) : (
              <span className="text-gray-500">No Image</span>
            )}
          </div>
          
        </div>

        {/* Right Metadata Section */}
        <div className="w-full md:w-1/2 space-y-6">

          {/* Type & Category */}
          <div>
            <h4 className="font-semibold text-gray-700 mb-1">Event type and category</h4>
            <p className="text-sm text-gray-500 mb-2">Your type and category help your event appear in more searches.</p>
            <div className="flex gap-2">
              <span className="px-3 py-2 border rounded bg-gray-100 text-gray-700 w-1/2">{form.type || "Not selected"}</span>
              <span className="px-3 py-2 border rounded bg-gray-100 text-gray-700 w-1/2">{form.category || "Not selected"}</span>
            </div>
          </div>

          {/* Tags */}
          <div>
            <h4 className="font-semibold text-gray-700 mb-1">Tags</h4>
            <p className="text-sm text-gray-500 mb-2">Help people discover your event.</p>
            <div className="flex flex-wrap gap-2">
              {form.tags?.length > 0 ? (
                form.tags.map((tag, i) => (
                  <span key={i} className="inline-block bg-sky-100 text-sky-700 rounded-full px-3 py-1 text-sm">
                    {tag}
                  </span>
                ))
              ) : (
                <span className="text-sm text-gray-400">No tags added</span>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="font-semibold text-gray-700 mb-1">Event Description</h4>
            <p className="text-sm text-gray-600">{form.description || "No description provided."}</p>
          </div>

          {/* Organizer Info */}
          <div>
            <h4 className="font-semibold text-gray-700 mb-1">Organizer</h4>
            <p className="text-sm text-gray-600">{form.organizerName || "Not provided"}</p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-gray-700 mb-1">Contact Information</h4>
            <p className="text-sm text-gray-600">{form.contact || "Not provided"}</p>
          </div>

          {/* Registration Limit */}
          <div>
            <h4 className="font-semibold text-gray-700 mb-1">Registration Limit</h4>
            <p className="text-sm text-gray-600">
              {form.registrationLimit ? `${form.registrationLimit} people` : "No limit specified"}
            </p>
          </div>
          {/* Agenda*/}
          <div>
            <h4 className="font-semibold text-gray-700 mb-1">Agenda</h4>
            {agenda && (
              <div className="mt-4 bg-gray-50 p-4 rounded border border-gray-200">
                <h4 className="font-semibold mb-2">Generated Agenda</h4>
                <pre className="whitespace-pre-line text-sm text-gray-700">{agenda}</pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PublishEvent;