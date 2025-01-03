import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Building2, Calculator, Loader2 } from 'lucide-react';
import { CitySelector } from '../components/shared/CitySelector';
import { mockCities } from '../data/mockData';
import { costAnalysisService } from '../services/costAnalysis';

export function Cities() {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filteredCities = useMemo(() => {
    if (!selectedCity) return Object.entries(mockCities);
    return Object.entries(mockCities).filter(([cityName]) => 
      cityName.toLowerCase() === selectedCity.toLowerCase()
    );
  }, [selectedCity]);

  const handleComputeCost = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!selectedCity) return;

    try {
      setIsLoading(true);
      setError(null);
      await costAnalysisService.getCostAnalysis(selectedCity);
      navigate(`/analysis/${selectedCity}`);
    } catch (error: any) {
      console.error('Failed to compute cost analysis:', error);
      if (error.message === 'Authentication required') {
        navigate('/login', { state: { from: `/cities` } });
      } else {
        setError(error.response?.data?.detail || 'Failed to compute cost analysis. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-900">Cities</h1>
        <p className="mt-1 text-sm text-gray-500">Explore detailed information about cities worldwide</p>
      </header>

      <div className="bg-white rounded-lg shadow-sm p-4">
        <CitySelector 
          label="Search Cities"
          value={selectedCity}
          onChange={setSelectedCity}
          placeholder="Search for a city..."
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      <div className="flex justify-center">
        <Link
          to={selectedCity ? `/analysis/${selectedCity}` : '#'}
          onClick={handleComputeCost}
          className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white 
            ${selectedCity && !isLoading
              ? 'bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500' 
              : 'bg-gray-400 cursor-not-allowed'} 
            focus:outline-none`}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Computing...
            </>
          ) : (
            <>
              <Calculator className="h-5 w-5 mr-2" />
              Compute Living Cost
            </>
          )}
        </Link>
      </div>

      {filteredCities.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <Building2 className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No cities found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search terms
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCities.map(([cityName, city]) => (
            <Link
              key={cityName}
              to={`/analysis/${cityName}`}
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">{cityName}</h2>
                  <p className="text-sm text-gray-500">{city.country}</p>
                </div>
                <Building2 className="h-5 w-5 text-gray-400" />
              </div>
              
              <div className="mt-4">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Cost Index:</span> {city.costIndex}
                </div>
                <div className="mt-2 flex items-center text-sm text-indigo-600">
                  View Details
                  <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}