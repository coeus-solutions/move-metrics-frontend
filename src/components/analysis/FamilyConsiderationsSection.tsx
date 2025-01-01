import React from 'react';
import { School, Home, Building2, Palmtree, Users } from 'lucide-react';
import type { FamilyMetrics } from '../../types/analysis';

interface FamilyConsiderationsSectionProps {
  data: FamilyMetrics;
  familySize: number;
}

export function FamilyConsiderationsSection({ data, familySize }: FamilyConsiderationsSectionProps) {
  const metrics = [
    { name: 'School Quality', value: data.schoolQuality, icon: School },
    { name: 'Family-Friendly Areas', value: data.familyFriendly, icon: Home },
    { name: 'Healthcare Facilities', value: data.healthcareFacilities, icon: Building2 },
    { name: 'Recreation', value: data.recreation, icon: Palmtree },
    { name: 'Community', value: data.community, icon: Users },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Family Considerations</h3>
        <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
          Family of {familySize}
        </span>
      </div>
      
      <div className="grid gap-4">
        {metrics.map(({ name, value, icon: Icon }) => (
          <div key={name} className="flex items-center p-3 bg-gray-50 rounded-lg">
            <Icon className="h-5 w-5 text-indigo-600 mr-3" />
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-900">{name}</span>
                <span className="text-sm text-gray-500">{value}/100</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}