import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createOrderApi, fetchMyOrdersApi } from './orderService';
import api from '../../services/api';

/* ================================
   CREATE ORDER
================================ */
export const createOrder = createAsyncThunk('order/create', async (orderData, thunkAPI) => {
  try {
    return await createOrderApi(orderData);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Order creation failed');
  }
});

/* ================================
   DUMMY PAYMENT
================================ */
export const payDummyOrder = createAsyncThunk(
  'order/payDummy',
  async ({ orderId, method }, thunkAPI) => {
    try {
      const { data } = await api.post('/payment/dummy', {
        orderId,
        method,
      });
      return data.order;
    } catch {
      return thunkAPI.rejectWithValue('Payment failed');
    }
  }
);

/* ================================
   FETCH MY ORDERS
================================ */
export const fetchMyOrders = createAsyncThunk('order/myOrders', async (_, thunkAPI) => {
  try {
    return await fetchMyOrdersApi();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch orders');
  }
});

/* ================================
   ORDER SLICE
================================ */
const orderSlice = createSlice({
  name: 'order',
  initialState: {
    loading: false,
    success: false,
    paymentSuccess: false,
    error: null,

    order: null,
    orders: [],
  },
  reducers: {
    resetOrder: (state) => {
      state.loading = false;
      state.success = false;
      state.paymentSuccess = false;
      state.error = null;
      state.order = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* CREATE ORDER */
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* DUMMY PAYMENT */
      .addCase(payDummyOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(payDummyOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentSuccess = true;
        state.order = action.payload;
      })
      .addCase(payDummyOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* MY ORDERS */
      .addCase(fetchMyOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetOrder } = orderSlice.actions;
export default orderSlice.reducer;
