import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Container, Typography, Grid, Paper, CircularProgress } from '@mui/material';
import { getDashboardStats, DashboardStats, PopularCity, Comparison } from '../services/dashboard';

const formatValue = (value: any): string => {
  if (typeof value === 'object' && value !== null) {
    if ('city' in value && 'count' in value) {
      return `${value.city}: ${value.count}`;
    }
    return JSON.stringify(value);
  }
  return String(value);
};

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (err) {
        setError('Failed to load dashboard stats');
        console.error('Dashboard stats error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Extract popular cities from stats
  const popularCities = stats?.popular_cities?.map((city: PopularCity) => city.city) || [];
  // Extract recent comparisons from stats
  const recentComparisons = stats?.recent_comparisons || [];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">View and compare city living costs</p>
      </header>
      
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {loading ? (
          <div className="col-span-3 flex justify-center py-8">
            <CircularProgress />
          </div>
        ) : error ? (
          <div className="col-span-3 text-red-500 text-center py-4">{error}</div>
        ) : (
          stats && Object.entries(stats)
            .filter(([key]) => !['popular_cities', 'recent_comparisons'].includes(key)) // Exclude both arrays from stats display
            .map(([key, value]) => (
              <div key={key} className="bg-white rounded-lg shadow-sm p-4">
                <h3 className="text-sm font-medium text-gray-500">
                  {key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </h3>
                <p className="mt-2 text-2xl font-semibold text-gray-900">{formatValue(value)}</p>
              </div>
            ))
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Popular Cities */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Popular Cities</h2>
          <div className="grid grid-cols-1 gap-4">
            {popularCities.map((cityName: string) => (
              <Link
                key={cityName}
                to={`/analysis/${cityName}`}
                className="flex items-center justify-between p-4 rounded-lg border hover:border-indigo-500 hover:shadow-sm transition-all"
              >
                <h3 className="font-medium text-gray-900">{cityName}</h3>
                <ArrowRight className="h-5 w-5 text-gray-400" />
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Comparisons */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Comparisons</h2>
          <div className="grid grid-cols-1 gap-4">
            {recentComparisons.length > 0 ? (
              recentComparisons.map((comparison: Comparison) => (
                <Link
                  key={comparison.id}
                  to={`/compare?city1=${comparison.cities[0]}&city2=${comparison.cities[1]}&preload=true`}
                  className="flex items-center justify-between p-4 rounded-lg border hover:border-indigo-500 hover:shadow-sm transition-all"
                >
                  <h3 className="font-medium text-gray-900">
                    {comparison.cities[0]} vs {comparison.cities[1]}
                  </h3>
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </Link>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No recent comparisons</p>
            )}
          </div>
        </div>
      </div>

      {/* Compare Cities CTA */}
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
};