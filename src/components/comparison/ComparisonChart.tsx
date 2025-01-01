import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { City } from '../../types';

interface ComparisonChartProps {
  cities: [City, City];
}

const COLORS = {
  primary: '#4F46E5',
  secondary: '#10B981',
  grid: '#E5E7EB',
  text: '#374151'
};

export function ComparisonChart({ cities }: ComparisonChartProps) {
  const [city1, city2] = cities;
  
  if (!city1?.details || !city2?.details) {
    return null;
  }

  const data = Object.entries(city1.details).map(([category, value]) => ({
    category: category.charAt(0).toUpperCase() + category.slice(1),
    [city1.name]: value,
    [city2.name]: city2.details[category as keyof typeof city2.details],
  }));

  return (
    <div className="h-96">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grid} />
          <XAxis
            dataKey="category"
            tick={{ fill: COLORS.text }}
            tickLine={{ stroke: COLORS.grid }}
          />
          <YAxis
            tick={{ fill: COLORS.text }}
            tickLine={{ stroke: COLORS.grid }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: `1px solid ${COLORS.grid}`,
              borderRadius: '6px'
            }}
          />
          <Legend />
          <Bar
            dataKey={city1.name}
            fill={COLORS.primary}
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey={city2.name}
            fill={COLORS.secondary}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}