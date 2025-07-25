"use client";

import React from "react";

// Simple inline SVG icons for check and clear
const CheckIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M5 13l4 4L19 7" />
  </svg>
);

const XIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    {...props}
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

import { Slider } from "@/components/ui/slider";

const CarFilterControls = ({
  filters,
  currentFilters,
  onFilterChange,
  onClearFilter,
}) => {
  const {
    make,
    bodyType,
    fuelType,
    transmission,
    priceRange,
    priceRangeMin,
    priceRangeMax,
  } = currentFilters;

  const filterData = [
    {
      id: "make",
      label: "Make",
      options: filters.makes || [],
      value: make,
    },
    {
      id: "bodyType",
      label: "Body Type",
      options: filters.bodyTypes || [],
      value: bodyType,
    },
    {
      id: "fuelType",
      label: "Fuel Type",
      options: filters.fuelTypes || [],
      value: fuelType,
    },
    {
      id: "transmission",
      label: "Transmission",
      options: filters.transmissions || [],
      value: transmission,
    },
  ];

  return (
    <div className="space-y-7">
      {/* Price Range */}
      <div className="space-y-2">
        <label className="block font-medium">Price Range</label>
        <Slider
          min={priceRangeMin}
          max={priceRangeMax}
          step={100}
          value={priceRange}
          onValueChange={(val) => onFilterChange("priceRange", val)}
        />
        <div className="flex justify-between text-sm font-medium">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      {/* Other Filters */}
      {filterData.map(({ id, label, options, value }) => (
        <div key={id} className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="block font-medium text-sm">{label}</label>
            {value && (
              <button
                className="flex items-center text-gray-600 text-xs hover:text-gray-900"
                onClick={() => onClearFilter(id)}
                aria-label={`Clear ${label} filter`}
              >
                Clear <XIcon className="ml-1 w-3 h-3" />
              </button>
            )}
          </div>
          <select
            className="w-full border rounded px-2 py-1"
            value={value || ""}
            onChange={(e) => onFilterChange(id, e.target.value)}
          >
            <option value="">All {label}s</option>
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

export default CarFilterControls;
