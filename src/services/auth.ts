import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

export interface SignupData {
    email: string;
    password: string;
}

export interface LoginResponse {
    access_token: string;
    token_type: string;
}

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
        const formData = new URLSearchParams();
        formData.append('username', email);
        formData.append('password', password);

        const response = await axios.post(`${API_URL}/auth/login`, formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        return response.data;
    },

    async logout(): Promise<{ message: string }> {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${API_URL}/auth/logout`, null, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        localStorage.removeItem('token');
        return response.data;
    },
}; 