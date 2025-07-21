// import React, { useState } from "react";
// import axios from "axios";

// const Marketing = () => {
//   const [emails, setEmails] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [generatedEmail, setGeneratedEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");
//     setError("");
//     setGeneratedEmail("");

//     try {
//       const response = await axios.post("http://localhost:5000/send-emails", {
//         emails,
//       });

//       if (response.status === 200) {
//         const emailContent = response.data.generated_email;
//         setGeneratedEmail(emailContent);
//         setMessage("✅ Emails sent successfully!");

//         // Save the email to database
//         await axios.post("http://localhost:5000/save-email", {
//           email_body: emailContent,
//           recipients: emails,
//         });
//       }
//     } catch (err) {
//       setError("❌ Failed to send or save email.");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
//       <h2 className="text-2xl font-bold mb-4 text-gray-800">
//         📨 AI-Generated Vendor Email
//       </h2>

//       <form onSubmit={handleSubmit}>
//         <label
//           htmlFor="emails"
//           className="block mb-2 font-semibold text-gray-700"
//         >
//           Vendor Email Addresses
//         </label>
//         <textarea
//           id="emails"
//           rows="3"
//           className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2"
//           placeholder="vendor1@example.com, vendor2@example.com"
//           value={emails}
//           onChange={(e) => setEmails(e.target.value)}
//         ></textarea>

//         <button
//           type="submit"
//           disabled={loading}
//           className={`mt-4 px-6 py-2 text-white font-semibold rounded-md ${
//             loading
//               ? "bg-gray-400 cursor-not-allowed"
//               : "bg-indigo-600 hover:bg-indigo-700"
//           }`}
//         >
//           {loading ? "Sending..." : "Send Emails & Generate Preview"}
//         </button>
//       </form>

//       {message && (
//         <div className="mt-4 text-green-600 font-semibold">{message}</div>
//       )}
//       {error && <div className="mt-4 text-red-600 font-semibold">{error}</div>}

//       {generatedEmail && (
//         <div className="mt-6 p-4 border rounded-lg bg-gray-50">
//           <h3 className="text-xl font-bold mb-2 text-gray-800">
//             📧 Generated Email Preview
//           </h3>
//           <pre className="whitespace-pre-wrap text-gray-700">
//             {generatedEmail}
//           </pre>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Marketing;

// import React, { useState } from "react";
// import axios from "axios";
// import {
//   FiSend,
//   FiMail,
//   FiUsers,
//   FiFileText,
//   FiCalendar,
//   FiBarChart2,
//   FiSettings,
// } from "react-icons/fi";

// const Marketing = () => {
//   const [emails, setEmails] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [generatedEmail, setGeneratedEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const [activeTab, setActiveTab] = useState("email");
//   const [campaignName, setCampaignName] = useState("");
//   const [emailSubject, setEmailSubject] = useState("");
//   const [scheduledDate, setScheduledDate] = useState("");
//   const [analyticsData, setAnalyticsData] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!emails.trim()) {
//       setError("Please enter at least one email address");
//       return;
//     }

//     setLoading(true);
//     setMessage("");
//     setError("");
//     setGeneratedEmail("");

//     try {
//       const genRes = await axios.post("http://localhost:5000/send-emails", {
//         emails: emails.split(",").map((email) => email.trim()),
//         subject: emailSubject,
//         campaignName,
//       });

//       const emailContent = genRes.data.generated_email;
//       setGeneratedEmail(emailContent);

//       await axios.post("http://localhost:5000/save-email", {
//         campaign_name: campaignName,
//         subject: emailSubject,
//         recipients: emails.split(",").map((e) => e.trim()),
//         email_body: emailContent,
//         scheduled_date: scheduledDate || null,
//       });

