// import React from "react";
// import Navigation from "../components/Navigation";
// import Footer from "../components/Footer";
// import { FiShield, FiMail, FiHome, FiClock } from "react-icons/fi";

// const PrivacyPolicy = () => {
//   const currentDate = new Date();
//   const formattedDate = currentDate.toLocaleDateString("en-US", {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       <Navigation />

//       <main className="flex-grow">
//         {/* Hero Section */}
//         <div className="bg-sky-200 text-white py-20">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//             <div className="inline-flex items-center justify-center bg-blue-100 bg-opacity-10 rounded-full p-4 mb-6">
//               <FiShield className="h-8 w-8 text-blue-400" />
//             </div>
//             <h1 className="text-4xl md:text-5xl font-bold mb-4">
//               Privacy Policy
//             </h1>
//             <div className="flex items-center justify-center gap-4 text-gray-300">
//               <FiClock className="h-5 w-5" />
//               <p>Last Updated: {formattedDate}</p>
//             </div>
//           </div>
//         </div>

//         {/* Policy Content */}
//         <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//           <div className="bg-white shadow-lg rounded-xl overflow-hidden">
//             {/* Table of Contents */}
//             <div className="bg-gray-50 p-6 border-b">
//               <h2 className="text-xl font-semibold text-gray-800 mb-4">
//                 Table of Contents
//               </h2>
//               <ol className="list-decimal list-inside space-y-2 text-blue-600">
//                 {[
//                   "Introduction",
//                   "Information We Collect",
//                   "How We Use Your Information",
//                   "Legal Basis for Processing",
//                   "Data Sharing and Disclosure",
//                   "International Data Transfers",
//                   "Data Security",
//                   "Data Retention",
//                   "Your Rights",
//                   "Children's Privacy",
//                   "Cookies and Tracking Technologies",
//                   "Third-Party Links",
//                   "Changes to This Policy",
//                   "Contact Us",
//                 ].map((item, index) => (
//                   <li key={index} className="hover:text-blue-800">
//                     <a
//                       href={`#section-${index + 1}`}
//                       className="hover:underline"
//                     >
//                       {item}
//                     </a>
//                   </li>
//                 ))}
//               </ol>
//             </div>

//             {/* Policy Sections */}
//             <div className="p-6 sm:p-8 lg:p-10">
//               <section id="section-1" className="mb-12 scroll-mt-20">
//                 <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
//                   <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center mr-3">
//                     1
//                   </span>
//                   Introduction
//                 </h2>
//                 <div className="prose prose-blue max-w-none">
//                   <p>
//                     Eventsphere ("we," "us," or "our") operates the Eventsphere
//                     event management platform (the "Service"). This Privacy
//                     Policy informs you of our policies regarding the collection,
//                     use, and disclosure of personal data when you use our
//                     Service and the choices you have associated with that data.
//                   </p>
//                   <p>
//                     We are committed to protecting your privacy and ensuring the
//                     security of your personal information in compliance with
//                     applicable data protection laws, including the General Data
//                     Protection Regulation (GDPR) and the California Consumer
//                     Privacy Act (CCPA).
//                   </p>
//                 </div>
//               </section>

//               <section id="section-2" className="mb-12 scroll-mt-20">
//                 <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
//                   <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center mr-3">
//                     2
//                   </span>
//                   Information We Collect
//                 </h2>
//                 <div className="prose prose-blue max-w-none">
//                   <p>
//                     We collect several types of information to provide and
//                     improve our Service:
//                   </p>

//                   <h3 className="font-semibold mt-4">Personal Information</h3>
//                   <ul>
//                     <li>Contact details (name, email, phone number)</li>
//                     <li>Account credentials</li>
//                     <li>Payment and billing information</li>
//                     <li>Demographic information (age, gender when required)</li>
//                   </ul>

//                   <h3 className="font-semibold mt-4">Event Information</h3>
//                   <ul>
//                     <li>Event registration and attendance records</li>
//                     <li>Preferences and interests</li>
//                     <li>Feedback and survey responses</li>
//                   </ul>

