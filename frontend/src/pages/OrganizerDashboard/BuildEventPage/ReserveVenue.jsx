import React, { useState, useEffect } from "react";
import axios from "axios";

const ReserveVenue = ({ eventDetails, selectedVenue, userEmail, eventId, venue_id }) => {
    console.log("Page got eventId =", eventId, venue_id)
  const [reservationDetails, setReservationDetails] = useState(null);
  const [emailContent, setEmailContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");

  const BACKEND_URL = "http://localhost:5000";

  useEffect(() => {
    if (!eventId || !venue_id) {
      setError("Event or venue not selected.");
      return;
    }
    setLoading(true);
    axios
      .post(`${BACKEND_URL}/api/reservations`, {
        event_id: eventId,
        venue_id: venue_id,
        user_email: userEmail || "user@example.com",
        message: `Reservation for ${eventId.event_name} at ${venue_id.venue_name}`
      })
      .then((res) => {
        console.log('Reservation data:', res.data);
        setReservationDetails(res.data);
        axios
          .get(`${BACKEND_URL}/api/generateEmail/${res.data.id}`)
          .then((response) => {
            setEmailContent(response.data.email);
            setLoading(false);
          })
          .catch((err) => {
            console.error("Failed to generate email:", err);
            setError(err.response?.data?.error || "Failed to generate email.");
            setLoading(false);
          });
      })
      .catch((err) => {
        console.error("Failed to load reservation info:", err);
        setError(err.response?.data?.error || "Could not create or fetch reservation.");
        setLoading(false);
      });
  }, [eventDetails, selectedVenue, userEmail]);

  const sendEmail = async () => {
    if (!emailContent) {
      setError("No email content to send.");
      return;
    }
    if (!reservationDetails?.venue?.email) {
      setError("No venue email available.");
      return;
    }
    setError("");
    setIsSending(true);

    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/sendEmail/${reservationDetails.id}`,
        { email: emailContent }
      );
      alert(res.data.message || "Email sent successfully to the venue.");
    } catch (err) {
      console.error("Send email error:", err);
      setError(err.response?.data?.error || "Failed to send email.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Reserve Venue
      </h2>

      {reservationDetails?.venue && eventId ? (
  <div className="mb-6 p-6 bg-white rounded-2xl shadow-sm border border-gray-200">
    <h3 className="text-xl font-semibold text-gray-800 mb-4">Venue Details</h3>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
      {/* Left column */}
      <div className="space-y-2">
        <p>
          <span className="font-medium">Name:</span>{" "}
          {reservationDetails.venue.venue_name || "N/A"}
        </p>
        <p>
          <span className="font-medium">Address:</span>{" "}
          {reservationDetails.venue.address || "N/A"}
        </p>
        <p>
          <span className="font-medium">Email:</span>{" "}
          <a
            href={`mailto:${reservationDetails.venue.email}`}
            className="text-sky-600 hover:underline"
          >
            {reservationDetails.venue.email || "N/A"}
          </a>
        </p>
      </div>

      {/* Right column */}
      <div className="space-y-2">
        {/* <p>
          <span className="font-medium">Request ID:</span>{" "}
          {reservationDetails.id}
        </p> */}
        <p className="flex items-center">
          <span className="font-medium mr-2">Status:</span>
          <span
            className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
              reservationDetails.status === "pending"
                ? "bg-yellow-100 text-yellow-800"
                : reservationDetails.status === "confirmed"
                ? "bg-blue-100 text-blue-800"
                : reservationDetails.status === "accepted"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {reservationDetails.status || "pending"}
          </span>
        </p>
      </div>
    </div>
  </div>
) : (
  <p className="text-gray-500 mb-6">
    {loading
      ? "Loading reservation details..."
      : error || "Please select an event and venue."}
  </p>
)}

{error && (
  <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
    {error}
  </div>
)}


      <div className="flex gap-4 mb-6">
        <button
          onClick={sendEmail}
          disabled={isSending || !emailContent || reservationDetails?.status !== 'pending'}
          className={`px-4 py-2 rounded text-white transition-colors ${
            isSending || !emailContent || reservationDetails?.status !== 'pending'
              ? "bg-green-300 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {isSending ? "Sending..." : "Send Email to Venue"}
        </button>
      </div>

      {/* {emailContent && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Email Preview</h3>
          <textarea
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
            rows={10}
            className="w-full border rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Generated email will appear here..."
          />
        </div>
      )} */}
    </div>
  );
};

export default ReserveVenue;