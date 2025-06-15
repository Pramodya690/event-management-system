const categories = [
  { name: "All", icon: "/icons/all.png" },
  { name: "Music", icon: "/icons/music.png" },
  { name: "Food", icon: "/icons/food.png" },
  { name: "Art", icon: "/icons/art.png" },
  { name: "Culture", icon: "/icons/culture.png" },
  { name: "Comedy", icon: "/icons/comedy.png" },
  { name: "Party", icon: "/icons/party.png" },
];

const CategoryFilter = ({ selectedCategory, setSelectedCategory }) => (
  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-4 justify-items-center">
    {categories.map(({ name, icon }) => (
      <button
        key={name}
        onClick={() => setSelectedCategory(name)}
        className={`flex flex-col items-center p-3 rounded-lg transition-all w-full ${
          selectedCategory === name
            ? "bg-sky-300 text-white shadow-md"
            : "bg-white text-gray-700 hover:bg-sky-100 shadow-sm"
        }`}
      >
        <img src={icon} alt={name} className="w-8 h-8 mb-2" />
        <span className="text-sm font-medium">{name}</span>
      </button>
    ))}
  </div>
);

export default CategoryFilter;