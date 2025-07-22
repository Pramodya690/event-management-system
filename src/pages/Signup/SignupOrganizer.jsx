// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const SignUpOrganizer = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [address, setAddress] = useState('');
//   const navigate = useNavigate();

//   const categories = [
//     { id: 'comedy', name: 'Comedy', icon: '🎭' },
//     { id: 'food-drink', name: 'Food & Drink', icon: '🍽️' },
//     { id: 'music', name: 'Music', icon: '🎵' },
//     { id: 'community', name: 'Community & Culture', icon: '🌍' },
//     { id: 'hobbies', name: 'Hobbies & Special Interest', icon: '🎯' },
//     { id: 'arts', name: 'Performing & Visual Arts', icon: '🎨' },
//     { id: 'parties', name: 'Parties', icon: '🎉' },
//     { id: 'business', name: 'Business & Networking', icon: '💼' },
//     { id: 'sports', name: 'Sports & Fitness', icon: '⚽' },
//     { id: 'education', name: 'Education', icon: '📚' },
//   ];

//   const toggleCategory = (categoryId) => {
//     setSelectedCategories(prev =>
//       prev.includes(categoryId)
//         ? prev.filter(id => id !== categoryId)
//         : [...prev, categoryId]
//     );
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (username && password && selectedCategories.length > 0 && email && phone && address) {
//       navigate('/organizer-profile', {
//         state: { username, password, categories: selectedCategories, email, phone, address }
//       });
//     } else {
//       alert('Please fill all required fields.');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col px-4 py-8">
//       <div className="max-w-3xl mx-auto w-full">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-800 mb-2">Organizer Registration</h1>
//           <p className="text-gray-600">Create your professional organizer account</p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="grid md:grid-cols-2 gap-6">
//             {/* Username */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Username <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="Choose a username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 required
//               />
//             </div>

//             {/* Password */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Password <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="password"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="Create a password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>
//           </div>

//           <div className="grid md:grid-cols-2 gap-6">
//             {/* Email */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Email <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="email"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="your@email.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>

//             {/* Phone */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Phone Number <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="tel"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="+1 (123) 456-7890"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//                 required
//               />
//             </div>
//           </div>

//           {/* Address */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Address <span className="text-red-500">*</span>
//             </label>
//             <textarea
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//               placeholder="Your full address"
//               rows="3"
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//               required
//             />
//           </div>

//           {/* Categories */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-3">
//               Event Categories <span className="text-red-500">*</span>
//               <span className="block text-xs text-gray-500 mt-1">Select all that apply</span>
//             </label>
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
//               {categories.map((category) => (
//                 <button
//                   key={category.id}
//                   type="button"
//                   onClick={() => toggleCategory(category.id)}
//                   className={`flex flex-col items-center p-4 border rounded-lg transition-all ${
//                     selectedCategories.includes(category.id)
//                       ? 'border-blue-500 bg-blue-50 text-blue-700'
//                       : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
//                   }`}
//                 >
//                   <span className="text-2xl mb-1">{category.icon}</span>
//                   <span className="text-sm font-medium">{category.name}</span>
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Submit Button */}
//           <div className="pt-4">
//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//             >
//               Create Organizer Account
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignUpOrganizer;

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUpOrganizer = () => {
  const [form, setForm] = useState({
    name: "",
    username: "",
    password: "",
    email: "",
    phone: "",
    address: "",
    organization: "",
    position: "",
    bio: "",
    profileImage: "",
    eventsCreated: "",
    revenueGenerated: "",
    ticketsSold: "",
    stallCount: "",
    seatCount: "",
    memberSince: "",
    rating: "",
    twitter: "",
    linkedin: "",
  });

  const [selectedCategories, setSelectedCategories] = useState([]);
  const navigate = useNavigate();

  // const categories = [
  //   { id: "comedy", name: "Comedy", icon: "🎭" },
  //   { id: "food-drink", name: "Food & Drink", icon: "🍽️" },
  //   { id: "music", name: "Music", icon: "🎵" },
  //   { id: "community", name: "Community & Culture", icon: "🌍" },
  //   { id: "hobbies", name: "Hobbies & Special Interest", icon: "🎯" },
  //   { id: "arts", name: "Performing & Visual Arts", icon: "🎨" },
  //   { id: "parties", name: "Parties", icon: "🎉" },
  //   { id: "business", name: "Business & Networking", icon: "💼" },
  //   { id: "sports", name: "Sports & Fitness", icon: "⚽" },
  //   { id: "education", name: "Education", icon: "📚" },
  // ];

  const categories = [
    {
      id: "comedy",
      name: "Comedy",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      ),
    },
    {
      id: "food-drink",
      name: "Food & Drink",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 13H5v6a2 2 0 002 2h10a2 2 0 002-2v-6m-6-9v6m4 0v-3m-4 3v3"
          ></path>
        </svg>
      ),
    },
    {
      id: "music",
      name: "Music",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z"
          ></path>
        </svg>
      ),
    },
    {
      id: "community",
      name: "Community & Culture",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
          ></path>
        </svg>
      ),
    },
    {
      id: "hobbies",
      name: "Hobbies & Special Interest",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M11 4a4 4 0 010 8H8a4 4 0 01-4-4 4 4 0 014-4h3zm2 8h3a4 4 0 014 4 4 4 0 01-4 4h-3a4 4 0 01-4-4v-3"
          ></path>
        </svg>
      ),
    },
    {
      id: "arts",
      name: "Performing & Visual Arts",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2zm0 0c1.11 0 2-.895 2-2s-.89-2-2-2-2 .895-2 2 .89 2 2 2zm0 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2z"
          ></path>
        </svg>
      ),
    },
    {
      id: "parties",
      name: "Parties",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2m-2-10v10m-2-10v10m-2-10v10m-2-10v10"
          ></path>
        </svg>
      ),
    },
    {
      id: "business",
      name: "Business & Networking",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          ></path>
        </svg>
      ),
    },
    {
      id: "sports",
      name: "Sports & Fitness",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 6h18M3 12h18m-7 6h7"
          ></path>
        </svg>
      ),
    },
    {
      id: "education",
      name: "Education",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 14l9-5-9-5-9 5 9 5z"
          ></path>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
          ></path>
        </svg>
      ),
    },
  ];

  const toggleCategory = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requiredFields = [
      "name",
      "username",
      "password",
      "email",
      "phone",
      "address",
    ];
    const allRequiredFilled = requiredFields.every(
      (field) => form[field].trim() !== ""
    );

    if (allRequiredFilled && selectedCategories.length > 0) {
      navigate("/organizer-profile", {
        state: { ...form, categories: selectedCategories },
      });
    } else {
      alert(
        "Please fill all required fields and select at least one category."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8 md:p-10">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
            Organizer Registration
          </h1>
          <p className="mt-2 text-lg text-gray-500">
            Create your professional organizer account to start hosting events
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                "name",
                "username",
                "password",
                "email",
                "phone",
                "address",
              ].map((field) => (
                <div key={field} className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                    {field.replace(/([A-Z])/g, " $1")}{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type={
                      field === "password"
                        ? "password"
                        : field === "email"
                        ? "email"
                        : "text"
                    }
                    name={field}
                    value={form[field]}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder={`Enter ${field}`}
                    required
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Professional Information Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Professional Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {["organization", "position", "profileImage"].map((field) => (
                <div key={field} className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                    {field.replace(/([A-Z])/g, " $1")}
                  </label>
                  <input
                    type="text"
                    name={field}
                    value={form[field]}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder={`Enter ${field}`}
                  />
                </div>
              ))}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio
              </label>
              <textarea
                name="bio"
                rows="4"
                value={form.bio}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="Tell us about yourself and your experience as an organizer..."
              />
            </div>
          </div>

          {/* Event Metrics Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Event Metrics
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {["eventsCreated", "revenueGenerated", "ticketsSold"].map(
                (field) => (
                  <div key={field} className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                      {field.replace(/([A-Z])/g, " $1")}
                    </label>
                    <input
                      type={field === "rating" ? "number" : "text"}
                      name={field}
                      value={form[field]}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder={`Enter ${field.replace(/([A-Z])/g, " $1")}`}
                    />
                  </div>
                )
              )}
            </div>
          </div>

          {/* Social Media Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Social Media
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Twitter
                </label>
                <input
                  name="twitter"
                  value={form.twitter}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="@username"
                />
              </div>
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  LinkedIn
                </label>
                <input
                  name="linkedin"
                  value={form.linkedin}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="LinkedIn profile URL"
                />
              </div>
            </div>
          </div>

          {/* Categories Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Event Categories <span className="text-red-500">*</span>
            </h2>
            <p className="text-sm text-gray-500">
              Select the types of events you plan to organize
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => toggleCategory(category.id)}
                  className={`flex flex-col items-center p-4 border rounded-lg shadow-sm transition-all duration-200 ${
                    selectedCategories.includes(category.id)
                      ? "border-sky-500 bg-sky-50 text-sky-700"
                      : "border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                  }`}
                >
                  <span className="text-3xl mb-2">{category.icon}</span>
                  <span className="text-sm font-medium text-center">
                    {category.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              className="w-full bg-sky-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-sky-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-semibold text-lg"
            >
              Create Organizer Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpOrganizer;
