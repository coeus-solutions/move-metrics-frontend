import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

const TOKEN_KEY = 'auth_token';

export interface SignupData {
    email: string;
    password: string;
}

export interface LoginResponse {
    access_token: string;
    token_type: string;
}

export interface ProfileData {
    email: string;
    name: string;
}

const getStoredToken = (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
};

const setStoredToken = (token: string): void => {
    localStorage.setItem(TOKEN_KEY, token);
};

const removeStoredToken = (): void => {
    localStorage.removeItem(TOKEN_KEY);
};

const getAuthHeaders = () => {
    const token = getStoredToken();
    return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };
};

export const authService = {
    async signup(data: SignupData): Promise<{ message: string }> {
        const response = await axios.post(`${API_URL}/auth/signup`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    },

    async login(email: string, password: string): Promise<LoginResponse> {
        // Create form data
        const formData = new URLSearchParams();
        formData.append('username', email);  // Backend expects 'username' field for email
        formData.append('password', password);
        formData.append('grant_type', '');   // Required by OAuth2 spec
        formData.append('scope', '');        // Required by OAuth2 spec
        formData.append('client_id', '');    // Required by OAuth2 spec
        formData.append('client_secret', ''); // Required by OAuth2 spec

        const response = await axios.post(`${API_URL}/auth/login`, formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'accept': 'application/json'
            },
        });
        
        const { access_token } = response.data;
        setStoredToken(access_token);
        return response.data;
    },

    async logout(): Promise<void> {
        try {
            await axios.post(`${API_URL}/auth/logout`, {}, {
                headers: getAuthHeaders(),
            });
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            removeStoredToken();
        }
    },

    async getProfile(): Promise<ProfileData> {
        const response = await axios.get(`${API_URL}/auth/profile`, {
            headers: getAuthHeaders(),
        });
        return response.data;
    },

    async updateProfile(data: Partial<ProfileData>): Promise<ProfileData> {
        const response = await axios.put(`${API_URL}/auth/profile`, data, {
            headers: getAuthHeaders(),
        });
        return response.data;
    },

    async changePassword(newPassword: string): Promise<{ message: string }> {
        const response = await axios.put(
            `${API_URL}/profile/change-password`,
            { new_password: newPassword },
            {
                headers: getAuthHeaders(),
            }
        );
        return response.data;
    },

    isAuthenticated(): boolean {
        return !!getStoredToken();
    },
}; 