// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Footer from "../../components/Footer.jsx";
// import Navigation from "../../components/Navigation.jsx";
// import { FiUser, FiMapPin, FiMail, FiPhone, FiBriefcase } from "react-icons/fi";

// const SignupVendor = () => {
//   const [vendorData, setVendorData] = useState({
//     name: "",
//     category: "",
//     email: "",
//     phone: "",
//     address: "",
//     cities: [],
//   });

//   const [submitting, setSubmitting] = useState(false);
//   const navigate = useNavigate();

//   const availableCities = [
//     "Colombo",
//     "Kandy",
//     "Galle",
//     "Jaffna",
//     "Negombo",
//     "Trincomalee",
//     "Batticaloa",
//     "Anuradhapura",
//     "Polonnaruwa",
//     "Matara",
//     "Ratnapura",
//     "Badulla",
//     "Kurunegala",
//     "Kalutara",
//     "Matale",
//     "Hambantota",
//     "Ampara",
//     "Nuwara Eliya",
//     "Puttalam",
//     "Mannar",
//   ];

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setVendorData({ ...vendorData, [name]: value });
//   };

//   const handleCityToggle = (city) => {
//     setVendorData((prev) => ({
//       ...prev,
//       cities: prev.cities.includes(city)
//         ? prev.cities.filter((c) => c !== city)
//         : [...prev.cities, city],
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);

//     try {
//       // In a real app, you would make an API call here
//       const newVendorId = "mock-vendor-id-123";

//       navigate(`/vendor-profile/${newVendorId}`, {
//         state: {
//           vendor: {
//             ...vendorData,
//             id: newVendorId,
//             rating: 0,
//             reviews: [],
//           },
//         },
//       });
//     } catch (error) {
//       console.error("Error submitting vendor data:", error);
//       alert("Error submitting form. Please try again.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navigation />

//       {/* Hero Section */}
//       <section className="bg-gray-50 py-10">
//         <div className="max-w-4xl mx-auto px-4 text-center">
//           <h2 className="text-3xl font-bold text-gray-800 mb-2">
//             Become a Vendor
//           </h2>
//           <p className="text-gray-600 mb-6">
//             Join our network of trusted vendors
//           </p>
//         </div>
//       </section>

//       {/* Registration Form */}
//       <main className="flex-grow">
//         <div className="max-w-4xl mx-auto px-4 py-8">
//           <form
//             onSubmit={handleSubmit}
//             className="bg-white rounded-xl shadow-md p-8 space-y-6"
//           >
//             {/* Basic Info */}
//             <section>
//               <h3 className="text-xl font-semibold text-gray-800 mb-4">
//                 Basic Information
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block font-medium mb-1 flex items-center gap-2">
//                     <FiUser /> Vendor Name
//                   </label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={vendorData.name}
//                     onChange={handleChange}
//                     required
//                     className="w-full p-3 border border-gray-300 rounded-lg"
//                   />
//                 </div>
//                 <div>
//                   <label className="block font-medium mb-1 flex items-center gap-2">
//                     <FiBriefcase /> Category
//                   </label>
//                   <select
//                     name="category"
//                     value={vendorData.category}
//                     onChange={handleChange}
//                     required
//                     className="w-full p-3 border border-gray-300 rounded-lg"
//                   >
//                     <option value="">Select Category</option>
//                     <option value="Catering">Catering</option>
//                     <option value="Lighting">Lighting</option>
//                     <option value="Decoration">Decoration</option>
//                     <option value="Entertainment">Entertainment</option>
//                     <option value="Venue">Venue</option>
//                     <option value="Photography">Photography</option>
//                     <option value="Audio-Visual">Audio-Visual</option>
//                   </select>
//                 </div>
//               </div>
//             </section>

//             <hr className="border-t border-gray-200" />

