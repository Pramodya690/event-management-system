import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MapPicker from "../../components/MapPicker";

const steps = ["Build Event Page", "Add Tickets", "Publish"];
const ticketTabs = ["paid", "free", "donation"];


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


  //temparary logic
  const handleGenerateAgendaWithAI = async () => {
  const { eventName, date, time, location, description } = form;

  const prompt = `
    Create a detailed agenda for an event named "${eventName}" scheduled on ${date} at ${time} in ${location}.
    Event description: ${description || "No description provided."}
  `;

  // Replace this with your actual call to OpenAI or a local function
  const aiGeneratedText = await fetchAgendaFromAI(prompt);

  setForm((prev) => ({ ...prev, generatedAgenda: aiGeneratedText }));
};

  //temparary logic
const handleGenerateSeatingWithAI = () => {
  const rows = parseInt(form.seatRows) || 5;
  const cols = parseInt(form.seatCols) || 10;

  let chart = "";
  for (let i = 0; i < rows; i++) {
    let row = "";
    for (let j = 0; j < cols; j++) {
      row += `[${String.fromCharCode(65 + i)}${j + 1}] `;
    }
    chart += row.trim() + "\n";
  }

  setForm((prev) => ({ ...prev, generatedSeating: chart }));
};


  

  const [bannerImagePreview, setBannerImagePreview] = useState(null);
  const [stallMapPreview, setStallMapPreview] = useState(null);
  const [tagInput, setTagInput] = useState("");
  const [ticketTypeTab, setTicketTypeTab] = useState("paid");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

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

  const variants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
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
                index === currentStep ? "font-bold text-blue-600" : "text-gray-500"
              }`}
            >
              <div
                className={`w-6 h-6 flex items-center justify-center rounded-full border ${
                  index === currentStep ? "bg-blue-600 text-white" : "border-gray-300"
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
              <motion.div
                key="step1"
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Build Event Page</h2>
                {/* Upload Banner Image< */}
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
                  {/* Preview Banner Image< */}
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

                {/* Event Title< */}
                <div className="p-4 border border-blue-300 rounded-lg">
                  <label className="font-semibold block mb-1">Event Title</label>
                  <p className="text-sm text-gray-500 mb-2">
                    Be clear and descriptive with a title that tells people what your event is about.
                  </p>
                  <input
                    type="text"
                    name="eventName"
                    value={form.eventName}
                    onChange={handleChange}
                    placeholder="Enter event title"
                    className="w-full border px-3 py-2 rounded"
                    required
                  />
                </div>

                {/* Date & Time Selection< */}
                <div className="p-4 border border-blue-300 rounded-lg">
                  <label className="font-semibold block mb-1">Date & Time Selection</label>
                  <div className="flex gap-2">
                    <input
                      type="date"
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                      className="w-1/2 border px-3 py-2 rounded"
                      required
                    />
                    <input
                      type="time"
                      name="time"
                      value={form.time}
                      onChange={handleChange}
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
                    onChange={handleChange}
                    placeholder="Optional: venue name or landmark"
                    className="w-full mt-3 border px-3 py-2 rounded"
                  />
                </div>

                {/* Event Description< */}
                <div className="p-4 border border-blue-300 rounded-lg">
                  <label className="font-semibold block mb-1">Event Description</label>
                  <p className="text-sm text-gray-500 mb-2">
                    Add more details about your event and include what people can expect if they attend.
                  </p>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows="4"
                    className="w-full border px-3 py-2 rounded"
                    placeholder="Describe your event..."
                  />
                </div>
                {/* Good to Know (Tags)< */}
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

                {/* FAQs< */}
                <div className="p-4 border border-blue-300 rounded-lg">
                  <label className="font-semibold block mb-1">FAQs</label>
                  <p className="text-sm text-gray-500 mb-2">
                    Make your event stand out even more. These sections help attendees find information and answer their questions - which means more ticket sales and less time answering messages.
                  </p>
                  <textarea
                    name="faqs"
                    value={form.faqs}
                    onChange={handleChange}
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

                  {/* Generate with AI Section */}
                  <div className="border-t pt-4 mt-4">
                    <h4 className="font-semibold text-gray-700 mb-1">Generate Agenda with AI</h4>
                    <p className="text-sm text-gray-500 mb-2">
                      Let AI generate a suggested agenda for your event based on the details you've entered.
                    </p>
                    <button
                      type="button"
                      className="px-4 py-2 text-blue-900 rounded transition
                                border border-blue-800
                                bg-blue-100/30 backdrop-blur-sm
                                hover:bg-blue-600 hover:text-white"
                      onClick={handleGenerateAgendaWithAI}
                    >
                      Generate with AI
                    </button>


                    {form.generatedAgenda && (
                      <div className="mt-4 p-3 bg-gray-50 border rounded text-sm text-gray-700 whitespace-pre-wrap">
                        {form.generatedAgenda}
                      </div>
                    )}
                  </div>
                </div>
                {/* Seat Allocation Section */}
                <div className="p-4 border border-blue-300 rounded-lg space-y-4">
                  <label className="font-semibold block mb-1">Seat Allocation</label>
                  <p className="text-sm text-gray-500 mb-2">
                    Specify seating layout for your event or let AI generate a seating chart for you.
                  </p>

                  {/* AI Seating Chart Generation */}
                  <div className="border-t pt-4 mt-4">
                    <h4 className="font-semibold text-gray-700 mb-1">Generate Seating Chart with AI</h4>
                    <p className="text-sm text-gray-500 mb-2">
                      AI will generate a basic seating chart based on the rows and columns you've set.
                    </p>
                    <button
                      type="button"
                      className="px-4 py-2 text-blue-900 rounded transition
                                border border-blue-800
                                bg-blue-100/30 backdrop-blur-sm
                                hover:bg-blue-600 hover:text-white"
                      onClick={handleGenerateSeatingWithAI}
                    >
                      Generate with AI
                    </button>

                    {form.generatedSeating && (
                      <div className="mt-4 overflow-x-auto border border-gray-300 rounded p-4 bg-gray-50 text-sm font-mono whitespace-pre">
                        {form.generatedSeating}
                      </div>
                    )}
                  </div>
                </div>


              </motion.div>
            )}

            {currentStep === 1 && (
            <motion.div
              key="step2"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="flex flex-col lg:flex-row gap-6"
            >
              {/* Left: Ticket Type Selection */}
              <div className="w-full lg:w-1/2 space-y-4">
                <h2 className="text-3xl font-bold text-gray-900">Create tickets</h2>
                <p className="text-gray-600">Choose a ticket type or build a section with multiple ticket types.</p>

                {["paid", "free", "donation"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setTicketTypeTab(tab)}
                    className={`w-full flex items-center justify-between p-4 border rounded-lg shadow-sm transition 
                      ${ticketTypeTab === tab
                        ? "border-blue-600 bg-blue-50 text-blue-700"
                        : "border-gray-300 hover:border-blue-400 text-gray-700 hover:text-blue-600"
                      }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-xl select-none">
                        {tab === "paid" ? "💳" : tab === "free" ? "🎟️" : "❤️"}
                      </div>
                      <div>
                        <div className="font-semibold capitalize">{tab}</div>
                        <div className="text-sm text-gray-500">
                          {tab === "paid" && "Create a ticket that people have to pay for."}
                          {tab === "free" && "Create a ticket that no one has to pay for."}
                          {tab === "donation" && "Let people pay any amount for their ticket."}
                        </div>
                      </div>
                    </div>
                    <div className="text-gray-400 text-lg select-none">›</div>
                  </button>
                ))}

                <button className="mt-6 text-sm text-blue-600 underline hover:text-blue-800">
                  Create a section
                </button>
              </div>

              {/* Right: Ticket Form */}
              <div className="w-full lg:w-1/2 p-6 border border-blue-300 rounded-lg shadow space-y-6 bg-white">
                <h3 className="text-xl font-semibold text-blue-800">Add tickets</h3>

                {/* Tabs for context highlight */}
                <div className="flex space-x-3">
                  {["paid", "free", "donation"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setTicketTypeTab(tab)}
                      className={`px-4 py-1.5 rounded border text-sm font-medium transition
                        ${
                          ticketTypeTab === tab
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-gray-100 text-blue-700 border-blue-300 hover:bg-blue-200"
                        }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>

                {/* Ticket Form Fields */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-blue-800">Name</label>
                    <input
                      type="text"
                      value={form.tickets?.[ticketTypeTab]?.[0]?.name || ""}
                      onChange={(e) => {
                        const updated = { ...form.tickets };
                        updated[ticketTypeTab][0].name = e.target.value;
                        setForm((prev) => ({ ...prev, tickets: updated }));
                      }}
                      placeholder="General Admission"
                      className="w-full border border-blue-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      maxLength={50}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-blue-800">Available quantity</label>
                    <input
                      type="number"
                      min="1"
                      value={form.tickets?.[ticketTypeTab]?.[0]?.quantity || ""}
                      onChange={(e) => {
                        const updated = { ...form.tickets };
                        updated[ticketTypeTab][0].quantity = e.target.value;
                        setForm((prev) => ({ ...prev, tickets: updated }));
                      }}
                      className="w-full border border-blue-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  {ticketTypeTab === "paid" && (
                    <div>
                      <label className="block text-sm font-medium text-blue-800">Price ($)</label>
                      <input
                        type="number"
                        min="0"
                        value={form.tickets?.[ticketTypeTab]?.[0]?.price || ""}
                        onChange={(e) => {
                          const updated = { ...form.tickets };
                          updated[ticketTypeTab][0].price = e.target.value;
                          setForm((prev) => ({ ...prev, tickets: updated }));
                        }}
                        className="w-full border border-blue-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-blue-800">Sales start</label>
                      <input
                        type="date"
                        className="w-full border border-blue-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="time"
                        className="w-full mt-1 border border-blue-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-blue-800">Sales end</label>
                      <input
                        type="date"
                        className="w-full border border-blue-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="time"
                        className="w-full mt-1 border border-blue-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4 border-t border-blue-300 mt-6">
                  <button className="px-4 py-2 rounded border border-blue-400 text-blue-700 hover:bg-blue-50 transition">
                    Cancel
                  </button>
                  <button className="px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition">
                    Save
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step3"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
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
                  <a href="#" className="text-sm text-blue-600 mt-2 inline-block">Preview</a>
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
                          <span key={i} className="inline-block bg-blue-100 text-blue-700 rounded-full px-3 py-1 text-sm">
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
                </div>
              </div>
            </motion.div>

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
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                Save & Continue →
              </button>
            ) : (
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
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
