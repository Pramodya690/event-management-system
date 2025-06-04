import { useLocation, useNavigate } from 'react-router-dom';
import { FiStar, FiMapPin, FiUsers, FiDollarSign, FiEdit } from 'react-icons/fi';
import Footer from '../components/Footer/Footer';
import Navigation from "../components/Navigation/Navigation.jsx";

const VendorProfile = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  
  // If no state was passed, show an error
  if (!state?.vendor) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow flex items-center justify-center p-4">
          <div className="max-w-md text-center">
            <h1 className="text-2xl font-bold mb-4">Vendor Not Found</h1>
            <p className="mb-6">The vendor profile could not be loaded.</p>
            <button 
              onClick={() => navigate('/')}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Return Home
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const { vendor } = state;

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow bg-gray-50">
        {/* Profile Header */}
        <section className="bg-white shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-40 h-40 rounded-full bg-gray-200 overflow-hidden shadow-md">
                {vendor.image ? (
                  <img 
                    src={typeof vendor.image === 'string' ? vendor.image : URL.createObjectURL(vendor.image)} 
                    alt={vendor.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                    <span className="text-gray-500 text-2xl">{vendor.name.charAt(0)}</span>
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-800">{vendor.name}</h1>
                    <p className="text-gray-600 mb-2">{vendor.category}</p>
                    <div className="flex items-center text-yellow-500 mb-4">
                      <FiStar className="fill-current" />
                      <span className="ml-1 text-gray-700">New Vendor</span>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate(`/vendor-profile/${vendor.id}/edit`, { state: { vendor } })}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                  >
                    <FiEdit /> Edit Profile
                  </button>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div className="flex items-center gap-2">
                    <FiMapPin className="text-gray-500" />
                    <span>{vendor.location || 'Not specified'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiUsers className="text-gray-500" />
                    <span>{vendor.capacity || '0'} people</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiDollarSign className="text-gray-500" />
                    <span>
                      {vendor.minBudget ? `₹${vendor.minBudget}` : 'Not specified'}
                      {vendor.maxBudget ? ` - ₹${vendor.maxBudget}` : ''}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="max-w-6xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">About Us</h2>
            <p className="text-gray-700">
              {vendor.description || 'No description provided.'}
            </p>
          </div>

          {/* Services Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium mb-2">Service Category</h3>
                <p>{vendor.category}</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium mb-2">Event Types</h3>
                <p>Weddings, Corporate Events, Social Gatherings</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default VendorProfile;