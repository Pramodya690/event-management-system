// import { useState } from 'react';

// const OrganizerDashboardFindVendors = () => {
//   const [filters, setFilters] = useState({
//     category: '',
//     minBudget: '',
//     maxBudget: '',
//     location: '',
//     capacity: ''
//   });

//   const [vendors, setVendors] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFilters({ ...filters, [e.target.name]: e.target.value });
//   };

//   const handleSearch = async () => {
//     setLoading(true);
//     const query = new URLSearchParams(filters).toString();
//     try {
//       const res = await fetch(`/vendors/search?${query}`);
//       const data = await res.json();
//       setVendors(data);
//     } catch (error) {
//       console.error('Error fetching vendors:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-5xl mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-6">Find Vendors</h1>

//       <div className="grid md:grid-cols-2 gap-4 mb-6">
//         <div>
//           <label className="block font-medium mb-1">Category</label>
//           <select
//             name="category"
//             value={filters.category}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//           >
//             <option value="">Select category</option>
//             <option value="Catering">Catering</option>
//             <option value="Lighting">Lighting</option>
//             <option value="Decoration">Decoration</option>
//             <option value="Entertainment">Entertainment</option>
//             <option value="Venue">Venue</option>
//           </select>
//         </div>

//         <div>
//           <label className="block font-medium mb-1">Location</label>
//           <input
//             type="text"
//             name="location"
//             value={filters.location}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             placeholder="City or area"
//           />
//         </div>

//         <div>
//           <label className="block font-medium mb-1">Min Budget (₹)</label>
//           <input
//             type="number"
//             name="minBudget"
//             value={filters.minBudget}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//           />
//         </div>

//         <div>
//           <label className="block font-medium mb-1">Max Budget (₹)</label>
//           <input
//             type="number"
//             name="maxBudget"
//             value={filters.maxBudget}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//           />
//         </div>

//         <div>
//           <label className="block font-medium mb-1">Minimum Capacity</label>
//           <input
//             type="number"
//             name="capacity"
//             value={filters.capacity}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//           />
//         </div>
//       </div>

//       <button
//         onClick={handleSearch}
//         className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
//         disabled={loading}
//       >
//         {loading ? 'Searching...' : 'Search Vendors'}
//       </button>

//       <div className="mt-8">
//         {vendors.length === 0 && !loading && (
//           <p className="text-gray-600">No vendors found. Try changing the filters.</p>
//         )}

//         <div className="grid md:grid-cols-2 gap-4 mt-4">
//           {vendors.map((vendor) => (
//             <div key={vendor.id || vendor._id} className="border rounded p-4 shadow-sm">
//               <h2 className="text-lg font-semibold">{vendor.name}</h2>
//               <p className="text-gray-600">Category: {vendor.category}</p>
//               <p className="text-gray-600">Location: {vendor.location}</p>
//               <p className="text-gray-600">
//                 Budget: ₹{vendor.budgetRange?.min} – ₹{vendor.budgetRange?.max}
//               </p>
//               <p className="text-gray-600">Capacity: {vendor.capacity} people</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrganizerDashboardFindVendors;

import { useState } from 'react';
import { FiSearch, FiFilter, FiStar, FiMapPin, FiUsers, FiDollarSign } from 'react-icons/fi';

const OrganizerDashboardFindVendors = () => {
  const [filters, setFilters] = useState({
    category: '',
    minBudget: '',
    maxBudget: '',
    location: '',
    capacity: ''
  });

  const [vendors, setVendors] = useState([
    // Mock data for demonstration
    {
      id: 1,
      name: "Premium Catering Services",
      category: "Catering",
      location: "Mumbai",
      budgetRange: { min: 50000, max: 200000 },
      capacity: 500,
      rating: 4.8,
      image: "/Images/catering.jpeg"
    },
    {
      id: 2,
      name: "Luxury Event Decorators",
      category: "Decoration",
      location: "Delhi",
      budgetRange: { min: 30000, max: 150000 },
      capacity: 300,
      rating: 4.5,
      image: "/Images/decor.jpeg"
    }
  ]);
  
  const [loading, setLoading] = useState(false);
  const [expandedFilter, setExpandedFilter] = useState(false);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const resetFilters = () => {
    setFilters({
      category: '',
      minBudget: '',
      maxBudget: '',
      location: '',
      capacity: ''
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Find Vendors</h1>
          <p className="text-gray-600 mt-2">Discover trusted vendors for your next event</p>
        </div>
        <button 
          onClick={() => setExpandedFilter(!expandedFilter)}
          className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition"
        >
          <FiFilter className="text-gray-600" />
          <span>{expandedFilter ? 'Hide Filters' : 'Show Filters'}</span>
        </button>
      </div>

      {/* Search and Filters Section */}
      <div className={`bg-white rounded-xl shadow-md p-6 mb-8 transition-all duration-300 ${expandedFilter ? 'block' : 'hidden md:block'}`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search Vendors</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                name="location"
                value={filters.location}
                onChange={handleChange}
                className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Location or vendor name"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              name="category"
              value={filters.category}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Categories</option>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Budget Range (₹)</label>
            <div className="flex gap-2">
              <input
                type="number"
                name="minBudget"
                value={filters.minBudget}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Min"
              />
              <input
                type="number"
                name="maxBudget"
                value={filters.maxBudget}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Max"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Capacity</label>
            <input
              type="number"
              name="capacity"
              value={filters.capacity}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Number of people"
            />
          </div>

          <div className="flex items-end gap-3">
            <button
              onClick={handleSearch}
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
              disabled={loading}
            >
              <FiSearch />
              {loading ? 'Searching...' : 'Search Vendors'}
            </button>
            <button
              onClick={resetFilters}
              className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {vendors.length} {vendors.length === 1 ? 'Vendor' : 'Vendors'} Found
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Sort by:</span>
            <select className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500">
              <option>Recommended</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Rating</option>
            </select>
          </div>
        </div>

        {vendors.length === 0 && !loading && (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <FiSearch className="text-gray-400 text-2xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">No vendors found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search filters</p>
            <button
              onClick={resetFilters}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Reset all filters
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vendors.map((vendor) => (
            <div key={vendor.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition">
              <div className="h-48 bg-gray-200 relative">
                <img 
                  src={vendor.image} 
                  alt={vendor.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded-full flex items-center gap-1 text-sm font-medium">
                  <FiStar className="text-yellow-400" />
                  <span>{vendor.rating}</span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{vendor.name}</h3>
                <div className="flex items-center text-gray-600 text-sm mb-2">
                  <FiMapPin className="mr-1" />
                  <span>{vendor.location}</span>
                </div>
                <div className="flex items-center text-gray-600 text-sm mb-3">
                  <FiUsers className="mr-1" />
                  <span>Capacity: {vendor.capacity} people</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-gray-800 font-medium">
                    <FiDollarSign className="inline mr-1" />
                    <span>₹{vendor.budgetRange.min.toLocaleString()} - ₹{vendor.budgetRange.max.toLocaleString()}</span>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      {vendors.length > 0 && (
        <div className="flex justify-center items-center gap-2">
          <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50">
            Previous
          </button>
          <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
            1
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
            2
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
            3
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default OrganizerDashboardFindVendors;