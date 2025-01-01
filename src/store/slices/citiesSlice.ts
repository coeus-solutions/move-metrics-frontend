import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface City {
  id: string;
  city: string;
  country: string;
  population: number;
  timezone: string;
  cost_index: number;
  housing_cost: number;
  groceries_cost: number;
  utilities_cost: number;
  transportation_cost: number;
  healthcare_cost: number;
  education_cost: number;
  quality_of_life_score: number;
  family_friendliness_score: number;
  job_market_score: number;
  safety_score: number;
  healthcare_quality: number;
  education_quality: number;
  environmental_quality: number;
  economy_score: number;
  leisure_score: number;
}

interface CitiesState {
  items: City[];
  loading: boolean;
  error: string | null;
  lastFetched: number | null;
}

const initialState: CitiesState = {
  items: [],
  loading: false,
  error: null,
  lastFetched: null,
};

// Fetch cities with 5 minute cache
export const fetchCities = createAsyncThunk(
  'cities/fetchCities',
  async (_, { getState }) => {
    const state = getState() as { cities: CitiesState };
    const now = Date.now();
    const fiveMinutes = 5 * 60 * 1000;

    // Return cached data if it's less than 5 minutes old
    if (state.cities.lastFetched && now - state.cities.lastFetched < fiveMinutes) {
      return null;
    }

    const response = await fetch('http://localhost:8000/cities');
    if (!response.ok) {
      throw new Error('Failed to fetch cities');
    }
    return await response.json();
  },
  {
    condition: (_, { getState }) => {
      const { cities } = getState() as { cities: CitiesState };
      return !cities.loading;
    },
  }
);

const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCities.fulfilled, (state, action: PayloadAction<City[] | null>) => {
        state.loading = false;
        if (action.payload) {
          state.items = action.payload;
          state.lastFetched = Date.now();
        }
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch cities';
      });
  },
});

// Selectors
export const selectAllCities = (state: { cities: CitiesState }) => state.cities.items;
export const selectCitiesLoading = (state: { cities: CitiesState }) => state.cities.loading;
export const selectCitiesError = (state: { cities: CitiesState }) => state.cities.error;

// Search cities utility function
export const searchCities = (cities: City[], searchTerm: string, page: number = 1, pageSize: number = 20) => {
  const lowercaseSearch = searchTerm.toLowerCase().trim();
  
  const filteredCities = lowercaseSearch
    ? cities.filter(
        city =>
          city.city.toLowerCase().includes(lowercaseSearch) ||
          city.country.toLowerCase().includes(lowercaseSearch)
      )
    : cities;

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedCities = filteredCities.slice(startIndex, endIndex);

  return {
    cities: paginatedCities,
    total: filteredCities.length,
    hasMore: endIndex < filteredCities.length
  };
};

export default citiesSlice.reducer; 