import { BASE_URL } from './config.js';

export async function apiRequest(endpoint, method = 'GET', data = null) {
    try {
        const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        };

        if (data && (method === 'POST' || method === 'PUT')) {
        options.body = JSON.stringify(data);
        }

        const response = await fetch(`${BASE_URL}/${endpoint}`, options);

        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }

        const text = await response.text();
        return text ? JSON.parse(text) : null;
        
    } catch (error) {
        console.error('API Request Error:', error);
        throw error;
    }
}