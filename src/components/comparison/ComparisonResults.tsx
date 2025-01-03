import React from 'react';
import { ArrowUpIcon, ArrowDownIcon, TrendingDown, TrendingUp, DollarSign } from 'lucide-react';
import type { ComprehensiveComparison } from '../../services/costAnalysis';

interface ComparisonResultsProps {
  results: ComprehensiveComparison;
}

export function ComparisonResults({ results }: ComparisonResultsProps) {
  const cityNames = Object.keys(results.overall_comparison);
  const [city1, city2] = cityNames;

  return (
    <div className="space-y-6">
      {/* Overall Summary */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-6">Overall Comparison</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {cityNames.map(city => {
            const data = results.overall_comparison[city];
            return (
              <div key={city} className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900">{city}</h3>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Monthly Cost</span>
                    <span className="font-medium">${data.total_monthly_cost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Cost Rating</span>
                    <span className={`capitalize ${data.cost_rating === 'expensive' ? 'text-red-600' : data.cost_rating === 'affordable' ? 'text-green-600' : 'text-yellow-600'}`}>
                      {data.cost_rating}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Daily Life</span>
                    <span className={`capitalize ${data.daily_life_rating === 'expensive' ? 'text-red-600' : data.daily_life_rating === 'affordable' ? 'text-green-600' : 'text-yellow-600'}`}>
                      {data.daily_life_rating}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Factor Comparison */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-6">Cost Breakdown</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                {cityNames.map(city => (
                  <th key={city} className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {city}
                  </th>
                ))}
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Difference</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {Object.entries(results.factor_comparison).map(([factor, data]) => (
                <tr key={factor}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 capitalize">
                    {factor}
                  </td>
                  {cityNames.map(city => {
                    const cityData = data[city] as { monthly_cost: number; rating: string };
                    return (
                      <td key={city} className="px-6 py-4 whitespace-nowrap text-sm text-right">
                        <div className="text-gray-900">${cityData.monthly_cost.toLocaleString()}</div>
                        <div className={`text-xs ${cityData.rating === 'expensive' ? 'text-red-600' : cityData.rating === 'affordable' ? 'text-green-600' : 'text-yellow-600'}`}>
                          {cityData.rating}
                        </div>
                      </td>
                    );
                  })}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                    <div className="flex items-center justify-end space-x-1">
                      {data.cheaper_city === city1 ? (
                        <TrendingDown className="h-4 w-4 text-green-600" />
                      ) : (
                        <TrendingUp className="h-4 w-4 text-red-600" />
                      )}
                      <span className={data.cheaper_city === city1 ? 'text-green-600' : 'text-red-600'}>
                        ${data.difference.toLocaleString()}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary and Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-6">Summary</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Better Value City</span>
              <span className="font-medium text-green-600">{results.summary.better_value_city}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Monthly Savings</span>
              <span className="font-medium text-green-600">${results.summary.monthly_savings.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Yearly Savings</span>
              <span className="font-medium text-green-600">${results.summary.yearly_savings.toLocaleString()}</span>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Significant Differences</h3>
              <ul className="space-y-2">
                {results.summary.significant_differences.map((diff, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-center">
                    <DollarSign className="h-4 w-4 mr-2 text-gray-400" />
                    {diff}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-6">City Insights</h2>
          <div className="space-y-6">
            {Object.entries(results.insights).map(([city, insights]) => (
              <div key={city}>
                <h3 className="text-md font-medium text-gray-900 mb-2">{city}</h3>
                <ul className="space-y-2">
                  {insights.map((insight, index) => (
                    <li key={index} className="text-sm text-gray-600">{insight}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}