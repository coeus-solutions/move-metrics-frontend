import React, { useState } from 'react';
import { ArrowLeftRight, ArrowRight } from 'lucide-react';
import { CitySelector } from '../components/shared/CitySelector';
import { NumberInput } from '../components/shared/NumberInput';
import { ComparisonResults } from '../components/comparison/ComparisonResults';
import { mockCities } from '../data/mockData';
import type { City } from '../types';

export function CityComparison() {
  const [sourceCity, setSourceCity] = useState('');
  const [targetCity, setTargetCity] = useState('');
  const [familySize, setFamilySize] = useState(1);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Record<string, City> | null>(null);

  const handleCompare = () => {
    if (!sourceCity || !targetCity) return;
    setLoading(true);
    
    setTimeout(() => {
      const sourceCityData = mockCities[sourceCity as keyof typeof mockCities];
      const targetCityData = mockCities[targetCity as keyof typeof mockCities];
      
      const adjustCosts = (city: City): City => {
        const multiplier = Math.log(familySize + 1) / Math.log(2);
        return {
          ...city,
          details: Object.entries(city.details).reduce((acc, [key, value]) => ({
            ...acc,
            [key]: Number((value * multiplier).toFixed(2))
          }), {} as typeof city.details)
        };
      };

      setResults({
        [sourceCity]: adjustCosts(sourceCityData),
        [targetCity]: adjustCosts(targetCityData)
      });
      setLoading(false);
    }, 500);
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-900">Compare Cities</h1>
        <p className="mt-1 text-sm text-gray-500">Compare living costs between two cities</p>
      </header>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-7 gap-6 items-start">
          <div className="md:col-span-3">
            <CitySelector
              label="Source City"
              value={sourceCity}
              onChange={setSourceCity}
              placeholder="Select source city"
            />
          </div>
          
          <div className="hidden md:flex md:col-span-1 justify-center pt-8">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
              <ArrowLeftRight className="h-5 w-5 text-indigo-600" />
            </div>
          </div>

          <div className="md:col-span-3">
            <CitySelector
              label="Target City"
              value={targetCity}
              onChange={setTargetCity}
              placeholder="Select target city"
            />
          </div>

          <div className="md:col-span-7">
            <NumberInput
              label="Family Size"
              value={familySize}
              onChange={setFamilySize}
              min={1}
              max={10}
              helpText="Costs will be adjusted based on family size"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleCompare}
            disabled={!sourceCity || !targetCity || loading}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {loading ? 'Comparing...' : 'Compare Cities'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      </div>

      {results && <ComparisonResults results={results} />}
    </div>
  );
}