//             {/* Contact Info */}
//             <section>
//               <h3 className="text-xl font-semibold text-gray-800 mb-4">
//                 Contact Information
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block font-medium mb-1 flex items-center gap-2">
//                     <FiMail /> Email
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={vendorData.email}
//                     onChange={handleChange}
//                     required
//                     className="w-full p-3 border border-gray-300 rounded-lg"
//                   />
//                 </div>
//                 <div>
//                   <label className="block font-medium mb-1 flex items-center gap-2">
//                     <FiPhone /> Phone Number
//                   </label>
//                   <input
//                     type="tel"
//                     name="phone"
//                     value={vendorData.phone}
//                     onChange={handleChange}
//                     required
//                     className="w-full p-3 border border-gray-300 rounded-lg"
//                   />
//                 </div>
//               </div>
//             </section>

//             <hr className="border-t border-gray-200" />

//             {/* Location Info */}
//             <section>
//               <h3 className="text-xl font-semibold text-gray-800 mb-4">
//                 Location Information
//               </h3>
//               <div className="space-y-6">
//                 <div>
//                   <label className="block font-medium mb-1 flex items-center gap-2">
//                     <FiMapPin /> Address
//                   </label>
//                   <textarea
//                     name="address"
//                     value={vendorData.address}
//                     onChange={handleChange}
//                     rows="3"
//                     required
//                     className="w-full p-3 border border-gray-300 rounded-lg"
//                   />
//                 </div>

//                 <div>
//                   <label className="block font-medium mb-1">
//                     Cities Where You Operate
//                   </label>
//                   <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
//                     {availableCities.map((city) => (
//                       <div key={city} className="flex items-center">
//                         <input
//                           type="checkbox"
//                           id={`city-${city}`}
//                           checked={vendorData.cities.includes(city)}
//                           onChange={() => handleCityToggle(city)}
//                           className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                         />
//                         <label
//                           htmlFor={`city-${city}`}
//                           className="ml-2 text-sm text-gray-700"
//                         >
//                           {city}
//                         </label>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </section>

//             <button
//               type="submit"
//               disabled={submitting}
//               className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition mt-6"
//             >
//               {submitting ? "Submitting..." : "Register as Vendor"}
//             </button>
//           </form>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default SignupVendor;

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Footer from "../../components/Footer.jsx";
// import Navigation from "../../components/Navigation.jsx";
// import { FiUser, FiMapPin, FiMail, FiPhone, FiBriefcase } from "react-icons/fi";

// const SignupVendor = () => {
//   const [vendorData, setVendorData] = useState({
//     name: "",
//     category: "",
//     email: "",
//     phone: "",
//     address: "",
//     cities: [],
//     password: "",
//     capacity: "",
//     min_budget: "",
//     max_budget: "",
//     // banner_image: '',
//   });

//   const [submitting, setSubmitting] = useState(false);
//   const [bannerImagePreview, setBannerImagePreview] = useState(null);
//   const [bannerImage, setBannerImage] = useState(null);

//   const navigate = useNavigate();

//   const availableCities = [
//     "Colombo",
//     "Kandy",
//     "Galle",
//     "Jaffna",
//     "Negombo",
//     "Trincomalee",
//     "Batticaloa",
//     "Anuradhapura",
//     "Polonnaruwa",
//     "Matara",
//     "Ratnapura",
//     "Badulla",
//     "Kurunegala",
//     "Kalutara",
//     "Matale",
//     "Hambantota",
//     "Ampara",
//     "Nuwara Eliya",
//     "Puttalam",
//     "Mannar",
//   ];

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setVendorData({ ...vendorData, [name]: value });
//   };

//   const handleCityToggle = (city) => {
//     setVendorData((prev) => ({
//       ...prev,
//       cities: prev.cities.includes(city)
//         ? prev.cities.filter((c) => c !== city)
//         : [...prev.cities, city],
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);

//     try {
//       const formData = new FormData();

//       for (const key in vendorData) {
//         if (key === "cities") {
//           vendorData.cities.forEach((city) => formData.append("cities", city)); // handle array
//         } else {
//           formData.append(key, vendorData[key]);
//         }
//       }

