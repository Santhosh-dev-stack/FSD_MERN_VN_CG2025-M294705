import { useEffect, useState } from 'react';
import API from '../api/axios';

const DoctorEditProfile = () => {
  const [form, setForm] = useState({
    name: '',
    specialization: '',
    experience: '',
    phone: '',
    city: '',
    state: '',
    bio: '',
    qualifications: '',
    isAvailable: true,
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  /* ================= LOAD PROFILE ================= */
  useEffect(() => {
    API.get('/doctors/profile')
      .then((res) => {
        const d = res.data;
        setForm({
          name: d.name || '',
          specialization: d.specialization || '',
          experience: d.experience || '',
          phone: d.phone || '',
          city: d.location?.city || '',
          state: d.location?.state || '',
          bio: d.bio || '',
          qualifications: d.qualifications?.join(', ') || '',
          isAvailable: d.isAvailable,
        });
      })
      .catch(() => setError('Failed to load profile'));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      await API.put('/doctors/profile/update', {
        name: form.name,
        specialization: form.specialization,
        experience: form.experience,
        phone: form.phone,
        bio: form.bio,
        isAvailable: form.isAvailable,
        qualifications: form.qualifications.split(',').map((q) => q.trim()),
        location: {
          city: form.city,
          state: form.state,
        },
      });

      setMessage('Profile updated successfully');
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>

      {error && <p className="text-red-600 mb-3">{error}</p>}
      {message && <p className="text-green-600 mb-3">{message}</p>}

      <form onSubmit={submit} className="space-y-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Full Name"
        />

        <input
          name="specialization"
          value={form.specialization}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Specialization"
        />

        <input
          name="experience"
          type="number"
          value={form.experience}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Experience (years)"
        />

        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Phone Number"
        />

        <div className="grid grid-cols-2 gap-3">
          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            className="p-2 border rounded"
            placeholder="City"
          />
          <input
            name="state"
            value={form.state}
            onChange={handleChange}
            className="p-2 border rounded"
            placeholder="State"
          />
        </div>

        <textarea
          name="bio"
          value={form.bio}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Bio"
        />

        <input
          name="qualifications"
          value={form.qualifications}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Qualifications (comma separated)"
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isAvailable"
            checked={form.isAvailable}
            onChange={handleChange}
          />
          Available for appointments
        </label>

        <button className="bg-blue-600 text-white px-6 py-2 rounded">Save Changes</button>
      </form>
    </div>
  );
};

export default DoctorEditProfile;
