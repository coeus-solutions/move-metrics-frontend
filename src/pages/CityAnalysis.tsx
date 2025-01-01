import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { SingleCityAnalysis } from '../components/analysis/SingleCityAnalysis';
import { CityAnalysisDetails } from '../components/analysis/CityAnalysisDetails';
import { NumberInput } from '../components/shared/NumberInput';
import { mockCities } from '../data/mockData';

export function CityAnalysis() {
  const { cityName } = useParams();
  const [familySize, setFamilySize] = useState(1);
  const city = mockCities[cityName as keyof typeof mockCities];

  if (!city) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">City not found</h2>
        <p className="mt-2 text-gray-500">The requested city could not be found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{city.name}</h1>
          <p className="mt-1 text-sm text-gray-500">{city.country}</p>
        </div>
        <div className="w-48">
          <NumberInput
            label="Family Size"
            value={familySize}
            onChange={setFamilySize}
            min={1}
            max={10}
          />
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6">
        <SingleCityAnalysis city={city} />
        <CityAnalysisDetails city={city} familySize={familySize} />
      </div>
    </div>
  );
}