//       // append image
//       if (bannerImage) {
//         formData.append("bannerImage", bannerImage);
//       }

//       const response = await fetch("http://localhost:5000/api/vendors", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await response.json();

//       if (!response.ok)
//         throw new Error(data.message || "Failed to register vendor");

//       navigate("/");
//     } catch (error) {
//       console.error("Error submitting vendor data:", error.message);
//       alert(error.message || "Error submitting form. Please try again.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navigation />

//       {/* Hero Section */}
//       <section className="bg-gray-50 py-10">
//         <div className="max-w-4xl mx-auto px-4 text-center">
//           <h2 className="text-3xl font-bold text-gray-800 mb-2">
//             Become a Vendor
//           </h2>
//           <p className="text-gray-600 mb-6">
//             Join our network of trusted vendors
//           </p>
//         </div>
//       </section>

//       {/* Registration Form */}
//       <main className="flex-grow">
//         <div className="max-w-4xl mx-auto px-4 py-8">
//           <form
//             onSubmit={handleSubmit}
//             className="bg-white rounded-xl shadow-md p-8 space-y-6"
//           >
//             {/* Basic Info */}
//             <section>
//               <h3 className="text-xl font-semibold text-gray-800 mb-4">
//                 Basic Information
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block font-medium mb-1 flex items-center gap-2">
//                     <FiUser /> Vendor Name
//                   </label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={vendorData.name}
//                     onChange={handleChange}
//                     required
//                     className="w-full p-3 border border-gray-300 rounded-lg"
//                   />
//                 </div>
//                 <div>
//                   <label className="block font-medium mb-1 flex items-center gap-2">
//                     <FiBriefcase /> Category
//                   </label>
//                   <select
//                     name="category"
//                     value={vendorData.category}
//                     onChange={handleChange}
//                     required
//                     className="w-full p-3 border border-gray-300 rounded-lg"
//                   >
//                     <option value="">Select Category</option>
//                     <option value="Catering">Catering</option>
//                     <option value="Lighting">Lighting</option>
//                     <option value="Decoration">Decoration</option>
//                     <option value="Entertainment">Entertainment</option>
//                     <option value="Venue">Venue</option>
//                     <option value="Photography">Photography</option>
//                     <option value="Audio-Visual">Audio-Visual</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block font-medium mb-1 flex items-center gap-2">
//                     🔒 Password
//                   </label>
//                   <input
//                     type="password"
//                     name="password"
//                     value={vendorData.password}
//                     onChange={handleChange}
//                     required
//                     className="w-full p-3 border border-gray-300 rounded-lg"
//                   />
//                 </div>

//                 {/* Upload Banner Image */}
//                 <div className="p-4 border border-sky-300 rounded-lg">
//                   <label className="font-semibold block mb-1">
//                     Upload Banner Image
//                   </label>
//                   <p className="text-sm text-gray-500 mb-2">
//                     Upload a high-quality banner that represents your event.
//                   </p>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) => {
//                       const file = e.target.files[0];
//                       if (file) {
//                         setBannerImage(file);
//                         setBannerImagePreview(URL.createObjectURL(file));
//                       }
//                     }}
//                   />
//                   {bannerImagePreview && (
//                     <img
//                       src={bannerImagePreview}
//                       alt="Preview"
//                       className="mt-4 max-h-48 rounded shadow"
//                     />
//                   )}
//                 </div>
//               </div>
//             </section>

//             <hr className="border-t border-gray-200" />

