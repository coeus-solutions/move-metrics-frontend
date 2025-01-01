import type { City } from '../types';
import type { QualityOfLife, FamilyMetrics, EconomicFactors, Recommendation } from '../types/analysis';

const defaultQualityOfLife: QualityOfLife = {
  safety: 85,
  healthcare: 82,
  education: 88,
  environment: 75,
  culture: 90
};

const defaultFamilyMetrics: FamilyMetrics = {
  schoolQuality: 85,
  familyFriendly: 80,
  healthcareFacilities: 75,
  recreation: 85,
  community: 88
};

const defaultEconomicFactors: EconomicFactors = {
  jobMarket: 82,
  industryGrowth: 75,
  economicGrowth: 78,
  averageSalary: 85000
};

const defaultRecommendation: Recommendation = {
  neighborhood: "Upper East Side",
  pros: [
    "Excellent public transportation",
    "Top-rated schools nearby",
    "Abundant cultural attractions",
    "Safe neighborhood"
  ],
  cons: [
    "High cost of living",
    "Crowded during peak hours",
    "Limited parking options"
  ],
  monthlyCosts: [
    { category: "Housing", amount: 3500 },
    { category: "Utilities", amount: 200 },
    { category: "Transportation", amount: 150 },
    { category: "Food", amount: 800 },
    { category: "Healthcare", amount: 400 },
    { category: "Entertainment", amount: 300 }
  ],
  yearlySavings: 25000
};

export const mockCities: Record<string, City> = {
  'New York': {
    name: 'New York',
    country: 'USA',
    costIndex: 100,
    details: {
      housing: 100,
      groceries: 100,
      utilities: 100,
      transportation: 100,
      healthcare: 100,
      education: 100
    },
    qualityOfLife: {
      ...defaultQualityOfLife,
      safety: 75,
      culture: 95
    },
    familyMetrics: defaultFamilyMetrics,
    economicFactors: {
      ...defaultEconomicFactors,
      averageSalary: 95000
    },
    recommendations: {
      ...defaultRecommendation,
      neighborhood: "Upper West Side"
    }
  },
  'London': {
    name: 'London',
    country: 'UK',
    costIndex: 85,
    details: {
      housing: 82,
      groceries: 78,
      utilities: 85,
      transportation: 86,
      healthcare: 89,
      education: 90
    },
    qualityOfLife: {
      ...defaultQualityOfLife,
      safety: 80,
      culture: 92
    },
    familyMetrics: {
      ...defaultFamilyMetrics,
      recreation: 88
    },
    economicFactors: {
      ...defaultEconomicFactors,
      averageSalary: 75000
    },
    recommendations: {
      ...defaultRecommendation,
      neighborhood: "Richmond"
    }
  }
};