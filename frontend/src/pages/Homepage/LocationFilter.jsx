const popularLocations = [
  { name: "All", image: "/Images/all.jpg" },
  { name: "Colombo", image: "/Images/colombo.jpg" },
  { name: "Cinnamon Gardens", image: "/Images/cinnamon-garden.jpeg" },
  { name: "Colombo Fort", image: "/Images/colombo-fort.jpeg" },
  { name: "Kandy", image: "/Images/kandy.jpg" },
  { name: "Galle", image: "/Images/galle.jpeg" },
   { name: "Jaffna", image: "/Images/Jaffna.jpg" },
  { name: "Negombo", image: "/Images/Negombo.jpg" },
  { name: "Nuwara Eliya", image: "/Images/NuwareEliya.jpg" },
  { name: "Anuradhapura", image: "/Images/Anuradhapura.jpeg" },
];

const LocationFilter = ({ selectedLocation, setSelectedLocation }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
    {popularLocations.map(({ name, image }) => (
      <button
        key={name}
        onClick={() => setSelectedLocation(name)}
        className={`relative rounded-xl overflow-hidden h-32 transition-all ${
          selectedLocation === name ? "ring-4 ring-sky-500" : "hover:ring-2 hover:ring-sky-300"
        }`}
      >
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <span className="text-white font-bold text-center px-2">{name}</span>
        </div>
      </button>
    ))}
  </div>
);

export default LocationFilter;