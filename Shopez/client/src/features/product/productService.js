import api from '../../services/api';

export const fetchProductsApi = async (params = {}) => {
  const response = await api.get('/products', { params });
  return response.data;
};
