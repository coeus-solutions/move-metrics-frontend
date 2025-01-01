import React from 'react';
import type { City } from '../../types';

interface CostRangesProps {
  city: City;
}

export function CostRanges({ city }: CostRangesProps) {
  const ranges = Object.entries(city.details).map(([category, value]) => ({
    category: category.charAt(0).toUpperCase() + category.slice(1),
    low: value * 0.8,
    average: value,
    high: value * 1.2
  }));

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Cost Ranges</h3>
      <div className="space-y-4">
        {ranges.map(({ category, low, average, high }) => (
          <div key={category}>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>{category}</span>
              <span className="font-medium">${average.toLocaleString()}</span>
            </div>
            <div className="relative pt-1">
              <div className="flex h-2 mb-4">
                <div className="w-1/3 bg-green-200 rounded-l"></div>
                <div className="w-1/3 bg-yellow-200"></div>
                <div className="w-1/3 bg-red-200 rounded-r"></div>
              </div>
              <div className="flex text-xs justify-between text-gray-500">
                <span>${low.toLocaleString()}</span>
                <span>${average.toLocaleString()}</span>
                <span>${high.toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}