//                   <h3 className="font-semibold mt-4">Technical Data</h3>
//                   <ul>
//                     <li>IP addresses and device identifiers</li>
//                     <li>Browser type and version</li>
//                     <li>Usage data and analytics</li>
//                     <li>Cookies and similar tracking technologies</li>
//                   </ul>
//                 </div>
//               </section>

//               {/* Additional sections follow the same pattern */}
//               <section id="section-3" className="mb-12 scroll-mt-20">
//                 <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
//                   <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center mr-3">
//                     3
//                   </span>
//                   How We Use Your Information
//                 </h2>
//                 <div className="prose prose-blue max-w-none">
//                   <table className="min-w-full divide-y divide-gray-200">
//                     <thead className="bg-gray-50">
//                       <tr>
//                         <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Purpose
//                         </th>
//                         <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Legal Basis
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                       <tr>
//                         <td className="px-4 py-3 whitespace-normal">
//                           To provide and maintain our Service
//                         </td>
//                         <td className="px-4 py-3 whitespace-normal">
//                           Performance of contract
//                         </td>
//                       </tr>
//                       <tr>
//                         <td className="px-4 py-3 whitespace-normal">
//                           To process transactions
//                         </td>
//                         <td className="px-4 py-3 whitespace-normal">
//                           Performance of contract
//                         </td>
//                       </tr>
//                       <tr>
//                         <td className="px-4 py-3 whitespace-normal">
//                           To send service communications
//                         </td>
//                         <td className="px-4 py-3 whitespace-normal">
//                           Legitimate interest
//                         </td>
//                       </tr>
//                       <tr>
//                         <td className="px-4 py-3 whitespace-normal">
//                           To improve our Service
//                         </td>
//                         <td className="px-4 py-3 whitespace-normal">
//                           Legitimate interest
//                         </td>
//                       </tr>
//                       <tr>
//                         <td className="px-4 py-3 whitespace-normal">
//                           To comply with legal obligations
//                         </td>
//                         <td className="px-4 py-3 whitespace-normal">
//                           Legal obligation
//                         </td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>
//               </section>

//               {/* Additional professional sections would include:
//                  - Legal Basis for Processing (GDPR compliance)
//                  - International Data Transfers (SCCs, Privacy Shield)
//                  - Detailed Data Retention Policy
//                  - Children's Privacy (COPPA compliance)
//                  - Cookie Policy with opt-out instructions
//               */}

//               <section id="section-13" className="mb-12 scroll-mt-20">
//                 <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
//                   <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center mr-3">
//                     13
//                   </span>
//                   Changes to This Policy
//                 </h2>
//                 <div className="prose prose-blue max-w-none">
//                   <p>
//                     We may update our Privacy Policy from time to time. We will
//                     notify you of any changes by posting the new Privacy Policy
//                     on this page and updating the "Last Updated" date at the top
//                     of this Policy.
//                   </p>
//                   <p>
//                     We will let you know via email and/or a prominent notice on
//                     our Service prior to the change becoming effective and
//                     update the "effective date" at the top of this Privacy
//                     Policy.
//                   </p>
//                   <p>
//                     You are advised to review this Privacy Policy periodically
//                     for any changes. Changes to this Privacy Policy are
//                     effective when they are posted on this page.
//                   </p>
//                 </div>
//               </section>

