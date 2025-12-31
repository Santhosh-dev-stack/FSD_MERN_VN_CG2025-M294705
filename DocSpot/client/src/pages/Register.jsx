import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'PATIENT',

    // Doctor-only fields
    specialization: '',
    experience: '',
    phone: '',
    city: '',
    state: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const payload =
        form.role === 'DOCTOR'
          ? {
              name: form.name,
              email: form.email,
              password: form.password,
              role: form.role,
              specialization: form.specialization,
              experience: form.experience,
              phone: form.phone,
              location: {
                city: form.city,
                state: form.state,
              },
            }
          : {
              name: form.name,
              email: form.email,
              password: form.password,
              role: form.role,
            };

      await API.post('/auth/register', payload);

      alert(
        form.role === 'DOCTOR'
          ? 'Registration successful. Await admin approval.'
          : 'Registration successful. Please login.'
      );

      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <form onSubmit={submit} className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
          <p className="text-sm text-gray-500">Join MediConnect to book or manage appointments</p>
        </div>

        {/* Error */}
        {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm">{error}</div>}

        {/* Name */}
        <label className="block text-sm font-medium mb-1">Full Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded focus:ring-2 focus:ring-blue-400"
          required
        />

        {/* Email */}
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded focus:ring-2 focus:ring-blue-400"
          required
        />

        {/* Password */}
        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-1 p-2 border rounded focus:ring-2 focus:ring-blue-400"
          required
        />
        <p className="text-xs text-gray-500 mb-3">Minimum 6 characters recommended</p>

        {/* Role */}
        <label className="block text-sm font-medium mb-1">Register As</label>
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded focus:ring-2 focus:ring-blue-400"
        >
          <option value="PATIENT">Patient</option>
          <option value="DOCTOR">Doctor</option>
        </select>

        {/* ================= DOCTOR EXTRA FIELDS ================= */}
        {form.role === 'DOCTOR' && (
          <div className="bg-blue-50 p-4 rounded mb-4">
            <h4 className="text-sm font-semibold mb-3 text-blue-700">Doctor Details</h4>

            <label className="block text-sm mb-1">Specialization</label>
            <input
              name="specialization"
              value={form.specialization}
              onChange={handleChange}
              className="w-full mb-3 p-2 border rounded"
              placeholder="e.g. Cardiologist"
              required
            />

            <label className="block text-sm mb-1">Experience (years)</label>
            <input
              name="experience"
              type="number"
              min="0"
              value={form.experience}
              onChange={handleChange}
              className="w-full mb-3 p-2 border rounded"
              required
            />

            <label className="block text-sm mb-1">Phone Number</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full mb-3 p-2 border rounded"
              placeholder="e.g. 9876543210"
              required
            />

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm mb-1">City</label>
                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-1">State</label>
                <input
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>
          </div>
        )}

        {/* Submit */}
        <button
          disabled={loading}
          className={`w-full py-2 rounded text-white font-medium
            ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {loading ? 'Registering...' : 'Create Account'}
        </button>

        {/* Footer */}
        <p className="text-sm text-center mt-4">
          Already have an account?{' '}
          <span
            className="text-blue-600 cursor-pointer underline"
            onClick={() => navigate('/')}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
