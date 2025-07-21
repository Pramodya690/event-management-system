import { useEffect } from "react";
import { motion } from "framer-motion";

const AddTickets = ({ form, setForm, ticketTypeTab, setTicketTypeTab }) => {
  // Ensure ticket object is initialized for the selected tab
  useEffect(() => {
    setForm((prev) => {
      const updated = { ...prev };
      if (!updated.tickets) updated.tickets = {};
      if (!updated.tickets[ticketTypeTab]) {
        updated.tickets[ticketTypeTab] = [
          { name: "", quantity: "", price: "" },
        ];
      }
      return updated;
    });
  }, [ticketTypeTab]);
  
  //to connect to the tickets db
//   const handleSave = async () => {
//   const ticket = form.tickets?.[ticketTypeTab]?.[0];

//   if (!ticket?.name || !ticket?.quantity || (ticketTypeTab === "paid" && !ticket?.price)) {
//     alert("Please fill in all required fields.");
//     return;
//   }

//   const salesStartDate = document.querySelector("input[type='date']").value;
//   const salesStartTime = document.querySelector("input[type='time']").value;
//   const salesEndDate = document.querySelectorAll("input[type='date']")[1].value;
//   const salesEndTime = document.querySelectorAll("input[type='time']")[1].value;

//   const sales_start = `${salesStartDate}T${salesStartTime}:00`;
//   const sales_end = `${salesEndDate}T${salesEndTime}:00`;

//   try {
//     const res = await fetch("/api/tickets", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         eventId: form.eventId, // Make sure `eventId` exists in form state
//         type: ticketTypeTab,
//         name: ticket.name,
//         quantity: ticket.quantity,
//         price: ticketTypeTab === "paid" ? ticket.price : 0,
//         sales_start,
//         sales_end,
//       }),
//     });

//     if (!res.ok) throw new Error("Failed to save ticket.");

//     const data = await res.json();
//     alert("Ticket saved successfully!");
//     console.log("Saved ticket:", data.ticket);
//   } catch (error) {
//     console.error("Error saving ticket:", error);
//     alert("An error occurred while saving the ticket.");
//   }
// };


  return (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col lg:flex-row gap-6"
    >
      {/* Left: Ticket Type Selection */}
      <div className="w-full lg:w-1/2 space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">Create tickets</h2>
        <p className="text-gray-600">
          Choose a ticket type or build a section with multiple ticket types.
        </p>

        {["paid", "free", "donation"].map((tab) => (
          <button
            key={tab}
            onClick={() => setTicketTypeTab(tab)}
            className={`w-full flex items-center justify-between p-4 border rounded-lg shadow-sm transition 
              ${
                ticketTypeTab === tab
                  ? "border-sky-600 bg-sky-50 text-sky-700"
                  : "border-gray-300 hover:border-sky-400 text-gray-700 hover:text-sky-600"
              }`}
          >
            <div className="flex items-center space-x-3">
              <div className="text-xl select-none">
                {tab === "paid" ? "💳" : tab === "free" ? "🎟️" : "❤️"}
              </div>
              <div>
                <div className="font-semibold capitalize">{tab}</div>
                <div className="text-sm text-gray-500">
                  {tab === "paid" &&
                    "Create a ticket that people have to pay for."}
                  {tab === "free" &&
                    "Create a ticket that no one has to pay for."}
                  {tab === "donation" &&
                    "Let people pay any amount for their ticket."}
                </div>
              </div>
            </div>
            <div className="text-gray-400 text-lg select-none">›</div>
          </button>
        ))}

        <button className="mt-6 text-sm text-sky-600 underline hover:text-sky-800">
          Create a section
        </button>
      </div>

      {/* Right: Ticket Form */}
      <div className="w-full lg:w-1/2 p-6 border border-sky-300 rounded-lg shadow space-y-6 bg-white">
        <h3 className="text-xl font-semibold text-sky-800">Add tickets</h3>

        {/* Tabs for context highlight */}
        <div className="flex space-x-3">
          {["paid", "free", "donation"].map((tab) => (
            <button
              key={tab}
              onClick={() => setTicketTypeTab(tab)}
              className={`px-4 py-1.5 rounded border text-sm font-medium transition
                ${
                  ticketTypeTab === tab
                    ? "bg-sky-600 text-white border-sky-600"
                    : "bg-gray-100 text-sky-700 border-sky-300 hover:bg-sky-200"
                }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Ticket Form Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-sky-800">
              Name
            </label>
            <input
              type="text"
              value={form.tickets?.[ticketTypeTab]?.[0]?.name || ""}
              onChange={(e) => {
                const updated = { ...form.tickets };
                if (!updated[ticketTypeTab]) updated[ticketTypeTab] = [{}];
                updated[ticketTypeTab][0] = {
                  ...updated[ticketTypeTab][0],
                  name: e.target.value,
                };
                setForm((prev) => ({ ...prev, tickets: updated }));
              }}
              placeholder="General Admission"
              className="w-full border border-sky-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
              maxLength={50}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-sky-800">
              Available quantity
            </label>
            <input
              type="number"
              min="1"
              value={form.tickets?.[ticketTypeTab]?.[0]?.quantity || ""}
              onChange={(e) => {
                const updated = { ...form.tickets };
                if (!updated[ticketTypeTab]) updated[ticketTypeTab] = [{}];
                updated[ticketTypeTab][0] = {
                  ...updated[ticketTypeTab][0],
                  quantity: e.target.value,
                };
                setForm((prev) => ({ ...prev, tickets: updated }));
              }}
              className="w-full border border-sky-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
              required
            />
          </div>

          {ticketTypeTab === "paid" && (
            <div>
              <label className="block text-sm font-medium text-sky-800">
                Price ($)
              </label>
              <input
                type="number"
                min="0"
                value={form.tickets?.[ticketTypeTab]?.[0]?.price || ""}
                onChange={(e) => {
                  const updated = { ...form.tickets };
                  if (!updated[ticketTypeTab]) updated[ticketTypeTab] = [{}];
                  updated[ticketTypeTab][0] = {
                    ...updated[ticketTypeTab][0],
                    price: e.target.value,
                  };
                  setForm((prev) => ({ ...prev, tickets: updated }));
                }}
                className="w-full border border-sky-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                required
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-sky-800">
                Sales start
              </label>
              <input
                type="date"
                className="w-full border border-sky-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <input
                type="time"
                className="w-full mt-1 border border-sky-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-sky-800">
                Sales end
              </label>
              <input
                type="date"
                className="w-full border border-sky-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <input
                type="time"
                className="w-full mt-1 border border-sky-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>
        </div>

        {/* <div className="flex justify-end space-x-3 pt-4 border-t border-sky-300 mt-6">
          <button className="px-4 py-2 rounded border border-sky-400 text-sky-700 hover:bg-sky-50 transition">
            Cancel
          </button>
          <button 
            
            className="px-6 py-2 rounded bg-sky-600 text-white hover:bg-sky-700 transition">
            Save
          </button>
        </div> */}
      </div>
    </motion.div>
  );
};

export default AddTickets;