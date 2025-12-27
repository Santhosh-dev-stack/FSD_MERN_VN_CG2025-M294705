import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* BRAND */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🛍</span>
            <h2 className="text-xl font-bold text-white">Shopez</h2>
          </div>
          <p className="text-sm leading-relaxed text-gray-400">
            A modern MERN e-commerce platform built for fast, secure, and smart online shopping.
          </p>
        </div>

        {/* SHOP */}
        <div>
          <h3 className="font-semibold text-white mb-3">Shop</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-white transition">
                All Products
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-white transition">
                Cart
              </Link>
            </li>
            <li>
              <Link to="/my-orders" className="hover:text-white transition">
                My Orders
              </Link>
            </li>
          </ul>
        </div>

        {/* ACCOUNT */}
        <div>
          <h3 className="font-semibold text-white mb-3">Account</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white transition cursor-pointer">Login</li>
            <li className="hover:text-white transition cursor-pointer">Register</li>
            <li className="hover:text-white transition cursor-pointer">Order History</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="font-semibold text-white mb-3">Contact</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>📧 santhosh.prof268@gmail.com</li>
            <li>📞 +91 9944776843</li>
            <li>📍 India</li>
          </ul>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-gray-800 text-center text-sm py-4 text-gray-400">
        © {new Date().getFullYear()} Shopez. Built with MERN Stack.
      </div>
    </footer>
  );
};

export default Footer;
