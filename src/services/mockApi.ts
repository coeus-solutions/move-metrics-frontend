import { mockCities } from '../data/mockData';
import type { City } from '../types';

export async function mockCompareCity(
  currentCity: string,
  potentialCities: string[],
  familySize: number
): Promise<{ results: Record<string, City> }> {
  // Validate inputs
  if (!currentCity || !potentialCities.length || familySize < 1) {
    throw new Error('Invalid comparison parameters');
  }

  // Check if current city exists
  if (!mockCities[currentCity as keyof typeof mockCities]) {
    throw new Error(`City "${currentCity}" not found`);
  }

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  const results: Record<string, City> = {
    [currentCity]: { ...mockCities[currentCity as keyof typeof mockCities] }
  };

  // Add comparison cities
  potentialCities.forEach(city => {
    if (mockCities[city as keyof typeof mockCities]) {
      results[city] = { ...mockCities[city as keyof typeof mockCities] };
    } else {
      throw new Error(`City "${city}" not found`);
    }
  });

  // Adjust costs based on family size
  Object.values(results).forEach(city => {
    const multiplier = Math.log(familySize + 1) / Math.log(2); // Logarithmic scaling
    Object.entries(city.details).forEach(([key, value]) => {
      city.details[key as keyof typeof city.details] = Number((value * multiplier).toFixed(2));
    });
  });

  return { results };
}