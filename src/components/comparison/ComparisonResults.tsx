import React from 'react';
import { ComparisonChart } from './ComparisonChart';
import { ComparisonTable } from './ComparisonTable';
import { QualityComparison } from './QualityComparison';
import type { City } from '../../types';

interface ComparisonResultsProps {
  results: Record<string, City>;
}

export function ComparisonResults({ results }: ComparisonResultsProps) {
  const cities = Object.values(results) as [City, City];
  
  if (!cities[0] || !cities[1]) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-6">Cost Comparison</h2>
        <ComparisonChart cities={cities} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-6">Detailed Comparison</h2>
          <ComparisonTable cities={cities} />
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-6">Quality of Life</h2>
          <QualityComparison cities={cities} />
        </div>
      </div>
    </div>
  );
}