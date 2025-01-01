import React from 'react';
import type { ComparisonResult } from '../../types/cities';

export function RecentComparisons() {
  // In a real app, this would be fetched from an API
  const recentComparisons: ComparisonResult[] = [];

  if (recentComparisons.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Comparisons</h2>
        <p className="text-gray-500">No recent comparisons found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Comparisons</h2>
      <div className="space-y-4">
        {recentComparisons.map((comparison) => (
          <div key={comparison.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-900">
                  {comparison.currentCity} → {comparison.potentialCities.join(', ')}
                </h3>
                <p className="text-sm text-gray-500">
                  Family size: {comparison.familySize}
                </p>
              </div>
              <span className="text-sm text-gray-500">
                {new Date(comparison.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}