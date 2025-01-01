import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2 } from 'lucide-react';
import { SearchBar } from '../components/cities/SearchBar';
import { mockCities } from '../data/mockData';

export function Cities() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCities = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return Object.entries(mockCities).filter(([cityName, city]) => 
      cityName.toLowerCase().includes(query) || 
      city.country.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-900">Cities</h1>
        <p className="mt-1 text-sm text-gray-500">Explore detailed information about cities worldwide</p>
      </header>

      <div className="bg-white rounded-lg shadow-sm p-4">
        <SearchBar 
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by city or country..."
        />
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
              to={`/city/${cityName}`}
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