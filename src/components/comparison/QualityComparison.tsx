import React from 'react';
import { Shield, Heart, GraduationCap } from 'lucide-react';
import type { City } from '../../types';

interface QualityComparisonProps {
  cities: [City, City];
}

export function QualityComparison({ cities }: QualityComparisonProps) {
  const [city1, city2] = cities;
  
  if (!city1?.details || !city2?.details) {
    return null;
  }

  const indicators = [
    { name: 'Safety', icon: Shield, value1: 85, value2: 80 },
    { name: 'Healthcare', icon: Heart, value1: city1.details.healthcare, value2: city2.details.healthcare },
    { name: 'Education', icon: GraduationCap, value1: city1.details.education, value2: city2.details.education }
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
                <span>{city1.name}</span>
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
                <span>{city2.name}</span>
                <span>{value2}/100</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}