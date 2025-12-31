import api from '../../services/api';

/* PRODUCTS */
export const fetchAllProductsApi = async (page = 1) => {
  const { data } = await api.get(`/products/admin?page=${page}`);
  return data;
};

export const deleteProductApi = async (id) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};

/* ORDERS */
export const fetchAllOrdersApi = async () => {
  const response = await api.get('/orders');
  return response.data;
};

export const updateOrderStatusApi = async ({ id, status }) => {
  const { data } = await api.put(`/orders/${id}/status`, { status });
  return data;
};

