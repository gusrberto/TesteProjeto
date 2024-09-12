import axios from 'axios'; 

const api = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true,
});

/* if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
} */

export default api; 
