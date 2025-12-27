import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { FiShoppingCart, FiLogOut, FiLogIn, FiPackage, FiClipboard, FiGrid } from 'react-icons/fi';

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">🛍</span>
          <span className="text-xl font-bold text-gray-800 tracking-wide">Shopez</span>
        </Link>

        {/* NAV ACTIONS */}
        <div className="flex items-center gap-6 text-sm font-medium">
          {/* USER LINKS */}
          {user && user.role === 'user' && (
            <Link to="/my-orders" className="flex items-center gap-1 hover:text-red-500">
              <FiClipboard />
              My Orders
            </Link>
          )}

          {/* ADMIN LINKS */}
          {user?.role === 'admin' && (
            <>
              <Link to="/admin" className="flex items-center gap-1 text-blue-600 hover:underline">
                <FiGrid />
                Dashboard
              </Link>

              <Link
                to="/admin/products"
                className="flex items-center gap-1 text-blue-600 hover:underline"
              >
                <FiPackage />
                Products
              </Link>

              <Link
                to="/admin/orders"
                className="flex items-center gap-1 text-blue-600 hover:underline"
              >
                <FiClipboard />
                Orders
              </Link>
            </>
          )}

          {/* CART (NON-ADMIN) */}
          {user?.role !== 'admin' && (
            <Link to="/cart" className="relative flex items-center gap-1 hover:text-red-500">
              <FiShoppingCart />
              Cart
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 rounded-full">
                  {cartItems.length}
                </span>
              )}
            </Link>
          )}

          {/* AUTH */}
          {user ? (
            <button
              onClick={() => dispatch(logout())}
              className="flex items-center gap-1 text-red-500 hover:underline"
            >
              <FiLogOut />
              Logout
            </button>
          ) : (
            <Link to="/login" className="flex items-center gap-1 hover:text-red-500">
              <FiLogIn />
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
