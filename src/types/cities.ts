export interface CityDetails {
  housing: number;
  groceries: number;
  utilities: number;
  transportation: number;
  healthcare: number;
  education: number;
}

export interface City {
  name: string;
  country: string;
  costIndex: number;
  details: CityDetails;
}

export interface ComparisonResult {
  id: string;
  currentCity: string;
  potentialCities: string[];
  familySize: number;
  results: Record<string, City>;
  created_at: string;
}