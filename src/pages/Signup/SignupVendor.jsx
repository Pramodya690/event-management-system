import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Navigation from "../../components/Navigation/Navigation.jsx";
import {
  FiUser, FiMapPin, FiUsers, FiDollarSign,
  FiUpload, FiBriefcase, FiInfo
} from 'react-icons/fi';

const SignupVendor = () => {
  const [vendorData, setVendorData] = useState({
    name: '',
    category: '',
    location: '',
    capacity: '',
    minBudget: '',
    maxBudget: '',
    image: null,
    description: ''
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      const file = files[0];
      setVendorData({ ...vendorData, image: file });
      if (file) {
        setImagePreview(URL.createObjectURL(file));
      }
    } else {
      setVendorData({ ...vendorData, [name]: value });
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setSubmitting(true);

  try {
    // In a real app, you would make an API call here
    // const response = await axios.post('/api/vendors', vendorData);
    // const newVendorId = response.data.id;
    
    // For demo purposes, we'll use a mock ID
    const newVendorId = 'mock-vendor-id-123';
    
    // Navigate to the vendor profile with the new vendor's data
    navigate(`/vendor-profile/${newVendorId}`, { 
      state: { 
        vendor: {
          ...vendorData,
          id: newVendorId,
          rating: 0, // Default rating for new vendors
          reviews: [] // Empty reviews array
        } 
      } 
    });

  } catch (error) {
    console.error('Error submitting vendor data:', error);
    alert('Error submitting form. Please try again.');
  } finally {
    setSubmitting(false);
  }
};


  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gray-50 py-10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Become a Vendor</h2>
          <p className="text-gray-600 mb-6">List your services and connect with thousands of event organizers across the world.</p>

          <div className="w-40 h-40 mx-auto relative mb-4">
            <div className="w-full h-full rounded-full bg-gray-200 overflow-hidden border-4 border-white shadow-lg">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  <FiUpload size={32} />
                </div>
              )}
            </div>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
          <p className="text-sm text-gray-500">Click image to upload a profile picture</p>
        </div>
      </section>

      {/* Registration Form */}
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-8 space-y-8">
            {/* Business Info */}
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Business Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-medium mb-1 flex items-center gap-2">
                    <FiUser /> Vendor Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={vendorData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1 flex items-center gap-2">
                    <FiBriefcase /> Category
                  </label>
                  <select
                    name="category"
                    value={vendorData.category}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg"
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
                </div>
              </div>
            </section>

            <hr className="border-t border-gray-200" />

            {/* Capabilities */}
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Event Capabilities</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-medium mb-1 flex items-center gap-2">
                    <FiMapPin /> Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={vendorData.location}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1 flex items-center gap-2">
                    <FiUsers /> Capacity
                  </label>
                  <input
                    type="number"
                    name="capacity"
                    value={vendorData.capacity}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            </section>

            <hr className="border-t border-gray-200" />

            {/* Pricing */}
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Pricing</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-medium mb-1 flex items-center gap-2">
                    <FiDollarSign /> Min Budget (₹)
                  </label>
                  <input
                    type="number"
                    name="minBudget"
                    value={vendorData.minBudget}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1 flex items-center gap-2">
                    <FiDollarSign /> Max Budget (₹)
                  </label>
                  <input
                    type="number"
                    name="maxBudget"
                    value={vendorData.maxBudget}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            </section>

            <hr className="border-t border-gray-200" />

            {/* Description */}
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">About Your Services</h3>
              <label className="block font-medium mb-1 flex items-center gap-2">
                <FiInfo /> Description
              </label>
              <textarea
                name="description"
                value={vendorData.description}
                onChange={handleChange}
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Write a short description about your services"
              />
            </section>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition"
            >
              {submitting ? 'Submitting...' : 'Register as Vendor'}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SignupVendor;
