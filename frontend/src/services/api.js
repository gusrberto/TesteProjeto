import axios from 'axios'; 

const api = axios.create({
    baseURL: 'https://browstyle.onrender.com',
});

/* if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
} */

export default api; 
