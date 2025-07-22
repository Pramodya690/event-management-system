import React, { useState } from "react";
import Navigation from "../components/Navigation.jsx";
import Footer from "../components/Footer.jsx";

const ContactUs = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [faqOpen, setFaqOpen] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for form submission logic
    alert("Form submitted! (This is a placeholder action.)");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  const toggleFaq = (index) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  const faqs = [
    {
      question: "How can I contact support?",
      answer:
        "You can reach our support team via email at support@eventify.com or by phone at (123) 456-7890 during business hours.",
    },
    {
      question: "What is the response time for inquiries?",
      answer:
        "We aim to respond to all inquiries within 24-48 hours, depending on the complexity of your request.",
    },
    {
      question: "Can I schedule a consultation?",
      answer:
        "Yes, please use the contact form to request a consultation, and our team will arrange a suitable time.",
    },
  ];

  const team = [
    {
      name: "Mary Johnson",
      role: "Customer Success Manager",
      email: "mary@eventify.com",
      phone: "(123) 456-7890",
      image: "Images/girl1.jpeg",
    },
    {
      name: "Emily Cooper",
      role: "Technical Support Lead",
      email: "emily@eventify.com",
      phone: "(123) 456-7891",
      image: "Images/girl2.jpeg",
    },
    {
      name: "Lily Johnson",
      role: "Event Specialist",
      email: "lily@eventify.com",
      phone: "(123) 456-7892",
      image: "Images/girl3.jpeg",
    },
  ];

  return (
    <div className="min-h-screen bg-sky-50 flex flex-col">
      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Contact Information */}
        <div className="bg-white border border-sky-200 rounded-lg p-8 mb-16 shadow-lg text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Get in Touch
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex flex-col items-center">
              <svg
                className="w-6 h-6 text-sky-600 mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <p className="text-lg font-semibold text-gray-700">Email</p>
              <a
                href="mailto:support@eventify.com"
                className="text-base text-sky-600 hover:underline"
              >
                support@eventify.com
              </a>
            </div>
            <div className="flex flex-col items-center">
              <svg
                className="w-6 h-6 text-sky-600 mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <p className="text-lg font-semibold text-gray-700">Phone</p>
              <p className="text-base text-sky-600">(123) 456-7890</p>
            </div>
            <div className="flex flex-col items-center">
              <svg
                className="w-6 h-6 text-sky-600 mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <p className="text-lg font-semibold text-gray-700">Address</p>
              <p className="text-base text-sky-600">
                123 Sky Lane, Suite 100, San Francisco, CA 94105
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Send Us a Message
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {["name", "email", "subject"].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                  {field} <span className="text-red-500">*</span>
                </label>
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                  placeholder={`Enter your ${field}`}
                  required
                />
              </div>
            ))}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                rows="6"
                value={form.message}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                placeholder="Tell us how we can assist you..."
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-sky-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-sky-700 focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition-all duration-200 font-semibold text-lg"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm border border-gray-200"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center px-6 py-4 text-left text-gray-800 font-medium"
                >
                  <span>{faq.question}</span>
                  <svg
                    className={`w-5 h-5 transform transition-transform duration-200 ${
                      faqOpen === index ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {faqOpen === index && (
                  <div className="px-6 py-4 text-gray-600 bg-sky-50">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Team Contact Cards */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-800 text-center">
                  {member.name}
                </h3>
                <p className="text-gray-600 text-center">{member.role}</p>
                <p className="text-gray-600 text-center mt-2">
                  <a
                    href={`mailto:${member.email}`}
                    className="text-sky-600 hover:underline"
                  >
                    {member.email}
                  </a>
                </p>
                <p className="text-gray-600 text-center">{member.phone}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ContactUs;
