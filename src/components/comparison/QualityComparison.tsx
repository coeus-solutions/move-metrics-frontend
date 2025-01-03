import React from 'react';
import { Shield, Heart, GraduationCap } from 'lucide-react';
import type { CostAnalysis } from '../../services/costAnalysis';

interface QualityComparisonProps {
  cityNames: [string, string];
  analyses: [CostAnalysis, CostAnalysis];
}

export function QualityComparison({ cityNames, analyses }: QualityComparisonProps) {
  const [city1Name, city2Name] = cityNames;
  const [city1Data, city2Data] = analyses;
  
  if (!city1Data?.cost_ratings || !city2Data?.cost_ratings) {
    return null;
  }

  const getRatingScore = (rating: 'expensive' | 'moderate' | 'affordable'): number => {
    switch (rating) {
      case 'affordable': return 85;
      case 'moderate': return 65;
      case 'expensive': return 45;
      default: return 50;
    }
  };

  const indicators = [
    {
      name: 'Overall Cost',
      icon: Shield,
      value1: getRatingScore(city1Data.cost_ratings.overall),
      value2: getRatingScore(city2Data.cost_ratings.overall)
    },
    {
      name: 'Housing',
      icon: Heart,
      value1: getRatingScore(city1Data.cost_ratings.housing),
      value2: getRatingScore(city2Data.cost_ratings.housing)
    },
    {
      name: 'Daily Life',
      icon: GraduationCap,
      value1: getRatingScore(city1Data.cost_ratings.daily_life),
      value2: getRatingScore(city2Data.cost_ratings.daily_life)
    }
  ];

  return (
    <div className="space-y-6">
      {indicators.map(({ name, icon: Icon, value1, value2 }) => (
        <div key={name} className="space-y-2">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center">
              <Icon className="h-5 w-5 text-gray-400 mr-2" />
              <span>{name}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 rounded-full bg-indigo-600"
                  style={{ width: `${value1}%` }}
                />
              </div>
              <div className="mt-1 flex justify-between text-xs text-gray-500">
                <span>{city1Name}</span>
                <span>{value1}/100</span>
              </div>
            </div>
            <div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 rounded-full bg-green-600"
                  style={{ width: `${value2}%` }}
                />
              </div>
              <div className="mt-1 flex justify-between text-xs text-gray-500">
                <span>{city2Name}</span>
                <span>{value2}/100</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}