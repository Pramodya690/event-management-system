import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export default function GeneralSettings() {
  const [formData, setFormData] = useState({
    companyName: "",
    timezone: "UTC",
    dateFormat: "MM/DD/YYYY",
    defaultLanguage: "English",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const fields = [
    { label: "Company name", id: "companyName", type: "text" },
    {
      label: "Timezone",
      id: "timezone",
      type: "select",
      options: ["UTC", "EST", "PST", "CET"],
    },
    {
      label: "Date format",
      id: "dateFormat",
      type: "select",
      options: ["MM/DD/YYYY", "DD/MM/YYYY", "YYYY-MM-DD"],
    },
    {
      label: "Default language",
      id: "defaultLanguage",
      type: "select",
      options: ["English", "Spanish", "French", "German"],
    },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        {fields.map(({ label, id, type, options }) => (
          <div key={id} className="flex items-center space-x-4">
            <label
              htmlFor={id}
              className="w-48 text-sm font-medium text-gray-700"
            >
              {label}
            </label>
            {type === "text" ? (
              <input
                type="text"
                name={id}
                id={id}
                value={formData[id]}
                onChange={handleChange}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
              />
            ) : (
              <select
                id={id}
                name={id}
                value={formData[id]}
                onChange={handleChange}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
              >
                {options.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
            )}
          </div>
        ))}
      </div>

      <Button type="submit" className="mt-4">
        Save
      </Button>
    </form>
  );
}
