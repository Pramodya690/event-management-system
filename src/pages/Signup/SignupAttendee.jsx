import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navigation from "../../components/Navigation.jsx";

const SignupAttendee = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Replace with your actual signup API route
      const response = await axios.post("/api/auth/attendee/signup", {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      if (response.status === 201 || response.status === 200) {
        navigate("/login"); // Redirect to login or homepage
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <>
      <Navigation /> {/* ✅ Navigation bar outside the centered box */}
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
            Attendee Signup
          </h2>

          {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full mt-1 p-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full mt-1 p-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full mt-1 p-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                className="w-full mt-1 p-2 border rounded-md"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Log in
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignupAttendee;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Navigation from "../../components/Navigation.jsx";
// import Footer from "../../components/Footer.jsx";

// const SignupAttendee = () => {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);

//   const validateForm = () => {
//     const newErrors = {};
//     if (!form.name.trim() || form.name.length < 2) {
//       newErrors.name = "Name must be at least 2 characters";
//     }
//     if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
//       newErrors.email = "Please enter a valid email address";
//     }
//     if (!form.password || form.password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters";
//     }
//     if (form.password !== form.confirmPassword) {
//       newErrors.confirmPassword = "Passwords do not match";
//     }
//     return newErrors;
//   };

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     setErrors({ ...errors, [e.target.name]: "" }); // Clear field-specific error
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrors({});
//     setLoading(true);

//     const validationErrors = validateForm();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await axios.post("/api/auth/attendee/signup", {
//         name: form.name.trim(),
//         email: form.email.toLowerCase(),
//         password: form.password,
//       });

//       if (response.status === 201 || response.status === 200) {
//         setForm({ name: "", email: "", password: "", confirmPassword: "" }); // Clear form
//         navigate("/"); // Redirect to homepage
//       }
//     } catch (err) {
//       console.error("Signup Error:", {
//         message: err.message,
//         response: err.response?.data,
//         status: err.response?.status,
//       });
//       if (err.response?.status === 400) {
//         setErrors({
//           general: err.response.data.message || "Email already exists",
//         });
//       } else if (err.response?.status === 500) {
//         setErrors({ general: "Server error. Please try again later." });
//       } else {
//         setErrors({ general: "Something went wrong. Please try again." });
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-sky-50">
//       <Navigation />

//       <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
//         <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 border border-sky-200">
//           <h2
//             className="text-3xl font-bold text-gray-800 text-center mb-6"
//             style={{
//               fontFamily:
//                 "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
//             }}
//           >
//             Attendee Signup
//           </h2>

//           {errors.general && (
//             <div className="bg-red-50 text-red-600 border border-red-200 rounded-md p-3 mb-6 text-sm">
//               {errors.general}
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label
//                 htmlFor="name"
//                 className="block text-sm font-semibold text-gray-700"
//               >
//                 Name
//               </label>
//               <input
//                 id="name"
//                 name="name"
//                 type="text"
//                 value={form.name}
//                 onChange={handleChange}
//                 required
//                 className={`w-full mt-1 p-3 border rounded-lg text-gray-700 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300 ${
//                   errors.name ? "border-red-500" : "border-gray-300"
//                 }`}
//                 placeholder="Enter your full name"
//               />
//               {errors.name && (
//                 <p className="mt-1 text-xs text-red-600">{errors.name}</p>
//               )}
//             </div>

//             <div>
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-semibold text-gray-700"
//               >
//                 Email
//               </label>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 value={form.email}
//                 onChange={handleChange}
//                 required
//                 className={`w-full mt-1 p-3 border rounded-lg text-gray-700 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300 ${
//                   errors.email ? "border-red-500" : "border-gray-300"
//                 }`}
//                 placeholder="Enter your email address"
//               />
//               {errors.email && (
//                 <p className="mt-1 text-xs text-red-600">{errors.email}</p>
//               )}
//             </div>

//             <div>
//               <label
//                 htmlFor="password"
//                 className="block text-sm font-semibold text-gray-700"
//               >
//                 Password
//               </label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 value={form.password}
//                 onChange={handleChange}
//                 required
//                 className={`w-full mt-1 p-3 border rounded-lg text-gray-700 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300 ${
//                   errors.password ? "border-red-500" : "border-gray-300"
//                 }`}
//                 placeholder="Enter your password"
//               />
//               {errors.password && (
//                 <p className="mt-1 text-xs text-red-600">{errors.password}</p>
//               )}
//             </div>

//             <div>
//               <label
//                 htmlFor="confirmPassword"
//                 className="block text-sm font-semibold text-gray-700"
//               >
//                 Confirm Password
//               </label>
//               <input
//                 id="confirmPassword"
//                 name="confirmPassword"
//                 type="password"
//                 value={form.confirmPassword}
//                 onChange={handleChange}
//                 required
//                 className={`w-full mt-1 p-3 border rounded-lg text-gray-700 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300 ${
//                   errors.confirmPassword ? "border-red-500" : "border-gray-300"
//                 }`}
//                 placeholder="Confirm your password"
//               />
//               {errors.confirmPassword && (
//                 <p className="mt-1 text-xs text-red-600">
//                   {errors.confirmPassword}
//                 </p>
//               )}
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className={`w-full bg-sky-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-sky-700 hover:shadow-lg focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition-all duration-300 flex items-center justify-center ${
//                 loading ? "opacity-75 cursor-not-allowed" : ""
//               }`}
//             >
//               {loading ? (
//                 <>
//                   <svg
//                     className="animate-spin h-5 w-5 mr-2 text-white"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                   >
//                     <circle
//                       className="opacity-25"
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="currentColor"
//                       strokeWidth="4"
//                     />
//                     <path
//                       className="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                     />
//                   </svg>
//                   Signing Up...
//                 </>
//               ) : (
//                 "Sign Up"
//               )}
//             </button>
//           </form>

//           <p className="mt-6 text-center text-sm text-gray-600">
//             Already have an account?{" "}
//             <span
//               onClick={() => navigate("/login")}
//               className="text-sky-600 font-semibold hover:text-sky-700 hover:underline cursor-pointer transition-colors duration-300"
//             >
//               Log in
//             </span>
//           </p>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default SignupAttendee;