//       setMessage("Emails sent and saved successfully!");
//       fetchAnalytics();
//     } catch (err) {
//       console.error(err);
//       setError(`Failed: ${err.response?.data?.message || err.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const scheduleCampaign = async () => {
//     if (!scheduledDate) {
//       setError("Please select a date for scheduling");
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await axios.post("http://localhost:5000/schedule-campaign", {
//         campaign_name: campaignName,
//         subject: emailSubject,
//         recipients: emails.split(",").map((email) => email.trim()),
//         scheduled_date: scheduledDate,
//       });

//       if (res.status === 200) {
//         setMessage(
//           `Campaign scheduled for ${new Date(scheduledDate).toLocaleString()}`
//         );
//         fetchAnalytics();
//       }
//     } catch (err) {
//       console.error(err);
//       setError(
//         `Failed to schedule campaign: ${
//           err.response?.data?.message || err.message
//         }`
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchAnalytics = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/email-analytics");
//       setAnalyticsData(res.data);
//     } catch (err) {
//       console.error("Failed to fetch analytics:", err);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Marketing Campaigns</h2>

//       <div className="flex space-x-4 mb-6">
//         <button
//           onClick={() => setActiveTab("email")}
//           className={activeTab === "email" ? "font-bold" : ""}
//         >
//           <FiMail /> Email
//         </button>

//         <button onClick={() => setActiveTab("templates")}>
//           <FiFileText /> Templates
//         </button>
//         <button onClick={() => setActiveTab("schedule")}>
//           <FiCalendar /> Schedule
//         </button>
//         <button onClick={() => setActiveTab("analytics")}>
//           <FiBarChart2 /> Analytics
//         </button>
//       </div>

//       {activeTab === "email" && (
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             value={campaignName}
//             onChange={(e) => setCampaignName(e.target.value)}
//             placeholder="Campaign Name"
//             className="w-full border p-2 rounded"
//           />
//           <input
//             type="text"
//             value={emailSubject}
//             onChange={(e) => setEmailSubject(e.target.value)}
//             placeholder="Email Subject"
//             className="w-full border p-2 rounded"
//           />
//           <textarea
//             rows="3"
//             value={emails}
//             onChange={(e) => setEmails(e.target.value)}
//             placeholder="Enter email addresses, separated by commas"
//             className="w-full border p-2 rounded"
//           />
//           <button
//             type="submit"
//             disabled={loading}
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//           >
//             {loading ? "Sending..." : "Generate and Send Email"}
//           </button>
//           {generatedEmail && (
//             <div className="mt-4 p-4 border rounded bg-gray-50">
//               <h3 className="font-semibold mb-2">Generated Email:</h3>
//               <pre className="whitespace-pre-wrap">{generatedEmail}</pre>
//             </div>
//           )}
//           {message && (
//             <div className="text-green-600 font-semibold">{message}</div>
//           )}
//           {error && <div className="text-red-600 font-semibold">{error}</div>}
//         </form>
//       )}

//       {activeTab === "schedule" && (
//         <div className="space-y-4">
//           <input
//             type="datetime-local"
//             value={scheduledDate}
//             onChange={(e) => setScheduledDate(e.target.value)}
//             className="w-full border p-2 rounded"
//           />
//           <button
//             onClick={scheduleCampaign}
//             disabled={loading}
//             className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//           >
//             {loading ? "Scheduling..." : "Schedule Campaign"}
//           </button>
//         </div>
//       )}

//       {activeTab === "analytics" && analyticsData && (
//         <div className="mt-6">
//           <h3 className="text-lg font-bold mb-2">Analytics Summary</h3>
//           <p>Total Emails Sent: {analyticsData.total_sent}</p>
//           <p>Open Rate: {analyticsData.open_rate}%</p>
//           <p>Click Rate: {analyticsData.click_rate}%</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Marketing;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   FiSend,
//   FiMail,
//   FiUsers,
//   FiFileText,
//   FiCalendar,
//   FiBarChart2,
//   FiSettings,
//   FiCheckCircle,
//   FiAlertCircle,
//   FiClock,
//   FiTrendingUp,
//   FiEye,
//   FiMousePointer,
//   FiEdit3,
//   FiPlus,
//   FiDatabase,
// } from "react-icons/fi";

// const Marketing = () => {
//   const [emails, setEmails] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [generating, setGenerating] = useState(false);
//   const [generatedEmail, setGeneratedEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const [activeTab, setActiveTab] = useState("email");
//   const [campaignName, setCampaignName] = useState("");
//   const [emailSubject, setEmailSubject] = useState(
//     "Service Request for Upcoming Event"
//   );
//   const [scheduledDate, setScheduledDate] = useState("");
//   const [eventDescription, setEventDescription] = useState("");
//   const [companyDetails, setCompanyDetails] = useState({
//     name: "EventShere",
//     phone: "+94 712345678",
//     email: "info@eventshere.com",
//     website: "www.eventshere.com",
//   });
//   const [tasks, setTasks] = useState([]);

//   // Generate email content
//   const generateEmail = async () => {
//     if (!emails.trim()) {
//       setError("Please enter at least one email address");
//       return;
//     }
//     if (!eventDescription.trim()) {
//       setError("Please enter an event description");
//       return;
//     }

//     setGenerating(true);
//     setError("");
//     setGeneratedEmail("");

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/generate-email",
//         {
//           event_description: eventDescription,
//           company_name: companyDetails.name,
//           company_phone: companyDetails.phone,
//           company_email: companyDetails.email,
//           company_website: companyDetails.website,
//         }
//       );

//       setGeneratedEmail(response.data.email_body);
//       setMessage("Email generated successfully!");

//       // Generate tasks based on event description
//       const tasksResponse = await axios.post(
//         "http://localhost:5000/infer-tasks",
//         {
//           description: eventDescription,
//         }
//       );
//       setTasks(tasksResponse.data.tasks);
//     } catch (err) {
//       console.error(err);
//       setError(
//         `Failed to generate email: ${
//           err.response?.data?.message || err.message
//         }`
//       );
//     } finally {
//       setGenerating(false);
//     }
//   };

//   // Send emails
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!generatedEmail) {
//       setError("Please generate an email first");
//       return;
//     }

//     setLoading(true);
//     setMessage("");
//     setError("");

//     try {
//       const response = await axios.post("http://localhost:5000/send-emails", {
//         emails: emails.split(",").map((email) => email.trim()),
//         subject: emailSubject,
//         campaignName,
//         email_body: generatedEmail,
//       });

//       setMessage(response.data.message);
//     } catch (err) {
//       console.error(err);
//       setError(
//         `Failed to send emails: ${err.response?.data?.message || err.message}`
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-6">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-8">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-800">
//             Vendor Outreach Center
//           </h1>
//           <p className="text-gray-600">
//             Streamline your vendor communications for events
//           </p>
//         </div>
//       </div>

//       {/* Navigation Tabs */}
//       <div className="flex border-b border-gray-200 mb-8">
//         <button
//           onClick={() => setActiveTab("email")}
//           className={`px-6 py-3 font-medium text-sm flex items-center border-b-2 transition-colors ${
//             activeTab === "email"
//               ? "border-blue-600 text-blue-600"
//               : "border-transparent text-gray-500 hover:text-gray-700"
//           }`}
//         >
//           <FiMail className="mr-2" /> Vendor Outreach
//         </button>
//         <button
//           onClick={() => setActiveTab("tasks")}
//           className={`px-6 py-3 font-medium text-sm flex items-center border-b-2 transition-colors ${
//             activeTab === "tasks"
//               ? "border-blue-600 text-blue-600"
//               : "border-transparent text-gray-500 hover:text-gray-700"
//           }`}
//         >
//           <FiDatabase className="mr-2" /> Event Tasks
//         </button>
//       </div>

//       {/* Main Content */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//         {activeTab === "email" && (
//           <div className="p-6">
//             <h2 className="text-xl font-semibold mb-6 text-gray-800">
//               Create Vendor Outreach
//             </h2>

//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Campaign Name
//                   </label>
//                   <input
//                     type="text"
//                     value={campaignName}
//                     onChange={(e) => setCampaignName(e.target.value)}
//                     placeholder="e.g. Book Exhibition Vendor Outreach"
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Email Subject
//                   </label>
//                   <input
//                     type="text"
//                     value={emailSubject}
//                     onChange={(e) => setEmailSubject(e.target.value)}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Event Description
//                 </label>
//                 <textarea
//                   rows="4"
//                   value={eventDescription}
//                   onChange={(e) => setEventDescription(e.target.value)}
//                   placeholder="Describe your event to generate appropriate vendor requests..."
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Vendor Emails
//                 </label>
//                 <textarea
//                   rows="3"
//                   value={emails}
//                   onChange={(e) => setEmails(e.target.value)}
//                   placeholder="Enter vendor emails separated by commas"
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />
//                 <p className="mt-1 text-sm text-gray-500">
//                   Separate multiple emails with commas
//                 </p>
//               </div>

//               <div className="flex flex-wrap gap-4">
//                 <button
//                   type="button"
//                   onClick={generateEmail}
//                   disabled={generating}
//                   className={`flex items-center px-6 py-3 rounded-lg font-medium ${
//                     generating
//                       ? "bg-gray-400"
//                       : "bg-blue-600 hover:bg-blue-700 text-white"
//                   } transition-colors`}
//                 >
//                   <FiEdit3 className="mr-2" />
//                   {generating ? "Generating..." : "Generate Email"}
//                 </button>

//                 <button
//                   type="submit"
//                   disabled={loading || !generatedEmail}
//                   className={`flex items-center px-6 py-3 rounded-lg font-medium ${
//                     loading || !generatedEmail
//                       ? "bg-gray-400"
//                       : "bg-green-600 hover:bg-green-700 text-white"
//                   } transition-colors`}
//                 >
//                   <FiSend className="mr-2" />
//                   {loading ? "Sending..." : "Send to Vendors"}
//                 </button>
//               </div>

//               {generatedEmail && (
//                 <div className="mt-8 border-t pt-6">
//                   <h3 className="text-lg font-semibold mb-4 text-gray-800">
//                     Generated Email Preview
//                   </h3>
//                   <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
//                     <div className="mb-4 pb-4 border-b border-gray-200">
//                       <p className="font-medium">
//                         Subject: {emailSubject || "(No subject)"}
//                       </p>
//                       <p className="text-sm text-gray-500">
//                         To: {emails.split(",")[0].trim()}{" "}
//                         {emails.split(",").length > 1
//                           ? `and ${emails.split(",").length - 1} more`
//                           : ""}
//                       </p>
//                     </div>
//                     <pre className="whitespace-pre-wrap font-sans text-gray-700">
//                       {generatedEmail}
//                     </pre>
//                   </div>
//                 </div>
//               )}

//               {message && (
//                 <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-lg flex items-start">
//                   <FiCheckCircle className="mr-2 mt-0.5 flex-shrink-0" />
//                   <div>{message}</div>
//                 </div>
//               )}

//               {error && (
//                 <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg flex items-start">
//                   <FiAlertCircle className="mr-2 mt-0.5 flex-shrink-0" />
//                   <div>{error}</div>
//                 </div>
//               )}
//             </form>
//           </div>
//         )}

//         {activeTab === "tasks" && (
//           <div className="p-6">
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-xl font-semibold text-gray-800">
//                 Event Tasks
//               </h2>
//               <button
//                 className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//                 onClick={() => {
//                   if (eventDescription) {
//                     generateEmail();
//                   } else {
//                     setError("Please enter an event description first");
//                   }
//                 }}
//               >
//                 <FiPlus className="mr-2" />
//                 Generate Tasks
//               </button>
//             </div>

//             {tasks.length > 0 ? (
//               <div className="space-y-4">
//                 <h3 className="text-lg font-medium text-gray-700">
//                   Tasks for: "{eventDescription.substring(0, 50)}..."
//                 </h3>
//                 <ul className="space-y-3">
//                   {tasks.map((task, index) => (
//                     <li key={index} className="flex items-start">
//                       <span className="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full mr-3 mt-0.5 flex-shrink-0">
//                         {index + 1}
//                       </span>
//                       <span className="text-gray-700">{task}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ) : (
//               <div className="text-center py-12">
//                 <div className="inline-block p-4 bg-gray-100 rounded-full mb-4">
//                   <FiDatabase className="text-gray-400 text-3xl" />
//                 </div>
//                 <p className="text-gray-500">
//                   {eventDescription
//                     ? "Generate tasks based on your event description"
//                     : "Enter an event description to generate tasks"}
//                 </p>
//               </div>
//             )}

//             {error && (
//               <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg flex items-start">
//                 <FiAlertCircle className="mr-2 mt-0.5 flex-shrink-0" />
//                 <div>{error}</div>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Marketing;

import React, { useState } from "react";
import axios from "axios";
import {
  FiSend,
  FiMail,
  FiDatabase,
  FiCheckCircle,
  FiAlertCircle,
  FiEdit3,
  FiPlus,
  FiTrendingUp,
} from "react-icons/fi";

const Marketing = () => {
  const [emails, setEmails] = useState("");
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generatedEmail, setGeneratedEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("email");
  const [campaignName, setCampaignName] = useState("");
  const [emailSubject, setEmailSubject] = useState(
    "Service Request for Upcoming Event"
  );
  const [eventDescription, setEventDescription] = useState("");
  const [companyDetails] = useState({
    name: "EventShere",
    phone: "+94 712345678",
    email: "info@eventshere.com",
    website: "www.eventshere.com",
  });
  const [tasks, setTasks] = useState([]);
  const [socialForm, setSocialForm] = useState({
    title: "",
    description: "",
    organizer: "",
    phone: "",
    event_time: "",
    date: "",
    location: "",
  });
  const [caption, setCaption] = useState("");
  const [postResults, setPostResults] = useState(null);

  const generateEmail = async () => {
    if (!emails.trim() || !eventDescription.trim()) {
      setError("Please enter emails and event description");
      return;
    }

    setGenerating(true);
    setError("");
    setGeneratedEmail("");

    try {
      const response = await axios.post(
        "http://localhost:5000/generate-email",
        {
          event_description: eventDescription,
          company_name: companyDetails.name,
          company_phone: companyDetails.phone,
          company_email: companyDetails.email,
          company_website: companyDetails.website,
        }
      );

      setGeneratedEmail(response.data.email_body);
      setMessage("Email generated successfully!");

      const tasksResponse = await axios.post(
        "http://localhost:5000/infer-tasks",
        {
          description: eventDescription,
        }
      );
      setTasks(tasksResponse.data.tasks);
    } catch (err) {
      setError(
        `Failed to generate email: ${
          err.response?.data?.message || err.message
        }`
      );
    } finally {
      setGenerating(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!generatedEmail) {
      setError("Please generate an email first");
      return;
    }

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/send-emails", {
        emails: emails.split(",").map((email) => email.trim()),
        subject: emailSubject,
        campaignName,
        email_body: generatedEmail,
      });

      setMessage(response.data.message);
    } catch (err) {
      setError(
        `Failed to send emails: ${err.response?.data?.message || err.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  const generateCaption = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/generate-caption",
        socialForm
      );
      setCaption(res.data.caption);
      setMessage(`Caption generated in ${res.data.generation_time}`);
      setError("");
    } catch (err) {
      setError(
        `Caption generation failed: ${err.response?.data?.error || err.message}`
      );
      setMessage("");
    }
  };

  const postCaption = async () => {
    try {
      const res = await axios.post("http://localhost:5000/post-social-media", {
        caption,
        platforms: ["instagram", "facebook", "whatsapp"],
      });
      setPostResults(res.data.results);
      setMessage(res.data.message);
      setError("");
    } catch (err) {
      setError(`Posting failed: ${err.response?.data?.error || err.message}`);
      setMessage("");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Vendor Outreach Center
        </h1>
        <p className="text-gray-600">
          Streamline your vendor communications for events
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-8">
        {[
          {
            id: "email",
            label: "Vendor Outreach",
            icon: <FiMail className="mr-2" />,
          },
          {
            id: "tasks",
            label: "Event Tasks",
            icon: <FiDatabase className="mr-2" />,
          },
          {
            id: "social",
            label: "Social Caption",
            icon: <FiTrendingUp className="mr-2" />,
          },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 font-medium text-sm flex items-center border-b-2 transition-colors ${
              activeTab === tab.id
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {activeTab === "email" && (
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">
              Create Vendor Outreach
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Campaign Name
                  </label>
                  <input
                    type="text"
                    value={campaignName}
                    onChange={(e) => setCampaignName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Email Subject
                  </label>
                  <input
                    type="text"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Description
                </label>
                <textarea
                  rows="4"
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vendor Emails
                </label>
                <textarea
                  rows="3"
                  value={emails}
                  onChange={(e) => setEmails(e.target.value)}
                  placeholder="email1@example.com, email2@example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={generateEmail}
                  disabled={generating}
                  className={`flex items-center px-6 py-3 rounded-lg font-medium ${
                    generating
                      ? "bg-gray-400"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  <FiEdit3 className="mr-2" />
                  {generating ? "Generating..." : "Generate Email"}
                </button>

                <button
                  type="submit"
                  disabled={loading || !generatedEmail}
                  className={`flex items-center px-6 py-3 rounded-lg font-medium ${
                    loading || !generatedEmail
                      ? "bg-gray-400"
                      : "bg-green-600 hover:bg-green-700 text-white"
                  }`}
                >
                  <FiSend className="mr-2" />
                  {loading ? "Sending..." : "Send to Vendors"}
                </button>
              </div>

              {generatedEmail && (
                <div className="mt-8 bg-gray-100 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Generated Email Preview
                  </h3>
                  <p className="font-medium">Subject: {emailSubject}</p>
                  <p className="text-sm text-gray-600 mb-4">
                    To: {emails.split(",")[0].trim()}
                    {emails.split(",").length > 1
                      ? ` and ${emails.split(",").length - 1} more`
                      : ""}
                  </p>
                  <pre className="text-gray-800 whitespace-pre-wrap">
                    {generatedEmail}
                  </pre>
                </div>
              )}

              {message && (
                <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-lg flex items-start">
                  <FiCheckCircle className="mr-2 mt-0.5" />
                  <div>{message}</div>
                </div>
              )}
              {error && (
                <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg flex items-start">
                  <FiAlertCircle className="mr-2 mt-0.5" />
                  <div>{error}</div>
                </div>
              )}
            </form>
          </div>
        )}

        {/* {activeTab === "tasks" && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Event Tasks
              </h2>
              <button
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={() =>
                  eventDescription
                    ? generateEmail()
                    : setError("Please enter an event description first")
                }
              >
                <FiPlus className="mr-2" />
                Generate Tasks
              </button>
            </div>

            {tasks.length > 0 ? (
              <ul className="space-y-3">
                {tasks.map((task, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{task}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500">
                {eventDescription
                  ? "Click 'Generate Tasks' to infer from event description"
                  : "Enter an event description to begin"}
              </p>
            )}

            {error && (
              <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg flex items-start">
                <FiAlertCircle className="mr-2 mt-0.5" />
                <div>{error}</div>
              </div>
            )}
          </div>
        )} */}

        {activeTab === "social" && (
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">
              Generate Social Media Caption
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {Object.entries(socialForm).map(([key, value]) => (
                <div key={key}>
                  <label className="text-sm font-medium text-gray-700 capitalize block mb-1">
                    {key.replace("_", " ")}
                  </label>
                  <input
                    type="text"
                    value={value}
                    onChange={(e) =>
                      setSocialForm({ ...socialForm, [key]: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              ))}
            </div>

            <div className="flex gap-4 mb-4">
              <button
                onClick={generateCaption}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Generate Caption
              </button>
              <button
                onClick={postCaption}
                disabled={!caption}
                className={`px-6 py-3 rounded-lg ${
                  caption
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-gray-300 text-gray-700 cursor-not-allowed"
                }`}
              >
                Post to Social Media
              </button>
            </div>

            {caption && (
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <h3 className="font-medium mb-2">Generated Caption:</h3>
                <p className="text-gray-800">{caption}</p>
              </div>
            )}

            {postResults && (
              <div className="bg-blue-50 p-4 rounded-lg mb-4 text-blue-700">
                <h4 className="font-medium mb-2">Post Results:</h4>
                <ul>
                  {Object.entries(postResults).map(([platform, result]) => (
                    <li key={platform}>
                      <strong>{platform}:</strong> {result}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {message && (
              <div className="p-4 bg-green-50 text-green-700 rounded-lg flex items-start">
                <FiCheckCircle className="mr-2 mt-0.5" />
                <div>{message}</div>
              </div>
            )}
            {error && (
              <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg flex items-start">
                <FiAlertCircle className="mr-2 mt-0.5" />
                <div>{error}</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketing;
