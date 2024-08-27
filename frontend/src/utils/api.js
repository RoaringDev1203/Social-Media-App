import axios from 'axios';

// Load environment variable
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

if (localStorage.token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`;
}

export default api;
