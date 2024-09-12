import axios from 'axios'; 
//'http://34.122.134.9'
const baseURL = '/'

const api = axios.create({
    baseURL,
    withCredentials: true,
});

/* if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
} */

export default api; 
