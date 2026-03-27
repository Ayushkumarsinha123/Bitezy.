import axios from "axios";

const API_URL = "http://localhost:3000/api/shop"; 

// cart services
export const fetchCart = async (token) => {
  const response = await axios.get(`${API_URL}/cart`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const syncCart = async (items, token) => {
  const response = await axios.put(`${API_URL}/cart`, { items }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

//order services
export const createOrder = async (orderData, token) => {
  const response = await axios.post(`${API_URL}/order`, orderData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

// restro services
export const fetchRestaurantOrders = async (token) => {
  const response = await axios.get(`${API_URL}/orders/restaurant`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const updateOrderStatus = async (orderId, status, token) => {
  const response = await axios.put(`${API_URL}/orders/${orderId}/status`, { status }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};