//             <section>
//               <h3 className="text-xl font-semibold text-gray-800 mb-4">
//                 Additional Info
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block font-medium mb-1">
//                     Max Budget (in your currency)
//                   </label>
//                   <input
//                     type="number"
//                     name="max_budget"
//                     value={vendorData.max_budget}
//                     onChange={handleChange}
//                     min="0"
//                     step="any"
//                     className="w-full p-3 border border-gray-300 rounded-lg"
//                     placeholder="e.g., 50000"
//                   />
//                 </div>
//                 <div>
//                   <label className="block font-medium mb-1">
//                     Minimum Budget
//                   </label>
//                   <input
//                     type="number"
//                     name="min_budget"
//                     value={vendorData.min_budget}
//                     onChange={handleChange}
//                     min="1"
//                     className="w-full p-3 border border-gray-300 rounded-lg"
//                     placeholder="e.g., 200"
//                   />
//                 </div>

//                 <div>
//                   <label className="block font-medium mb-1">
//                     Capacity (number of people)
//                   </label>
//                   <input
//                     type="number"
//                     name="capacity"
//                     value={vendorData.capacity}
//                     onChange={handleChange}
//                     min="1"
//                     className="w-full p-3 border border-gray-300 rounded-lg"
//                     placeholder="e.g., 200"
//                   />
//                 </div>
//               </div>
//             </section>

//             {/* Contact Info */}
//             <section>
//               <h3 className="text-xl font-semibold text-gray-800 mb-4">
//                 Contact Information
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block font-medium mb-1 flex items-center gap-2">
//                     <FiMail /> Email
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={vendorData.email}
//                     onChange={handleChange}
//                     required
//                     className="w-full p-3 border border-gray-300 rounded-lg"
//                   />
//                 </div>
//                 <div>
//                   <label className="block font-medium mb-1 flex items-center gap-2">
//                     <FiPhone /> Phone Number
//                   </label>
//                   <input
//                     type="tel"
//                     name="phone"
//                     value={vendorData.phone}
//                     onChange={handleChange}
//                     required
//                     className="w-full p-3 border border-gray-300 rounded-lg"
//                   />
//                 </div>
//               </div>
//             </section>

//             <hr className="border-t border-gray-200" />

//             {/* Location Info */}
//             <section>
//               <h3 className="text-xl font-semibold text-gray-800 mb-4">
//                 Location Information
//               </h3>
//               <div className="space-y-6">
//                 <div>
//                   <label className="block font-medium mb-1 flex items-center gap-2">
//                     <FiMapPin /> Address
//                   </label>
//                   <textarea
//                     name="address"
//                     value={vendorData.address}
//                     onChange={handleChange}
//                     rows="3"
//                     required
//                     className="w-full p-3 border border-gray-300 rounded-lg"
//                   />
//                 </div>

//                 <div>
//                   <label className="block font-medium mb-1">
//                     Cities Where You Operate
//                   </label>
//                   <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
//                     {availableCities.map((city) => (
//                       <div key={city} className="flex items-center">
//                         <input
//                           type="checkbox"
//                           id={`city-${city}`}
//                           checked={vendorData.cities.includes(city)}
//                           onChange={() => handleCityToggle(city)}
//                           className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                         />
//                         <label
//                           htmlFor={`city-${city}`}
//                           className="ml-2 text-sm text-gray-700"
//                         >
//                           {city}
//                         </label>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </section>

//             <button
//               type="submit"
//               disabled={submitting}
//               className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition mt-6"
//             >
//               {submitting ? "Submitting..." : "Register as Vendor"}
//             </button>
//           </form>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default SignupVendor;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer.jsx";
import Navigation from "../../components/Navigation.jsx";
import { FiUser, FiMapPin, FiMail, FiPhone, FiBriefcase } from "react-icons/fi";

