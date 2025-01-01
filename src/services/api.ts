import { mockAuth } from './mockAuth';
import { mockCompareCity } from './mockApi';

export async function login(email: string, password: string) {
  return mockAuth.login(email, password);
}

export async function signup(email: string, password: string) {
  return mockAuth.signup(email, password);
}

export async function logout() {
  return mockAuth.logout();
}

export async function compareCity(currentCity: string, potentialCities: string[], familySize: number) {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Please log in to compare cities');
    }

    const response = await mockCompareCity(currentCity, potentialCities, familySize);
    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Failed to compare cities');
  }
}