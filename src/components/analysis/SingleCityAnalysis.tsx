import React from 'react';
import { CostBreakdown } from './CostBreakdown';
import { QualityIndicators } from './QualityIndicators';
import { CostRanges } from './CostRanges';
import { CurrencyConverter } from './CurrencyConverter';
import type { City } from '../../types';

interface SingleCityAnalysisProps {
  city: City;
}

export function SingleCityAnalysis({ city }: SingleCityAnalysisProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CostBreakdown city={city} />
        <CostRanges city={city} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <QualityIndicators city={city} />
        <CurrencyConverter city={city} />
      </div>
    </div>
  );
}