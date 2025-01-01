import React from 'react';
import { mockCities } from '../../data/mockData';

interface CitySelectorProps {
  label: string;
  value: string | string[];
  onChange: (value: any) => void;
  multiple?: boolean;
  max?: number;
}

export function CitySelector({ label, value, onChange, multiple, max }: CitySelectorProps) {
  const cities = Object.keys(mockCities).sort();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (multiple) {
      const selected = Array.from(e.target.selectedOptions).map(opt => opt.value);
      if (max && selected.length > max) {
        return;
      }
      onChange(selected);
    } else {
      onChange(e.target.value);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <select
        value={value}
        onChange={handleChange}
        multiple={multiple}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        size={multiple ? 5 : 1}
      >
        {!multiple && <option value="">Select a city</option>}
        {cities.map(city => (
          <option key={city} value={city}>
            {city} ({mockCities[city as keyof typeof mockCities].country})
          </option>
        ))}
      </select>
      {multiple && max && (
        <p className="mt-2 text-sm text-gray-500">
          Select up to {max} cities to compare
        </p>
      )}
    </div>
  );
}