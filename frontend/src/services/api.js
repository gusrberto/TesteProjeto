import axios from 'axios'; 

const api = axios.create({
    baseURL: 'http://34.122.134.9',
    withCredentials: true,
});

/* if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
} */

export default api; 
