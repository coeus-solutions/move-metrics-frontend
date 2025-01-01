import type { QualityOfLife, FamilyMetrics, EconomicFactors, Recommendation } from './analysis';

export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface City {
  name: string;
  country: string;
  costIndex: number;
  details: {
    housing: number;
    groceries: number;
    utilities: number;
    transportation: number;
    healthcare: number;
    education: number;
  };
  qualityOfLife: QualityOfLife;
  familyMetrics: FamilyMetrics;
  economicFactors: EconomicFactors;
  recommendations: Recommendation;
}