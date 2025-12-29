import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

const Hero = () => {
  const navigate = useNavigate();
  const { login, user } = useAuth();

  const loginRef = useRef(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [pulse, setPulse] = useState(false);

  /* ================= LOGIN ================= */
  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await API.post('/auth/login', { email, password });
      login(res.data.user, res.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  /* ================= BROWSE DOCTORS ================= */
  const handleBrowseDoctors = () => {
    if (user) {
      navigate('/doctors');
      return;
    }

    // Scroll to login
    loginRef.current?.scrollIntoView({ behavior: 'smooth' });

    // Pulse animation
    setPulse(true);
    setTimeout(() => setPulse(false), 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* LEFT CONTENT (unchanged) */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Seamless Doctor Appointments <br />
            <span className="text-blue-600">With MediConnect</span>
          </h1>

          <p className="mt-5 text-lg text-gray-600">
            Find trusted doctors, book appointments instantly, and manage your healthcare experience
            — all in one secure platform.
          </p>

          <div className="mt-8 flex gap-4">
            <button
              onClick={() => navigate('/register')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700"
            >
              Create Account
            </button>

            <button
              onClick={handleBrowseDoctors}
              className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50"
            >
              Browse Doctors
            </button>
          </div>
        </div>

        {/* RIGHT: LOGIN CARD */}
        <div
          ref={loginRef}
          className={`bg-white rounded-2xl shadow-xl p-8 w-full max-w-md mx-auto transition-all duration-300
            ${pulse ? 'ring-4 ring-blue-300 animate-pulse' : ''}`}
        >
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-1">
            Login to MediConnect
          </h2>

          <p className="text-sm text-gray-500 text-center mb-6">Please login to continue</p>

          {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm">{error}</div>}

          <form onSubmit={submit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
            />

            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
            />

            <button
              disabled={loading}
              className={`w-full py-2 rounded text-white font-medium
                ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              {loading ? 'Signing in...' : 'Login'}
            </button>
          </form>

          <p className="text-sm text-center mt-4">
            New to MediConnect?{' '}
            <span
              className="text-blue-600 cursor-pointer underline"
              onClick={() => navigate('/register')}
            >
              Create an account
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
