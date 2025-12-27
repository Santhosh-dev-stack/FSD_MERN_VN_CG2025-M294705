import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchAllProductsApi,
  deleteProductApi,
  fetchAllOrdersApi,
  updateOrderStatusApi,
} from './adminService';

/* ================= PRODUCTS ================= */

export const fetchAdminProducts = createAsyncThunk(
  'admin/fetchProducts',
  async (page = 1, thunkAPI) => {
    try {
      return await fetchAllProductsApi(page);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to load products');
    }
  }
);

export const deleteProduct = createAsyncThunk('admin/deleteProduct', async (id, thunkAPI) => {
  try {
    await deleteProductApi(id);
    return id;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Delete failed');
  }
});

/* ================= ORDERS ================= */

export const fetchAdminOrders = createAsyncThunk('admin/fetchOrders', async (_, thunkAPI) => {
  try {
    return await fetchAllOrdersApi();
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to load orders');
  }
});

export const updateOrderStatus = createAsyncThunk(
  'admin/updateOrder',
  async ({ id, status }, thunkAPI) => {
    try {
      return await updateOrderStatusApi({ id, status });
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Update failed');
    }
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    products: [],
    page: 1,
    pages: 1,
    loading: false,
    error: null,
  },
  reducers: {
    clearAdminError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* PRODUCTS */
      .addCase(fetchAdminProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.page = action.payload.page;
        state.pages = action.payload.pages;
      })

      .addCase(fetchAdminProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((p) => p._id !== action.payload);
      })

      /* ORDERS */
      .addCase(fetchAdminOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchAdminOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAdminError } = adminSlice.actions;
export default adminSlice.reducer;
