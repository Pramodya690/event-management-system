import React from "react";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
  FiYoutube,
} from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-sky-600 text-gray-300 pt-12 pb-6">
      {" "}
      {/* Changed from text-gray-300 to text-gray-200 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-white text-lg font-semibold mb-4">
              EventSphere
            </h3>
            <p className="text-gray-200 text-sm leading-relaxed">
              {" "}
              {/* Changed to text-gray-200 for better visibility */}
              Empowering event organizers with cutting-edge ticketing solutions
              since 2015.
            </p>
            <div className="flex items-start space-x-3 text-gray-200">
              {" "}
              {/* Changed to text-gray-200 and increased space-x */}
              <FiMapPin className="mt-0.5 flex-shrink-0 text-blue-400" />{" "}
              {/* Added mt for alignment and blue accent */}
              <span className="text-sm">
                123 Event Street, San Francisco, CA 94107
              </span>
            </div>
            <div className="flex items-start space-x-3 text-gray-200">
              {" "}
              {/* Changed to text-gray-200 and increased space-x */}
              <FiPhone className="mt-0.5 flex-shrink-0 text-blue-400" />{" "}
              {/* Added mt for alignment and blue accent */}
              <span className="text-sm">+1 (800) 555-1234</span>
            </div>
            <div className="flex items-start space-x-3 text-gray-200">
              {" "}
              {/* Changed to text-gray-200 and increased space-x */}
              <FiMail className="mt-0.5 flex-shrink-0 text-blue-400" />{" "}
              {/* Added mt for alignment and blue accent */}
              <span className="text-sm">support@eventsphere.com</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white text-lg font-semibold mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/about-us"
                  className="text-gray-300 hover:text-white transition text-sm"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/find-events"
                  className="text-gray-300 hover:text-white transition text-sm"
                >
                  Browse Events
                </a>
              </li>
              <li>
                <a
                  href="/signup/organizer"
                  className="text-gray-300 hover:text-white transition text-sm"
                >
                  Create Event
                </a>
              </li>
              <li>
                <a
                  href="/pricing"
                  className="text-gray-300 hover:text-white transition text-sm"
                >
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-white text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/help-centre"
                  className="text-gray-300 hover:text-white transition text-sm"
                >
                  Help Center
                </a>
              </li>
              {/* <li><a href="/faq" className="text-gray-300 hover:text-white transition text-sm">FAQs</a></li> */}
              <li>
                <a
                  href="/contact"
                  className="text-gray-300 hover:text-white transition text-sm"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="text-gray-300 hover:text-white transition text-sm"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="text-gray-300 hover:text-white transition text-sm"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-white text-lg font-semibold mb-4">
              Stay Updated
            </h3>
            <p className="text-gray-300 text-sm">
              {" "}
              {/* Added text-gray-300 */}
              Subscribe to our newsletter for the latest event trends and
              platform updates.
            </p>
            <form className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 rounded bg-sky-800 border border-sky-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-white placeholder-gray-300"
              />
              <button
                type="submit"
                className="bg-sky-400 hover:bg-sky-300 text-white py-2 px-4 rounded transition text-sm font-medium"
              >
                Subscribe
              </button>
            </form>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-white hover:text-blue-400 transition">
                {" "}
                {/* Changed from text-gray-400 */}
                <FiFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-white hover:text-blue-400 transition">
                {" "}
                {/* Changed from text-gray-400 */}
                <FiTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-white hover:text-blue-400 transition">
                {" "}
                {/* Changed from text-gray-400 */}
                <FiInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-white hover:text-blue-400 transition">
                {" "}
                {/* Changed from text-gray-400 */}
                <FiLinkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-white hover:text-blue-400 transition">
                {" "}
                {/* Changed from text-gray-400 */}
                <FiYoutube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-6"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-xs text-gray-400 mb-4 md:mb-0">
            {" "}
            {/* Changed from text-gray-500 to text-gray-400 */}
            &copy; {new Date().getFullYear()} EventSphere, Inc. All rights
            reserved.
          </div>
          <div className="flex space-x-6">
            <a
              href="/accessibility"
              className="text-xs text-gray-400 hover:text-white transition"
            >
              Accessibility
            </a>
            <a
              href="/sitemap"
              className="text-xs text-gray-400 hover:text-white transition"
            >
              Sitemap
            </a>
            <a
              href="/security"
              className="text-xs text-gray-400 hover:text-white transition"
            >
              Security
            </a>
            <a
              href="/trust"
              className="text-xs text-gray-400 hover:text-white transition"
            >
              Trust & Safety
            </a>
          </div>
        </div>

        {/* Payment Methods */}
        {/* <div className="flex justify-center mt-6 space-x-4">
          <img src="/visa.png" alt="Visa" className="h-10 w-auto opacity-80 hover:opacity-100 transition" />
          <img src="/mastercard.jpg" alt="Mastercard" className="h-10 w-auto opacity-80 hover:opacity-100 transition" />
          <img src="apple pay.jpg" alt="Apple Pay" className="h-10 w-auto opacity-80 hover:opacity-100 transition" />
          <img src="paypal.png" alt="PayPal" className="h-10 w-auto opacity-80 hover:opacity-100 transition" />
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
