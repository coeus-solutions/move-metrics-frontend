import React from 'react';
import { TrendingUp, Building2, LineChart, DollarSign } from 'lucide-react';
import type { EconomicFactors } from '../../types/analysis';

interface EconomicSectionProps {
  data: EconomicFactors;
}

export function EconomicSection({ data }: EconomicSectionProps) {
  const metrics = [
    { name: 'Job Market', value: data.jobMarket, icon: Building2 },
    { name: 'Industry Growth', value: data.industryGrowth, icon: TrendingUp },
    { name: 'Economic Growth', value: data.economicGrowth, icon: LineChart },
    { name: 'Average Salary', raw: data.averageSalary, icon: DollarSign },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Economic Factors</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {metrics.map(({ name, value, raw, icon: Icon }) => (
          <div key={name} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center mb-2">
              <Icon className="h-5 w-5 text-indigo-600 mr-2" />
              <span className="font-medium text-gray-900">{name}</span>
            </div>
            {raw ? (
              <span className="text-2xl font-bold text-gray-900">
                ${raw.toLocaleString()}
              </span>
            ) : (
              <div className="flex items-center">
                <div className="flex-1 h-2 bg-gray-200 rounded-full mr-2">
                  <div 
                    className="h-full bg-indigo-600 rounded-full"
                    style={{ width: `${value}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600">{value}%</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}