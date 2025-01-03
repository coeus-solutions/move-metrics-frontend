import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { CostAnalysis } from '../../services/costAnalysis';

interface ComparisonChartProps {
  cityNames: [string, string];
  analyses: [CostAnalysis, CostAnalysis];
}

const COLORS = {
  primary: '#4F46E5',
  secondary: '#10B981',
  grid: '#E5E7EB',
  text: '#374151'
};

export function ComparisonChart({ cityNames, analyses }: ComparisonChartProps) {
  const [city1Name, city2Name] = cityNames;
  const [city1Data, city2Data] = analyses;
  
  if (!city1Data?.monthly_costs || !city2Data?.monthly_costs) {
    return null;
  }

  const data = Object.entries(city1Data.monthly_costs).map(([category, value]) => ({
    category: category.charAt(0).toUpperCase() + category.slice(1),
    [city1Name]: value,
    [city2Name]: city2Data.monthly_costs[category as keyof typeof city2Data.monthly_costs],
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
            dataKey={city1Name}
            fill={COLORS.primary}
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey={city2Name}
            fill={COLORS.secondary}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}