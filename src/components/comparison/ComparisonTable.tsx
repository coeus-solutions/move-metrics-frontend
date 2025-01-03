import React from 'react';
import { ArrowUpIcon, ArrowDownIcon, MinusIcon } from 'lucide-react';
import type { CostAnalysis } from '../../services/costAnalysis';

interface ComparisonTableProps {
  cityNames: [string, string];
  analyses: [CostAnalysis, CostAnalysis];
}

export function ComparisonTable({ cityNames, analyses }: ComparisonTableProps) {
  const [city1Name, city2Name] = cityNames;
  const [city1Data, city2Data] = analyses;
  
  if (!city1Data?.monthly_costs || !city2Data?.monthly_costs) {
    return null;
  }

  const categories = Object.keys(city1Data.monthly_costs);

  const getPercentageDiff = (val1: number, val2: number) => {
    const diff = ((val2 - val1) / val1) * 100;
    return diff.toFixed(1);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              {city1Name}
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              {city2Name}
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Difference
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {categories.map(category => {
            const val1 = city1Data.monthly_costs[category as keyof typeof city1Data.monthly_costs];
            const val2 = city2Data.monthly_costs[category as keyof typeof city2Data.monthly_costs];
            const diff = Number(getPercentageDiff(val1, val2));

            return (
              <tr key={category}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500">
                  ${val1.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500">
                  ${val2.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                  <span className={`inline-flex items-center ${
                    diff > 0 ? 'text-red-600' : diff < 0 ? 'text-green-600' : 'text-gray-600'
                  }`}>
                    {diff > 0 ? <ArrowUpIcon className="h-4 w-4 mr-1" /> :
                     diff < 0 ? <ArrowDownIcon className="h-4 w-4 mr-1" /> :
                     <MinusIcon className="h-4 w-4 mr-1" />}
                    {Math.abs(diff)}%
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}