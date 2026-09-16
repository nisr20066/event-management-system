import { BASE_URL } from './config.js';

export async function apiRequest(endpoint, method = 'GET', data = null) {
    try {
        const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        };

        const token = localStorage.getItem('token');
        if (token) options.headers.Authorization = `Bearer ${token}`;

        if (data && (method === 'POST' || method === 'PUT')) {
        options.body = JSON.stringify(data);
        }

        const response = await fetch(`${BASE_URL}/${endpoint}`, options);

        const text = await response.text();
        const payload = text ? JSON.parse(text) : null;

        if (!response.ok) {
        const detail = Array.isArray(payload?.detail)
          ? payload.detail.map(item => item.msg).join(', ')
          : payload?.detail || payload?.message;
        throw new Error(detail || `HTTP error! status: ${response.status}`);
        }

        return payload;
        
    } catch (error) {
        console.error('API Request Error:', error);
        throw error;
    }
}
