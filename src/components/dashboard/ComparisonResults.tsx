import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { City } from '../../types';

interface ComparisonResultsProps {
  results: Record<string, City>;
}

export function ComparisonResults({ results }: ComparisonResultsProps) {
  const cities = Object.values(results);
  
  const chartData = cities.map(city => ({
    name: city.name,
    housing: city.details.housing,
    groceries: city.details.groceries,
    utilities: city.details.utilities,
    transportation: city.details.transportation,
    healthcare: city.details.healthcare,
    education: city.details.education,
  }));

  return (
    <div className="mt-8 space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Comparison Results</h3>
      
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="housing" fill="#4F46E5" name="Housing" />
            <Bar dataKey="groceries" fill="#10B981" name="Groceries" />
            <Bar dataKey="utilities" fill="#F59E0B" name="Utilities" />
            <Bar dataKey="transportation" fill="#EF4444" name="Transportation" />
            <Bar dataKey="healthcare" fill="#6366F1" name="Healthcare" />
            <Bar dataKey="education" fill="#8B5CF6" name="Education" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cities.map(city => (
          <div key={city.name} className="p-4 border rounded-lg">
            <h4 className="font-medium text-gray-900">{city.name}</h4>
            <p className="text-sm text-gray-500">{city.country}</p>
            <div className="mt-2">
              <p className="text-sm">Cost Index: {city.costIndex}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}