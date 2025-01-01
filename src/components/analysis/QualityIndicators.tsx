import React from 'react';
import { Shield, Heart, GraduationCap } from 'lucide-react';
import type { City } from '../../types';

interface QualityIndicatorsProps {
  city: City;
}

export function QualityIndicators({ city }: QualityIndicatorsProps) {
  const indicators = [
    { name: 'Safety', value: 85, icon: Shield },
    { name: 'Healthcare', value: city.details.healthcare, icon: Heart },
    { name: 'Education', value: city.details.education, icon: GraduationCap }
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Quality of Life</h3>
      <div className="space-y-4">
        {indicators.map(({ name, value, icon: Icon }) => (
          <div key={name} className="flex items-center">
            <Icon className="h-5 w-5 text-gray-400" />
            <div className="ml-3 flex-1">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>{name}</span>
                <span>{value}/100</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 rounded-full bg-indigo-600"
                  style={{ width: `${value}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}