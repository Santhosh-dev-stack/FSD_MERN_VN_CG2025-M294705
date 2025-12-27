import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../features/auth/authSlice';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { name, email, password, confirmPassword } = formData;

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    dispatch(registerUser({ name, email, password }));
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* LEFT – FORM */}
      <div className="flex items-center justify-center bg-gray-50 px-6">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-2 text-center">Create Account</h2>
          <p className="text-sm text-gray-500 text-center mb-6">
            Join Shopez and start shopping today
          </p>

          {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

          <form onSubmit={submitHandler} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={name}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 outline-none"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={email}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 outline-none"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 outline-none"
              required
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 outline-none"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg text-white transition
    ${loading ? 'bg-red-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'}
  `}
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Registering...
                </>
              ) : (
                'Register'
              )}
            </button>
          </form>

          <p className="text-sm text-center mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-red-500 font-medium hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>

      {/* RIGHT – IMAGE / INFO */}
      <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-red-500 to-pink-600 text-white p-10">
        <div className="max-w-sm text-center">
          <h1 className="text-3xl font-bold mb-4">Join Shopez 🚀</h1>
          <p className="text-sm opacity-90">
            Create an account to explore products, track orders, and enjoy a smooth shopping
            experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
