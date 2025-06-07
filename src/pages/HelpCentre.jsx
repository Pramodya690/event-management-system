// import React from 'react';
// import Navigation from "../components/Navigation/Navigation.jsx";
// import helpBanner from '../assets/helpBanner.jpg'; // ✅ Adjust path as needed

// const HelpCentre = () => {
//   return (
//     <>
//       <Navigation /> {/* ✅ Navbar at the top */}

//       <div className="min-h-screen bg-gray-50 py-10 px-4">
//         <div className="max-w-4xl mx-auto">
//           {/* Top image */}
//           <img
//             src={helpBanner}
//             alt="Help Center Banner"
//             className="w-full h-auto rounded-xl mb-6 shadow-sm object-cover"
//           />
          
//           <h1 className="text-3xl font-bold text-sky-700 mb-6">Help Center</h1>

//           <div className="bg-white p-6 rounded-lg shadow-md space-y-8">
//             {/* Creating and Editing Ticket Types */}
//             <section>
//               <h2 className="text-xl font-semibold text-gray-800 mb-2">
//                 Creating and Editing Ticket Types
//               </h2>
//               <details className="text-gray-600">
//                 <summary className="cursor-pointer font-medium text-sky-600 hover:underline">
//                   View Article
//                 </summary>
//                 <div className="mt-4 space-y-4 text-sm leading-6">
//                   {/* Content omitted */}
//                 </div>
//               </details>
//             </section>

//             {/* Add and Manage Payout Details */}
//             <section>
//               <h2 className="text-xl font-semibold text-gray-800 mb-2">
//                 Add and Manage Your Payout Details
//               </h2>
//               <details className="text-gray-600">
//                 <summary className="cursor-pointer font-medium text-sky-600 hover:underline">
//                   View Article
//                 </summary>
//                 <div className="mt-4 space-y-4 text-sm leading-6">
//                   {/* Content omitted */}
//                 </div>
//               </details>
//             </section>

//             {/* Add Images and Video to Your Event */}
//             <section>
//               <h2 className="text-xl font-semibold text-gray-800 mb-2">
//                 Add Images and Video to Your Event
//               </h2>
//               <details className="text-gray-600">
//                 <summary className="cursor-pointer font-medium text-sky-600 hover:underline">
//                   View Article
//                 </summary>
//                 <div className="mt-4 space-y-4 text-sm leading-6">
//                   {/* Full content you already wrote goes here */}
//                 </div>
//               </details>
//             </section>

//             {/* Contact Info */}
//             <section>
//               <h2 className="text-xl font-semibold text-gray-800 mb-2">Still need help?</h2>
//               <p className="text-gray-600">
//                 Email us at <a href="mailto:support@eventhub.com" className="text-sky-600 underline">support@eventhub.com</a>
//               </p>
//             </section>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default HelpCentre;
import React from 'react';
import Navigation from "../components/Navigation/Navigation.jsx";
import helpBanner from '../assets/helpBanner.jpg';
import { FiSearch, FiMail, FiPhone, FiMessageSquare, FiClock, FiChevronDown } from 'react-icons/fi';
import Footer from '../components/Footer/Footer.jsx';

