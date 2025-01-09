import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:9000', 
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const registerUser = (data) => API.post('/register', data);
export const loginUser = (data) => API.post('/login', data);
export const getProducts = () => API.get('/allProducts');
export const addToCart = (data) => API.post('/cart/addToCart', data);
export const placeOrder = (data) => API.post('/orders', data);

export default API;
