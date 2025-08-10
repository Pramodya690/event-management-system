import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaCreditCard, FaLock, FaExclamationCircle } from "react-icons/fa";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const ticket = location.state?.ticket || {
    name: "General Admission",
    price: 10,
    quantity: 100,
    type: "paid",
  };
  const event = location.state?.event || {
    id: 1,
    eventName: "Untitled Exhibition",
  };

  const [quantity, setQuantity] = useState(1);
  const [donationAmount, setDonationAmount] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (quantity < 1) {
      newErrors.quantity = "Quantity must be at least 1";
    }
    if (ticket.quantity && quantity > ticket.quantity) {
      newErrors.quantity = `Only ${ticket.quantity} tickets available`;
    }
    if (ticket.type === "donation" && donationAmount <= 0) {
      newErrors.donationAmount = "Donation amount must be greater than 0";
    }
    return newErrors;
  };

  // when attendee clicks on the confirm payment
  const handleConfirm = async () => {
  const formErrors = validateForm();
  if (Object.keys(formErrors).length > 0) {
    setErrors(formErrors);
    return;
  }

  const userId = localStorage.getItem("userId");
  if (!userId) {
    alert("User is not logged in.");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/purchaseTicket", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // attendeeId: 1, // Replace with actual logged-in user ID
        // const attendeeId = localStorage.getItem("attendeeId") || 1;
        attendeeId: parseInt(userId), // user ID from localStorage
        eventId: event.id,
        ticketId: ticket.id,
        quantity: quantity,
        totalAmount: parseFloat(totalCost)
      })
    });

    if (!response.ok) {
      const data = await response.json();
      alert(`Error: ${data.error}`);
    } else {
      console.error("direct to payment gateway");
      alert(`success`);
      // navigate("/payment-success"); // or to the gateway
    }
  } catch (err) {
    console.error("Payment error:", err);
    alert("Something went wrong");
  }
};


  // const handleConfirm = () => {
  //   const formErrors = validateForm();
  //   if (Object.keys(formErrors).length > 0) {
  //     setErrors(formErrors);
  //     return;
  //   }
  //   alert("Payment confirmed (mock action).");
  // };

  const totalCost =
    ticket.type === "paid"
      ? (ticket.price * quantity).toFixed(2)
      : ticket.type === "donation"
      ? donationAmount
        ? Number(donationAmount).toFixed(2)
        : "0.00"
      : "0.00";

  return (
    <div className="min-h-screen bg-sky-50 flex flex-col">
      <Navigation />
      <main className="flex-grow">
        <div className="max-w-6xl mx-auto my-8">
          {/* Breadcrumb */}
          <div className="mb-4">
            <button
              className="text-sky-600 hover:text-sky-700 font-medium flex items-center gap-1 transition-all duration-300"
              onClick={() => navigate(`/events/${event.id}`)}
              aria-label="Back to event"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to {event.eventName}
            </button>
          </div>

          {/* Main Payment Card */}
          <div className="bg-white shadow-xl border border-sky-200 rounded-xl p-8 bg-gradient-to-b from-white to-sky-50">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900">
                Complete Your Purchase
              </h2>
              <div className="flex items-center gap-2 bg-sky-100 px-3 py-1 rounded-full">
                <FaLock className="text-sky-600" />
                <span className="text-sm font-medium text-sky-600">
                  Secure Checkout
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
              {/* Left: Ticket Summary */}
              <div className="bg-sky-50 border border-sky-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Order Summary
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">
                      Ticket Type
                    </span>
                    <span className="font-semibold text-gray-900">
                      {ticket.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Price</span>
                    <span className="font-semibold text-gray-900">
                      {ticket.type === "paid"
                        ? `$${ticket.price.toFixed(2)}`
                        : ticket.type === "free"
                        ? "Free"
                        : "Donation"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Quantity</span>
                    <span className="font-semibold text-gray-900">
                      {quantity}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-sky-200 pt-4">
                    <span className="font-semibold text-gray-800">Total</span>
                    <span className="font-bold text-sky-600">${totalCost}</span>
                  </div>
                  <p className="text-sm text-gray-500">
                    {ticket.quantity} tickets available
                  </p>
                </div>
              </div>

              {/* Right: Payment Form */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Payment Details
                </h3>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Quantity
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => {
                        setQuantity(Number(e.target.value));
                        setErrors({ ...errors, quantity: "" });
                      }}
                      min="1"
                      max={ticket.quantity}
                      className="w-full p-3 border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300 pr-8"
                      aria-label="Ticket quantity"
                    />
                    {errors.quantity && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                        <FaExclamationCircle className="text-red-500" />
                        <span className="text-red-500 text-sm">
                          {errors.quantity}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                {ticket.type === "donation" && (
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">
                      Donation Amount ($)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={donationAmount}
                        onChange={(e) => {
                          setDonationAmount(Number(e.target.value));
                          setErrors({ ...errors, donationAmount: "" });
                        }}
                        min="0"
                        step="any"
                        placeholder="Enter amount"
                        className="w-full p-3 border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300 pr-8"
                        aria-label="Donation amount"
                      />
                      {errors.donationAmount && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                          <FaExclamationCircle className="text-red-500" />
                          <span className="text-red-500 text-sm">
                            {errors.donationAmount}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Card Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full p-3 border border-sky-300 rounded-lg bg-gray-50 cursor-not-allowed pl-10"
                      aria-label="Card number"
                      disabled
                    />
                    <FaCreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full p-3 border border-sky-300 rounded-lg bg-gray-50 cursor-not-allowed"
                      aria-label="Expiry date"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">
                      CVC
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full p-3 border border-sky-300 rounded-lg bg-gray-50 cursor-not-allowed"
                      aria-label="CVC"
                      disabled
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full p-3 border border-sky-300 rounded-lg bg-gray-50 cursor-not-allowed"
                    aria-label="Cardholder name"
                    disabled
                  />
                </div>
                <div className="flex gap-4 mt-8">
                  <button
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-900 py-3 rounded-lg font-semibold text-lg transition-all duration-300 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                    onClick={() => navigate(-1)}
                    aria-label="Cancel payment"
                  >
                    Cancel
                  </button>
                  <button
                    className="flex-1 bg-sky-600 hover:bg-sky-700 text-white py-3 rounded-lg font-semibold text-lg transition-all duration-300 focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                    onClick={handleConfirm}
                    aria-label="Confirm payment"
                  >
                    Confirm Payment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentPage;
