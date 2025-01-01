import React from 'react';
import { CheckCircle, XCircle, DollarSign, Home, TrendingUp } from 'lucide-react';
import type { Recommendation } from '../../types/analysis';

interface RecommendationsSectionProps {
  data: Recommendation;
  familySize: number;
}

export function RecommendationsSection({ data, familySize }: RecommendationsSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
      
      <div className="space-y-6">
        <div>
          <h4 className="flex items-center text-sm font-medium text-gray-900 mb-2">
            <Home className="h-4 w-4 mr-2" />
            Recommended Neighborhood
          </h4>
          <p className="text-gray-600">{data.neighborhood}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="flex items-center text-sm font-medium text-gray-900 mb-2">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              Pros
            </h4>
            <ul className="space-y-2">
              {data.pros.map((pro, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  {pro}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="flex items-center text-sm font-medium text-gray-900 mb-2">
              <XCircle className="h-4 w-4 text-red-500 mr-2" />
              Cons
            </h4>
            <ul className="space-y-2">
              {data.cons.map((con, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  {con}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h4 className="flex items-center text-sm font-medium text-gray-900 mb-2">
            <DollarSign className="h-4 w-4 mr-2" />
            Monthly Budget (Family of {familySize})
          </h4>
          <div className="space-y-2">
            {data.monthlyCosts.map(({ category, amount }) => (
              <div key={category} className="flex justify-between text-sm">
                <span className="text-gray-600">{category}</span>
                <span className="font-medium">${amount.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="flex items-center text-sm font-medium text-gray-900 mb-2">
            <TrendingUp className="h-4 w-4 mr-2" />
            Potential Yearly Savings
          </h4>
          <p className="text-2xl font-bold text-green-600">
            ${data.yearlySavings.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}