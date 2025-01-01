import React from 'react';
import { mockCities } from '../../data/mockData';

interface CitySelectorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function CitySelector({ label, value, onChange, placeholder }: CitySelectorProps) {
  const cities = Object.keys(mockCities).sort();

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      >
        <option value="">{placeholder || 'Select a city'}</option>
        {cities.map(city => (
          <option key={city} value={city}>
            {city} ({mockCities[city as keyof typeof mockCities].country})
          </option>
        ))}
      </select>
    </div>
  );
}