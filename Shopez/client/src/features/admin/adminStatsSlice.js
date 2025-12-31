import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchAdminStats = createAsyncThunk('adminStats/fetch', async (_, thunkAPI) => {
  try {
    const { data } = await api.get('/users/admin/stats');
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to load stats');
  }
});

const adminStatsSlice = createSlice({
  name: 'adminStats',
  initialState: {
    stats: {
      products: 0,
      orders: 0,
      users: 0,
      revenue: 0,
    },
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAdminStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchAdminStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminStatsSlice.reducer;
