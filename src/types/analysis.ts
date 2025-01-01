export interface QualityOfLife {
  safety: number;
  healthcare: number;
  education: number;
  environment: number;
  culture: number;
}

export interface FamilyMetrics {
  schoolQuality: number;
  familyFriendly: number;
  healthcareFacilities: number;
  recreation: number;
  community: number;
}

export interface EconomicFactors {
  jobMarket: number;
  industryGrowth: number;
  economicGrowth: number;
  averageSalary: number;
}

export interface Recommendation {
  neighborhood: string;
  pros: string[];
  cons: string[];
  monthlyCosts: {
    category: string;
    amount: number;
  }[];
  yearlySavings: number;
}