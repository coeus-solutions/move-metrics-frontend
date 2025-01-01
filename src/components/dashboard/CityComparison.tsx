import React, { useState } from 'react';
import { compareCity } from '../../services/api';
import { CitySelector } from './CitySelector';
import { ComparisonResults } from './ComparisonResults';
import type { City } from '../../types';

export function CityComparison() {
  const [currentCity, setCurrentCity] = useState('');
  const [potentialCities, setPotentialCities] = useState<string[]>([]);
  const [familySize, setFamilySize] = useState(1);
  const [results, setResults] = useState<Record<string, City> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCompare = async () => {
    if (!currentCity) {
      setError('Please select your current city');
      return;
    }

    if (potentialCities.length === 0) {
      setError('Please select at least one city to compare');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const response = await compareCity(currentCity, potentialCities, familySize);
      setResults(response.results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setResults(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Compare Cities</h2>
      
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
      
      <div className="space-y-4">
        <CitySelector
          label="Current City"
          value={currentCity}
          onChange={setCurrentCity}
        />
        
        <CitySelector
          label="Cities to Compare"
          multiple
          value={potentialCities}
          onChange={setPotentialCities}
        />
        
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Family Size
          </label>
          <input
            type="number"
            min="1"
            value={familySize}
            onChange={(e) => setFamilySize(Math.max(1, Number(e.target.value)))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        
        <button
          onClick={handleCompare}
          disabled={loading || !currentCity || potentialCities.length === 0}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
        >
          {loading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Comparing...
            </span>
          ) : (
            'Compare Cities'
          )}
        </button>
      </div>

      {results && <ComparisonResults results={results} />}
    </div>
  );
}