import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { City } from '../../types';

interface CostBreakdownProps {
  city: City;
}

export function CostBreakdown({ city }: CostBreakdownProps) {
  const data = Object.entries(city.details).map(([category, value]) => ({
    category: category.charAt(0).toUpperCase() + category.slice(1),
    value
  }));

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Cost Breakdown</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#4F46E5" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 space-y-2">
        {data.map(({ category, value }) => (
          <div key={category} className="flex justify-between text-sm">
            <span className="text-gray-600">{category}</span>
            <span className="font-medium">${value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}