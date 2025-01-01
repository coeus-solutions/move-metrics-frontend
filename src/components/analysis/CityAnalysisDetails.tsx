import React from 'react';
import { QualityOfLifeSection } from './QualityOfLifeSection';
import { FamilyConsiderationsSection } from './FamilyConsiderationsSection';
import { EconomicSection } from './EconomicSection';
import { RecommendationsSection } from './RecommendationsSection';
import type { City } from '../../types';

interface CityAnalysisDetailsProps {
  city: City;
  familySize: number;
}

export function CityAnalysisDetails({ city, familySize }: CityAnalysisDetailsProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <QualityOfLifeSection 
          data={city.qualityOfLife} 
          cityName={city.name} 
        />
        <FamilyConsiderationsSection 
          data={city.familyMetrics} 
          familySize={familySize} 
        />
      </div>

      <EconomicSection data={city.economicFactors} />
      
      <RecommendationsSection 
        data={city.recommendations} 
        familySize={familySize} 
      />
    </div>
  );
}