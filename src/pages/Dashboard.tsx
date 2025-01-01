import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { DashboardStats } from '../components/dashboard/DashboardStats';
import { RecentComparisons } from '../components/dashboard/RecentComparisons';
import { mockCities } from '../data/mockData';

export function Dashboard() {
  const popularCities = Object.keys(mockCities).slice(0, 4);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">View and compare city living costs</p>
      </header>
      
      <DashboardStats />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Popular Cities</h2>
          <div className="grid grid-cols-1 gap-4">
            {popularCities.map(cityName => (
              <Link
                key={cityName}
                to={`/city/${cityName}`}
                className="flex items-center justify-between p-4 rounded-lg border hover:border-indigo-500 hover:shadow-sm transition-all"
              >
                <div>
                  <h3 className="font-medium text-gray-900">{cityName}</h3>
                  <p className="text-sm text-gray-500">{mockCities[cityName as keyof typeof mockCities].country}</p>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400" />
              </Link>
            ))}
          </div>
        </div>

        <RecentComparisons />
      </div>

      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-sm p-6 text-white">
        <h2 className="text-xl font-semibold mb-2">Compare Cities</h2>
        <p className="mb-4 text-indigo-100">Get detailed cost comparisons between any two cities</p>
        <Link
          to="/compare"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-indigo-600 bg-white hover:bg-indigo-50"
        >
          Compare Now
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}