import React from "react";

const FiltersPanel = ({ setLocation, setDate }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mt-6">
      <input
        type="text"
        placeholder="Search by location"
        onChange={(e) => setLocation(e.target.value)}
        className="w-full md:w-1/2 px-4 py-2 border rounded"
      />
      <input
        type="date"
        onChange={(e) => setDate(e.target.value)}
        className="w-full md:w-1/2 px-4 py-2 border rounded"
      />
    </div>
  );
};

export default FiltersPanel;
