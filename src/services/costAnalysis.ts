import axios from 'axios';
import { authService } from './auth';
import { API_BASE_URL } from '../config/api';

type CostRating = 'expensive' | 'moderate' | 'affordable';

export interface CostAnalysis {
  summary: string;
  monthly_costs: {
    housing: number;
    food: number;
    transportation: number;
    utilities: number;
    healthcare: number;
    entertainment: number;
    other: number;
  };
  annual_total: number;
  cost_ratings: {
    overall: CostRating;
    housing: CostRating;
    daily_life: CostRating;
  };
  cost_insights: string[];
}

interface ApiResponse {
  analysis: CostAnalysis;
}

interface CityOverallComparison {
  total_monthly_cost: number;
  cost_rating: CostRating;
  daily_life_rating: CostRating;
}

interface CityFactorDetail {
  monthly_cost: number;
  rating: CostRating;
}

interface FactorComparison {
  [cityName: string]: CityFactorDetail | number | string;
  difference: number;
  cheaper_city: string;
}

interface FamilyAdjustedCosts {
  housing: number;
  food: number;
  transportation: number;
  healthcare: number;
  utilities: number;
  education: number;
  entertainment: number;
  other: number;
}

interface ComparisonSummary {
  better_value_city: string;
  significant_differences: string[];
  monthly_savings: number;
  yearly_savings: number;
}

export interface ComprehensiveComparison {
  overall_comparison: {
    [cityName: string]: CityOverallComparison;
  };
  factor_comparison: {
    [factor: string]: FactorComparison;
  };
  family_adjusted_costs: {
    [cityName: string]: FamilyAdjustedCosts;
  };
  insights: {
    [cityName: string]: string[];
  };
  summary: ComparisonSummary;
}

export const costAnalysisService = {
  async getCostAnalysis(cityName: string): Promise<CostAnalysis> {
    if (!authService.isAuthenticated()) {
      throw new Error('Authentication required');
    }

    const token = localStorage.getItem('auth_token');
    const response = await axios.get<ApiResponse>(
      `${API_BASE_URL}/compare/cost-analysis/${encodeURIComponent(cityName)}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data.analysis;
  },

  async compareComprehensive(sourceCity: string, targetCity: string, familySize: number): Promise<ComprehensiveComparison> {
    if (!authService.isAuthenticated()) {
      throw new Error('Authentication required');
    }

    const token = localStorage.getItem('auth_token');
    const response = await axios.post<ComprehensiveComparison>(
      `${API_BASE_URL}/compare/compare-comprehensive`,
      {
        city1: sourceCity,
        city2: targetCity,
        family_size: familySize
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  }
}; 