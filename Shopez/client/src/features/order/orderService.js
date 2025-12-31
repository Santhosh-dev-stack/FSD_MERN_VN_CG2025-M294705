import api from '../../services/api';

export const createOrderApi = async (orderData) => {
  const response = await api.post('/orders', orderData);
  return response.data;
};

export const fetchMyOrdersApi = async () => {
  const response = await api.get('/orders/my');
  return response.data;
};

