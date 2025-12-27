import api from './api';

export const dummyPayApi = async (orderId) => {
  const { data } = await api.post('/payment/dummy', { orderId });
  return data;
};
