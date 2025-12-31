import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

/* Layout */
import Header from './components/Header';
import Footer from './components/Footer';

/* Pages */
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import MyOrders from './pages/MyOrders';

/* Admin Pages */
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminCreateProduct from './pages/admin/AdminCreateProduct';
import AdminEditProduct from './pages/admin/AdminEditProduct';

/* Route Guards */
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

/* ===== Layout Wrapper ===== */
const Layout = () => {
  const location = useLocation();

  // Routes where Header & Footer should be hidden
  const hideLayoutRoutes = ['/login', '/register'];
  const hideLayout = hideLayoutRoutes.includes(location.pathname);

  return (
    <>
      {!hideLayout && <Header />}

      <main className="min-h-screen">
        <Routes>
          {/* ================= PUBLIC ================= */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ================= USER PROTECTED ================= */}
          <Route element={<ProtectedRoute />}>
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/my-orders" element={<MyOrders />} />
          </Route>

          {/* ================= ADMIN PROTECTED ================= */}
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/products/create" element={<AdminCreateProduct />} />
            <Route path="/admin/products/:id/edit" element={<AdminEditProduct />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
          </Route>
        </Routes>
      </main>

      {!hideLayout && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
};

export default App;
