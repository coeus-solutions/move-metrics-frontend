import React from 'react';
import { Shield, Heart, GraduationCap, Leaf, Music } from 'lucide-react';
import type { QualityOfLife } from '../../types/analysis';

interface QualityOfLifeSectionProps {
  data: QualityOfLife;
  cityName: string;
}

export function QualityOfLifeSection({ data, cityName }: QualityOfLifeSectionProps) {
  const metrics = [
    { name: 'Safety', value: data.safety, icon: Shield },
    { name: 'Healthcare', value: data.healthcare, icon: Heart },
    { name: 'Education', value: data.education, icon: GraduationCap },
    { name: 'Environment', value: data.environment, icon: Leaf },
    { name: 'Culture', value: data.culture, icon: Music },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quality of Life in {cityName}</h3>
      <div className="space-y-4">
        {metrics.map(({ name, value, icon: Icon }) => (
          <div key={name} className="flex items-center">
            <Icon className="h-5 w-5 text-gray-400 mr-3" />
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">{name}</span>
                <span className="font-medium">{value}/100</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-600 rounded-full"
                  style={{ width: `${value}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}