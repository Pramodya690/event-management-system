import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer.jsx';
import Navigation from "../../components/Navigation.jsx";
import { FiUser, FiMapPin, FiMail, FiPhone, FiBriefcase } from 'react-icons/fi';

const SignupVendor = () => {
  const [vendorData, setVendorData] = useState({
    name: '',
    category: '',
    email: '',
    phone: '',
    address: '',
    cities: [],
    password: '',
    capacity:'',
    min_budget:'',
    max_budget:'',
    // banner_image: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [bannerImagePreview, setBannerImagePreview] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);

  const navigate = useNavigate();

  const availableCities = [
    'Colombo', 'Kandy', 'Galle', 'Jaffna', 'Negombo',
    'Trincomalee', 'Batticaloa', 'Anuradhapura', 'Polonnaruwa', 'Matara',
    'Ratnapura', 'Badulla', 'Kurunegala', 'Kalutara', 'Matale',
    'Hambantota', 'Ampara', 'Nuwara Eliya', 'Puttalam', 'Mannar'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVendorData({ ...vendorData, [name]: value });
  };

  const handleCityToggle = (city) => {
    setVendorData(prev => ({
      ...prev,
      cities: prev.cities.includes(city)
        ? prev.cities.filter(c => c !== city)
        : [...prev.cities, city]
    }));
  };


const handleSubmit = async (e) => {
  e.preventDefault();
  setSubmitting(true);

  try {
    const formData = new FormData();

    for (const key in vendorData) {
      if (key === 'cities') {
        vendorData.cities.forEach(city => formData.append('cities', city)); // handle array
      } else {
        formData.append(key, vendorData[key]);
      }
    }

    // append image
    if (bannerImage) {
      formData.append('bannerImage', bannerImage);
    }

    const response = await fetch('http://localhost:5000/api/vendors', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    

    if (!response.ok) throw new Error(data.message || 'Failed to register vendor');

    navigate("/vendor-home-page");
  } catch (error) {
    console.error('Error submitting vendor data:', error.message);
    alert(error.message || 'Error submitting form. Please try again.');
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
          <p className="text-gray-600 mb-6">Join our network of trusted vendors</p>
        </div>
      </section>

      {/* Registration Form */}
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-8 space-y-6">
            {/* Basic Info */}
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Basic Information</h3>
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
                <div>
                  <label className="block font-medium mb-1 flex items-center gap-2">
                    🔒 Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={vendorData.password}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>

                      {/* Upload Banner Image */}
      <div className="p-4 border border-sky-300 rounded-lg">
        <label className="font-semibold block mb-1">Upload Banner Image</label>
        <p className="text-sm text-gray-500 mb-2">Upload a high-quality banner that represents your event.</p>
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
        />
        {bannerImagePreview && (
          <img src={bannerImagePreview} alt="Preview" className="mt-4 max-h-48 rounded shadow" />
        )}
      </div>

              </div>
            </section>

            <hr className="border-t border-gray-200" />

            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Additional Info</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-medium mb-1">
                    Max Budget (in your currency)
                  </label>
                  <input
                    type="number"
                    name="max_budget"
                    value={vendorData.max_budget}
                    onChange={handleChange}
                    min="0"
                    step="any"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="e.g., 50000"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">
                    Minimum Budget
                  </label>
                  <input
                    type="number"
                    name="min_budget"
                    value={vendorData.min_budget}
                    onChange={handleChange}
                    min="1"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="e.g., 200"
                  />
                </div>
                
                <div>
                  <label className="block font-medium mb-1">
                    Capacity (number of people)
                  </label>
                  <input
                    type="number"
                    name="capacity"
                    value={vendorData.capacity}
                    onChange={handleChange}
                    min="1"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="e.g., 200"
                  />
                </div>
              </div>
            </section>


            {/* Contact Info */}
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-medium mb-1 flex items-center gap-2">
                    <FiMail /> Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={vendorData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1 flex items-center gap-2">
                    <FiPhone /> Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={vendorData.phone}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            </section>

            <hr className="border-t border-gray-200" />

            {/* Location Info */}
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Location Information</h3>
              <div className="space-y-6">
                <div>
                  <label className="block font-medium mb-1 flex items-center gap-2">
                    <FiMapPin /> Address
                  </label>
                  <textarea
                    name="address"
                    value={vendorData.address}
                    onChange={handleChange}
                    rows="3"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>
                
                <div>
                  <label className="block font-medium mb-1">
                    Cities Where You Operate
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {availableCities.map(city => (
                      <div key={city} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`city-${city}`}
                          checked={vendorData.cities.includes(city)}
                          onChange={() => handleCityToggle(city)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor={`city-${city}`} className="ml-2 text-sm text-gray-700">
                          {city}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition mt-6"
            >
              {submitting ? 'Submitting...' : 'Register as Vendor'}
              Register as a vendor
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SignupVendor;