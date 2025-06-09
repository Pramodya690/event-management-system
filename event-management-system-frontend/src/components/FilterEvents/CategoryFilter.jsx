import React from "react";

const categories = ["All", "Art", "Food", "Books", "Technology"];

const CategoryFilter = ({ selectedCategory, setSelectedCategory }) => (
  <div className="flex gap-2 flex-wrap justify-center mb-4">
    {categories.map((cat) => (
      <button
        key={cat}
        className={`px-4 py-2 rounded-full border ${
          selectedCategory === cat
            ? "bg-sky-600 text-white"
            : "bg-white text-gray-700 hover:bg-gray-100"
        }`}
        onClick={() => setSelectedCategory(cat)}
      >
        {cat}
      </button>
    ))}
  </div>
);

export default CategoryFilter;
