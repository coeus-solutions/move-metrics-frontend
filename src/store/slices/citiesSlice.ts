import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';

export interface City {
  id: string;
  city: string;
  country: string;
}

interface CitiesState {
  cities: City[];
  loading: boolean;
}

const initialState: CitiesState = {
  cities: [],
  loading: false,
};

export const fetchCities = createAsyncThunk(
  'cities/fetchCities',
  async () => {
    const token = localStorage.getItem('auth_token');
    const response = await fetch('http://localhost:8000/cities', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch cities');
    }
    const data = await response.json();
    return data;
  }
);

const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    setCities: (state, action: PayloadAction<City[]>) => {
      state.cities = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCities.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.cities = action.payload;
        state.loading = false;
      })
      .addCase(fetchCities.rejected, (state) => {
        state.loading = false;
        state.cities = [];
      });
  },
});

export const { setCities, setLoading } = citiesSlice.actions;

export const selectAllCities = (state: RootState) => state.cities.cities;
export const selectCitiesLoading = (state: RootState) => state.cities.loading;

export const searchCities = (cities: City[] | null | undefined, searchTerm: string, page: number) => {
  if (!Array.isArray(cities)) {
    return {
      cities: [],
      hasMore: false
    };
  }

  const filtered = cities.filter(city => 
    city.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    city.country.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const pageSize = 20;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return {
    cities: filtered.slice(start, end),
    hasMore: end < filtered.length
  };
};

export default citiesSlice.reducer; 