const SignupVendor = () => {
  const [vendorData, setVendorData] = useState({
    name: "",
    category: "",
    email: "",
    phone: "",
    address: "",
    cities: [],
    password: "",
    capacity: "",
    min_budget: "",
    max_budget: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [bannerImagePreview, setBannerImagePreview] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const availableCities = [
    "Colombo",
    "Kandy",
    "Galle",
    "Jaffna",
    "Negombo",
    "Trincomalee",
    "Batticaloa",
    "Anuradhapura",
    "Polonnaruwa",
    "Matara",
    "Ratnapura",
    "Badulla",
    "Kurunegala",
    "Kalutara",
    "Matale",
    "Hambantota",
    "Ampara",
    "Nuwara Eliya",
    "Puttalam",
    "Mannar",
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!vendorData.name.trim()) newErrors.name = "Vendor name is required";
    if (!vendorData.category) newErrors.category = "Category is required";
    if (!vendorData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(vendorData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!vendorData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?\d{9,15}$/.test(vendorData.phone)) {
      newErrors.phone = "Invalid phone number";
    }
    if (!vendorData.address.trim()) newErrors.address = "Address is required";
    if (vendorData.cities.length === 0)
      newErrors.cities = "Select at least one city";
    if (!vendorData.password) {
      newErrors.password = "Password is required";
    } else if (vendorData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (vendorData.min_budget && Number(vendorData.min_budget) <= 0) {
      newErrors.min_budget = "Minimum budget must be greater than 0";
    }
    if (vendorData.max_budget && Number(vendorData.max_budget) <= 0) {
      newErrors.max_budget = "Maximum budget must be greater than 0";
    }
    if (
      vendorData.min_budget &&
      vendorData.max_budget &&
      Number(vendorData.min_budget) > Number(vendorData.max_budget)
    ) {
      newErrors.max_budget =
        "Maximum budget must be greater than or equal to minimum budget";
    }
    if (vendorData.capacity && Number(vendorData.capacity) <= 0) {
      newErrors.capacity = "Capacity must be greater than 0";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVendorData({ ...vendorData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleCityToggle = (city) => {
    setVendorData((prev) => ({
      ...prev,
      cities: prev.cities.includes(city)
        ? prev.cities.filter((c) => c !== city)
        : [...prev.cities, city],
    }));
    setErrors({ ...errors, cities: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      for (const key in vendorData) {
        if (key === "cities") {
          vendorData.cities.forEach((city) =>
            formData.append("cities[]", city)
          );
        } else {
          formData.append(key, vendorData[key]);
        }
      }
      if (bannerImage) {
        formData.append("bannerImage", bannerImage);
      }

      const response = await fetch("/api/vendors/register", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to register vendor");

      navigate("/vendor-home-page");
    } catch (error) {
      console.error("Error submitting vendor data:", error.message);
      alert(error.message || "Error submitting form. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-sky-50">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-sky-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            style={{
              fontFamily:
                "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
            }}
          >
            Become a Vendor
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join our network of trusted vendors to provide top-tier services for
            conferences and events.
          </p>
        </div>
      </section>

      {/* Registration Form */}
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-lg border border-sky-200 p-8 space-y-8"
          >
            {/* Basic Information */}
            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1 flex items-center gap-2">
                    <FiUser className="text-sky-600" /> Vendor Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={vendorData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300"
                    aria-label="Vendor name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1 flex items-center gap-2">
                    <FiBriefcase className="text-sky-600" /> Category
                  </label>
                  <select
                    name="category"
                    value={vendorData.category}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300"
                    aria-label="Vendor category"
                  >
                    <option value="">Select Category</option>
                    <option value="Catering">Catering</option>
                    <option value="Lighting">Lighting</option>
                    <option value="Decoration">Decoration</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Venue">Venue</option>
                    <option value="Photography">Photography</option>
                    <option value="Audio-Visual">Audio-Visual</option>
                  </select>
                  {errors.category && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.category}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1 flex items-center gap-2">
                    <span className="text-sky-600">🔒</span> Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={vendorData.password}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300"
                    aria-label="Password"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Banner Image
                  </label>
                  <div className="border-2 border-dashed border-sky-300 rounded-lg p-4 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setBannerImage(file);
                          setBannerImagePreview(URL.createObjectURL(file));
                        }
                      }}
                      className="hidden"
                      id="bannerImage"
                      aria-label="Upload banner image"
                    />
                    <label
                      htmlFor="bannerImage"
                      className="cursor-pointer text-sky-600 hover:text-sky-700 transition-all duration-300"
                    >
                      {bannerImage
                        ? "Change Image"
                        : "Upload a high-quality banner image"}
                    </label>
                    <p className="text-sm text-gray-500 mt-1">
                      Supports PNG, JPG, or JPEG (max 5MB)
                    </p>
                    {bannerImagePreview && (
                      <img
                        src={bannerImagePreview}
                        alt="Banner preview"
                        className="mt-4 max-h-64 w-full object-cover rounded-lg shadow"
                        onError={(e) =>
                          (e.target.src =
                            "https://via.placeholder.com/600x200?text=Banner+Image")
                        }
                      />
                    )}
                  </div>
                </div>
              </div>
            </section>

            <hr className="border-t border-sky-200" />

            {/* Additional Info */}
            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Additional Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Maximum Budget (in your currency)
                  </label>
                  <input
                    type="number"
                    name="max_budget"
                    value={vendorData.max_budget}
                    onChange={handleChange}
                    min="0"
                    step="any"
                    className="w-full p-3 border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300"
                    placeholder="e.g., 50000"
                    aria-label="Maximum budget"
                  />
                  {errors.max_budget && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.max_budget}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Minimum Budget
                  </label>
                  <input
                    type="number"
                    name="min_budget"
                    value={vendorData.min_budget}
                    onChange={handleChange}
                    min="0"
                    className="w-full p-3 border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300"
                    placeholder="e.g., 200"
                    aria-label="Minimum budget"
                  />
                  {errors.min_budget && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.min_budget}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Capacity (number of people)
                  </label>
                  <input
                    type="number"
                    name="capacity"
                    value={vendorData.capacity}
                    onChange={handleChange}
                    min="1"
                    className="w-full p-3 border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300"
                    placeholder="e.g., 200"
                    aria-label="Capacity"
                  />
                  {errors.capacity && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.capacity}
                    </p>
                  )}
                </div>
              </div>
            </section>

            <hr className="border-t border-sky-200" />

            {/* Contact Info */}
            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1 flex items-center gap-2">
                    <FiMail className="text-sky-600" /> Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={vendorData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300"
                    aria-label="Email"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1 flex items-center gap-2">
                    <FiPhone className="text-sky-600" /> Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={vendorData.phone}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300"
                    aria-label="Phone number"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>
            </section>

            <hr className="border-t border-sky-200" />

            {/* Location Info */}
            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Location Information
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1 flex items-center gap-2">
                    <FiMapPin className="text-sky-600" /> Address
                  </label>
                  <textarea
                    name="address"
                    value={vendorData.address}
                    onChange={handleChange}
                    rows="4"
                    required
                    className="w-full p-3 border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300"
                    aria-label="Address"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.address}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Cities Where You Operate
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                    {availableCities.map((city) => (
                      <div key={city} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`city-${city}`}
                          checked={vendorData.cities.includes(city)}
                          onChange={() => handleCityToggle(city)}
                          className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-sky-300 rounded transition-all duration-300"
                          aria-label={`Select ${city}`}
                        />
                        <label
                          htmlFor={`city-${city}`}
                          className="ml-2 text-sm text-gray-700"
                        >
                          {city}
                        </label>
                      </div>
                    ))}
                  </div>
                  {errors.cities && (
                    <p className="text-red-500 text-sm mt-1">{errors.cities}</p>
                  )}
                </div>
              </div>
            </section>

            <button
              type="submit"
              disabled={submitting}
              className={`w-full bg-sky-600 text-white py-3 rounded-lg text-lg font-semibold shadow-md focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition-all duration-300 ${
                submitting
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-sky-700"
              }`}
              aria-label="Register as vendor"
            >
              {submitting ? "Submitting..." : "Register as Vendor"}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SignupVendor;
