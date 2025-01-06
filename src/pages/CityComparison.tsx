import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeftRight, ArrowRight } from 'lucide-react';
import { CitySelector } from '../components/shared/CitySelector';
import { NumberInput } from '../components/shared/NumberInput';
import { ComparisonResults } from '../components/comparison/ComparisonResults';
import { costAnalysisService } from '../services/costAnalysis';
import type { ComprehensiveComparison } from '../services/costAnalysis';

export function CityComparison() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [sourceCity, setSourceCity] = useState(searchParams.get('city1') || '');
  const [targetCity, setTargetCity] = useState(searchParams.get('city2') || '');
  const [familySize, setFamilySize] = useState(1);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<ComprehensiveComparison | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Auto-compare if both cities are provided in URL
    if (sourceCity && targetCity && searchParams.get('preload') === 'true') {
      handleCompare();
      // Remove the preload parameter after triggering comparison
      navigate(`/compare?city1=${sourceCity}&city2=${targetCity}`, { replace: true });
    }
  }, [sourceCity, targetCity]);

  const handleCompare = async () => {
    if (!sourceCity || !targetCity) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const comparisonResults = await costAnalysisService.compareComprehensive(
        sourceCity,
        targetCity,
        familySize
      );
      setResults(comparisonResults);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to compare cities');
      setResults(null);
    } finally {
      setLoading(false);
    }
  };

  const handleCitySelect = (city: string, isSource: boolean) => {
    if (isSource) {
      setSourceCity(city);
    } else {
      setTargetCity(city);
    }
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
              key={`source-${sourceCity}`}
              label="Source City"
              value={sourceCity}
              onChange={(city) => handleCitySelect(city, true)}
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
              key={`target-${targetCity}`}
              label="Target City"
              value={targetCity}
              onChange={(city) => handleCitySelect(city, false)}
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

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {error}
        </div>
      )}

      {results && <ComparisonResults results={results} />}
    </div>
  );
}