const HelpCentre = () => {
  return (
    <>
      <Navigation />

      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="relative mb-12">
            <img
              src={helpBanner}
              alt="Help Center Banner"
              className="w-full h-64 md:h-80 rounded-xl object-cover shadow-lg"
            />
            <div className="absolute inset-0 bg-sky-800 bg-opacity-50 rounded-xl flex items-center justify-center">
              <div className="text-center p-6 max-w-2xl">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">How can we help you?</h1>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search help articles..."
                    className="w-full py-3 px-4 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                  <FiSearch className="absolute right-4 top-3.5 text-gray-400 text-xl" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white p-6 rounded-lg shadow-md space-y-8">
                <h2 className="text-2xl font-bold text-gray-800 border-b pb-4">Frequently Asked Questions</h2>

                {/* Creating and Editing Ticket Types */}
                <section className="border-b pb-6 last:border-b-0">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    Creating and Editing Ticket Types
                  </h3>
                  <div className="space-y-4">
                    <details className="group">
                      <summary className="flex justify-between items-center cursor-pointer list-none p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                        <span className="font-medium text-gray-800">How do I create a new ticket type?</span>
                        <FiChevronDown className="text-gray-500 group-open:rotate-180 transform transition-transform" />
                      </summary>
                      <div className="mt-3 px-3 pb-3 text-gray-600 space-y-3">
                        <p>To create a new ticket type:</p>
                        <ol className="list-decimal pl-5 space-y-2">
                          <li>Navigate to your event dashboard</li>
                          <li>Click on "Ticket Types" in the left menu</li>
                          <li>Select "Add New Ticket Type"</li>
                          <li>Fill in the details (name, price, quantity, etc.)</li>
                          <li>Set any restrictions or access levels if needed</li>
                          <li>Click "Save" to create your ticket type</li>
                        </ol>
                        <p className="text-sm text-gray-500">Note: You can create up to 10 different ticket types per event.</p>
                      </div>
                    </details>

                    <details className="group">
                      <summary className="flex justify-between items-center cursor-pointer list-none p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                        <span className="font-medium text-gray-800">Can I edit a ticket type after it's been created?</span>
                        <FiChevronDown className="text-gray-500 group-open:rotate-180 transform transition-transform" />
                      </summary>
                      <div className="mt-3 px-3 pb-3 text-gray-600 space-y-3">
                        <p>Yes, you can edit most aspects of a ticket type as long as no tickets have been sold yet:</p>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>Name and description</li>
                          <li>Price (can be increased but not decreased if tickets are sold)</li>
                          <li>Quantity available (can be increased but not decreased if tickets are sold)</li>
                          <li>Sales start/end dates</li>
                        </ul>
                        <p className="text-sm text-gray-500">Important: Some changes may require approval from our team if they significantly alter the ticket terms.</p>
                      </div>
                    </details>
                  </div>
                </section>

                {/* Add and Manage Payout Details */}
                <section className="border-b pb-6 last:border-b-0">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    Add and Manage Your Payout Details
                  </h3>
                  <div className="space-y-4">
                    <details className="group">
                      <summary className="flex justify-between items-center cursor-pointer list-none p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                        <span className="font-medium text-gray-800">How do I set up my payout information?</span>
                        <FiChevronDown className="text-gray-500 group-open:rotate-180 transform transition-transform" />
                      </summary>
                      <div className="mt-3 px-3 pb-3 text-gray-600 space-y-3">
                        <p>To set up your payout details:</p>
                        <ol className="list-decimal pl-5 space-y-2">
                          <li>Go to your account settings</li>
                          <li>Select "Payout Preferences"</li>
                          <li>Choose your payout method (bank transfer, PayPal, etc.)</li>
                          <li>Enter all required information</li>
                          <li>Verify your identity if prompted</li>
                          <li>Save your settings</li>
                        </ol>
                        <p className="text-sm text-gray-500">Note: Payouts are processed 5-7 business days after your event ends.</p>
                      </div>
                    </details>

                    <details className="group">
                      <summary className="flex justify-between items-center cursor-pointer list-none p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                        <span className="font-medium text-gray-800">What are the payout processing fees?</span>
                        <FiChevronDown className="text-gray-500 group-open:rotate-180 transform transition-transform" />
                      </summary>
                      <div className="mt-3 px-3 pb-3 text-gray-600 space-y-3">
                        <p>Our standard processing fees are:</p>
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Payout Method</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Processing Fee</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Processing Time</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                              <td className="px-4 py-2 text-sm">Bank Transfer (ACH)</td>
                              <td className="px-4 py-2 text-sm">1.5%</td>
                              <td className="px-4 py-2 text-sm">3-5 business days</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-2 text-sm">PayPal</td>
                              <td className="px-4 py-2 text-sm">2.5%</td>
                              <td className="px-4 py-2 text-sm">1-2 business days</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-2 text-sm">Wire Transfer</td>
                              <td className="px-4 py-2 text-sm">$25 flat fee</td>
                              <td className="px-4 py-2 text-sm">1-3 business days</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </details>
                  </div>
                </section>

                {/* Add Images and Video to Your Event */}
                <section className="border-b pb-6 last:border-b-0">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    Add Images and Video to Your Event
                  </h3>
                  <div className="space-y-4">
                    <details className="group">
                      <summary className="flex justify-between items-center cursor-pointer list-none p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                        <span className="font-medium text-gray-800">What are the recommended image specifications?</span>
                        <FiChevronDown className="text-gray-500 group-open:rotate-180 transform transition-transform" />
                      </summary>
                      <div className="mt-3 px-3 pb-3 text-gray-600 space-y-3">
                        <p>For optimal display quality, we recommend:</p>
                        <ul className="list-disc pl-5 space-y-2">
                          <li><strong>Main event image:</strong> 1920x1080 pixels (16:9 aspect ratio), JPG or PNG, under 5MB</li>
                          <li><strong>Thumbnail image:</strong> 600x600 pixels (1:1 aspect ratio), JPG or PNG, under 2MB</li>
                          <li><strong>Additional images:</strong> Minimum 1200px on the longest side, under 3MB each</li>
                        </ul>
                        <p className="text-sm text-gray-500">Tip: Use high-quality, well-lit images that clearly represent your event.</p>
                      </div>
                    </details>

                    <details className="group">
                      <summary className="flex justify-between items-center cursor-pointer list-none p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                        <span className="font-medium text-gray-800">How do I add a video to my event page?</span>
                        <FiChevronDown className="text-gray-500 group-open:rotate-180 transform transition-transform" />
                      </summary>
                      <div className="mt-3 px-3 pb-3 text-gray-600 space-y-3">
                        <p>You can embed videos from YouTube or Vimeo:</p>
                        <ol className="list-decimal pl-5 space-y-2">
                          <li>Upload your video to YouTube or Vimeo</li>
                          <li>Copy the share/embed link</li>
                          <li>In your event editor, go to the "Media" section</li>
                          <li>Click "Add Video" and paste the URL</li>
                          <li>Save your changes</li>
                        </ol>
                        <div className="bg-sky-50 p-3 rounded border border-sky-100">
                          <h4 className="font-medium text-sky-800 mb-1">Best Practices:</h4>
                          <ul className="list-disc pl-5 text-sm space-y-1">
                            <li>Keep videos under 2 minutes for best engagement</li>
                            <li>Include captions for accessibility</li>
                            <li>Start with your most compelling content</li>
                            <li>Use landscape orientation (16:9)</li>
                          </ul>
                        </div>
                      </div>
                    </details>
                  </div>
                </section>

                {/* Event Promotion Tips */}
                <section className="border-b pb-6 last:border-b-0">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    Event Promotion Tips
                  </h3>
                  <div className="space-y-4">
                    <details className="group">
                      <summary className="flex justify-between items-center cursor-pointer list-none p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                        <span className="font-medium text-gray-800">What are the best ways to promote my event?</span>
                        <FiChevronDown className="text-gray-500 group-open:rotate-180 transform transition-transform" />
                      </summary>
                      <div className="mt-3 px-3 pb-3 text-gray-600 space-y-3">
                        <p>Effective promotion strategies include:</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-gray-50 p-3 rounded border">
                            <h4 className="font-medium mb-1">Digital Marketing</h4>
                            <ul className="list-disc pl-5 text-sm space-y-1">
                              <li>Social media campaigns</li>
                              <li>Email newsletters</li>
                              <li>Influencer partnerships</li>
                              <li>Paid advertising (Facebook, Instagram, Google)</li>
                            </ul>
                          </div>
                          <div className="bg-gray-50 p-3 rounded border">
                            <h4 className="font-medium mb-1">Organic Promotion</h4>
                            <ul className="list-disc pl-5 text-sm space-y-1">
                              <li>Early bird discounts</li>
                              <li>Referral programs</li>
                              <li>Community partnerships</li>
                              <li>Press releases</li>
                            </ul>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">Our platform also offers built-in promotion tools you can access from your event dashboard.</p>
                      </div>
                    </details>
                  </div>
                </section>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Card */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Contact Support</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <FiMail className="text-sky-600 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-800">Email Us</h4>
                      <p className="text-gray-600 text-sm">
                        <a href="mailto:support@eventhub.com" className="text-sky-600 hover:underline">support@eventhub.com</a>
                        <br />
                        Typically responds within 4 hours
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <FiPhone className="text-sky-600 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-800">Call Us</h4>
                      <p className="text-gray-600 text-sm">
                        <a href="tel:+18005551234" className="text-sky-600 hover:underline">1-800-555-1234</a>
                        <br />
                        Mon-Fri, 9am-6pm EST
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <FiMessageSquare className="text-sky-600 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-800">Live Chat</h4>
                      <p className="text-gray-600 text-sm">
                        Available 24/7 from your dashboard
                        <br />
                        Look for the chat icon in the bottom right
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Resources Card */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Helpful Resources</h3>
                <div className="space-y-3">
                  <a href="#" className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition">
                    <div className="bg-sky-100 p-2 rounded-lg mr-3">
                      <FiClock className="text-sky-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Getting Started Guide</h4>
                      <p className="text-gray-500 text-sm">Learn the basics in 10 minutes</p>
                    </div>
                  </a>
                  <a href="#" className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition">
                    <div className="bg-sky-100 p-2 rounded-lg mr-3">
                      <FiMessageSquare className="text-sky-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Community Forum</h4>
                      <p className="text-gray-500 text-sm">Connect with other organizers</p>
                    </div>
                  </a>
                  <a href="#" className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition">
                    <div className="bg-sky-100 p-2 rounded-lg mr-3">
                      <FiMail className="text-sky-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Webinar Schedule</h4>
                      <p className="text-gray-500 text-sm">Live training sessions</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Status Card */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-800 mb-4">System Status</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Event Creation</span>
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Operational</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Ticket Sales</span>
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Operational</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Payment Processing</span>
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Minor Issues</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Email Notifications</span>
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Operational</span>
                  </div>
                </div>
                <a href="#" className="block mt-4 text-sm text-sky-600 hover:underline text-center">View all status updates</a>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default HelpCentre;