//               <section id="section-14" className="scroll-mt-20">
//                 <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
//                   <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center mr-3">
//                     14
//                   </span>
//                   Contact Us
//                 </h2>
//                 <div className="prose prose-blue max-w-none">
//                   <p>
//                     If you have any questions about this Privacy Policy, please
//                     contact our Data Protection Officer:
//                   </p>
//                   <div className="mt-6 grid gap-4 sm:grid-cols-2">
//                     <div className="flex items-start">
//                       <div className="flex-shrink-0 mt-1 text-blue-600">
//                         <FiMail className="h-5 w-5" />
//                       </div>
//                       <div className="ml-3">
//                         <h3 className="text-sm font-medium text-gray-900">
//                           Email
//                         </h3>
//                         <p className="text-sm text-gray-600">
//                           privacy@eventsphere.com
//                         </p>
//                       </div>
//                     </div>
//                     <div className="flex items-start">
//                       <div className="flex-shrink-0 mt-1 text-blue-600">
//                         <FiHome className="h-5 w-5" />
//                       </div>
//                       <div className="ml-3">
//                         <h3 className="text-sm font-medium text-gray-900">
//                           Postal Address
//                         </h3>
//                         <p className="text-sm text-gray-600">
//                           Eventsphere Inc.
//                           <br />
//                           Attn: Data Protection Officer
//                           <br />
//                           123 Tech Park, Bangalore
//                           <br />
//                           Karnataka 560001, India
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                   <p className="mt-6">
//                     For EU residents, you may also contact our EU
//                     representative:
//                   </p>
//                   <div className="mt-4 flex items-start">
//                     <div className="flex-shrink-0 mt-1 text-blue-600">
//                       <FiHome className="h-5 w-5" />
//                     </div>
//                     <div className="ml-3">
//                       <p className="text-sm text-gray-600">
//                         Eventsphere EU Representative
//                         <br />
//                         c/o Privacy Agent Ltd.
//                         <br />
//                         44 Main Street, Dublin 2<br />
//                         Ireland
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </section>
//             </div>
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default PrivacyPolicy;

import React from "react";
import Navigation from "../components/Navigation.jsx";
import Footer from "../components/Footer.jsx";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-sky-50 flex flex-col">
      {/* Navigation Bar */}
      <Navigation />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Privacy Policy
        </h1>
        <p className="text-gray-600 mb-8">Last updated: July 22, 2025</p>

        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              1. Introduction
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Welcome to Eventify ("we", "our", or "us"). We are committed to
              protecting your privacy. This Privacy Policy explains how we
              collect, use, disclose, and safeguard your information when you
              use our platform to organize or attend events. Please read this
              policy carefully.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              2. Information We Collect
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We may collect the following types of information:
            </p>
            <ul className="list-disc pl-6 mt-2 text-gray-600">
              <li>
                Personal Information: Name, email, phone number, address, and
                payment details.
              </li>
              <li>
                Event Data: Information about events you create or attend,
                including preferences and feedback.
              </li>
              <li>
                Usage Data: IP address, browser type, device information, and
                interaction with our platform.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              3. How We Use Your Information
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We use your information to:
            </p>
            <ul className="list-disc pl-6 mt-2 text-gray-600">
              <li>
                Provide and improve our services, such as event creation and
                ticket purchasing.
              </li>
              <li>
                Communicate with you, including sending updates and promotional
                materials.
              </li>
              <li>Analyze usage trends to enhance user experience.</li>
              <li>Comply with legal obligations.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              4. Sharing Your Information
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We may share your information with:
            </p>
            <ul className="list-disc pl-6 mt-2 text-gray-600">
              <li>
                Service providers who assist with payment processing, analytics,
                or marketing.
              </li>
              <li>Event organizers when you purchase tickets.</li>
              <li>Legal authorities when required by law.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              5. Data Security
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We implement industry-standard security measures to protect your
              data. However, no method of transmission over the internet is 100%
              secure, and we cannot guarantee absolute security.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              6. Your Rights
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Depending on your location, you may have the right to:
            </p>
            <ul className="list-disc pl-6 mt-2 text-gray-600">
              <li>Access, correct, or delete your personal information.</li>
              <li>Opt out of marketing communications.</li>
              <li>Request data portability.</li>
            </ul>
            <p className="text-gray-600 mt-2">
              To exercise these rights, contact us at{" "}
              <a
                href="mailto:privacy@eventify.com"
                className="text-sky-600 hover:underline"
              >
                privacy@eventify.com
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              7. Changes to This Policy
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We may update this Privacy Policy from time to time. We will
              notify you of significant changes via email or through our
              platform. Please review this policy periodically.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              8. Contact Us
            </h2>
            <p className="text-gray-600 leading-relaxed">
              If you have questions about this Privacy Policy, contact us at:
            </p>
            <p className="text-gray-600 mt-2">
              Email:{" "}
              <a
                href="mailto:privacy@eventify.com"
                className="text-sky-600 hover:underline"
              >
                privacy@eventify.com
              </a>
            </p>
            <p className="text-gray-600">
              Address: Eventify Inc., 123 Sky Lane, Suite 100, San Francisco, CA
              94105
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
