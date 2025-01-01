import React from 'react';
import { Search } from 'lucide-react';
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
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="block w-full pl-10 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="">{placeholder || 'Select a city'}</option>
          {cities.map(city => (
            <option key={city} value={city}>
              {city} ({mockCities[city as keyof typeof mockCities].country})
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}