// Mock authentication service
const MOCK_USER = {
  id: '123',
  email: 'demo@example.com',
  token: 'mock-jwt-token'
};

export const mockAuth = {
  login: async (email: string, password: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (email === 'demo@example.com' && password === 'demo123') {
      localStorage.setItem('token', MOCK_USER.token);
      return { user: MOCK_USER, token: MOCK_USER.token };
    }
    throw new Error('Invalid credentials');
  },

  signup: async (email: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    localStorage.setItem('token', MOCK_USER.token);
    return { user: MOCK_USER, token: MOCK_USER.token };
  },

  logout: () => {
    localStorage.removeItem('token');
  }
};