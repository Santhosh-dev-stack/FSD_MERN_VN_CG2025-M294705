import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <nav className="bg-white shadow mb-6">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          Shopez
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/" className="hover:text-blue-600">
            Products
          </Link>

          <Link to="/cart" className="relative">
            Cart
            {cartItems.length > 0 && (
              <span className="ml-1 bg-red-500 text-white text-xs px-2 rounded-full">
                {cartItems.length}
              </span>
            )}
          </Link>

          {user ? (
            <>
              <Link to="/my-orders">My Orders</Link>
              {user.role === 'admin' && <Link to="/admin/products">Admin</Link>}
              <button onClick={() => dispatch(logout())} className="text-red-500">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
