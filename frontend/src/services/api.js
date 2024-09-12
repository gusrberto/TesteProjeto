import axios from 'axios'; 
//'http://34.122.134.9'

const api = axios.create({
    baseURL: "/api",
    withCredentials: true,
});

/* if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
} */

export default api; 
