import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import cartReducer from '../features/cart/cartSlice';
import productReducer from '../features/product/productSlice';
import orderReducer from '../features/order/orderSlice';
import adminReducer from '../features/admin/adminSlice';
import adminOrderReducer from '../features/admin/adminOrderSlice';
import adminStatsReducer from '../features/admin/adminStatsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    products: productReducer,
    order: orderReducer,
    admin: adminReducer,
    adminOrders: adminOrderReducer,
    adminStats: adminStatsReducer,
  },
});

export default store;
