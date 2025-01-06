import axios from 'axios';
import { API_BASE_URL } from '../config/api';

export interface PopularCity {
  city: string;
  count: number;
}

export interface Comparison {
  id: string;
  user_id: string;
  cities: string[];
}

export interface DashboardStats {
  popular_cities: PopularCity[];
  recent_comparisons: Comparison[];
  [key: string]: any;
}

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const response = await axios.get(`${API_BASE_URL}/dashboard/stats`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
      'Content-Type': 'application/json',
    }
  });
  return response.data;
}; 