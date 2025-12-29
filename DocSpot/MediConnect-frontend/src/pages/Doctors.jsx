import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import StarRating from '../components/StarRating';
import { FaSearch, FaFilter, FaUserMd, FaCalendarCheck, FaTimes } from 'react-icons/fa';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [city, setCity] = useState('');

  const [minRating, setMinRating] = useState(0);

  const navigate = useNavigate();

  /* ================= LOAD DOCTORS ================= */
  useEffect(() => {
    const loadDoctors = async () => {
      try {
        const res = await API.get('/doctors');
        setDoctors(res.data);
        setFiltered(res.data);
      } catch (err) {
        console.error('Failed to load doctors');
      } finally {
        setLoading(false);
      }
    };
    loadDoctors();
  }, []);

  /* ================= FILTER LOGIC ================= */
  useEffect(() => {
    let result = doctors;

    if (search) {
      result = result.filter((d) => d.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (specialization) {
      result = result.filter((d) => d.specialization === specialization);
    }
    if (city) {
      result = result.filter((d) => d.location?.city?.toLowerCase().includes(city.toLowerCase()));
    }


    if (minRating > 0) {
      result = result.filter((d) => (d.rating || 0) >= minRating);
    }

    setFiltered(result);
  }, [search, specialization, minRating, doctors]);

  const specializations = [...new Set(doctors.map((d) => d.specialization || 'General Physician'))];

  const resetFilters = () => {
    setSearch('');
    setSpecialization('');
    setMinRating(0);
  };

  /* ================= UI STATES ================= */
  if (loading) {
    return <p className="text-center text-gray-500 mt-10">Loading doctors...</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Find a Doctor</h2>

      {/* 🔍 SEARCH & FILTER BAR */}
      <div className="bg-white p-4 rounded-xl shadow mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search */}
        <div className="flex items-center border rounded px-2">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            placeholder="Search by name"
            className="w-full p-2 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Specialization */}
        <div className="flex items-center border rounded px-2">
          <FaUserMd className="text-gray-400 mr-2" />
          <select
            className="w-full p-2 outline-none"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
          >
            <option value="">All Specializations</option>
            {specializations.map((s, i) => (
              <option key={i} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Rating */}
        <div className="flex items-center border rounded px-2">
          <FaFilter className="text-gray-400 mr-2" />
          <select
            className="w-full p-2 outline-none"
            value={minRating}
            onChange={(e) => setMinRating(Number(e.target.value))}
          >
            <option value={0}>All Ratings</option>
            <option value={3}>3+ ⭐</option>
            <option value={4}>4+ ⭐</option>
            <option value={4.5}>4.5+ ⭐</option>
          </select>
        </div>
        <input
          placeholder="Filter by city"
          className="border p-2 rounded"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        {/* Reset */}
        <button
          onClick={resetFilters}
          className="flex items-center justify-center gap-2 border rounded text-gray-600 hover:bg-gray-100"
        >
          <FaTimes /> Reset
        </button>
      </div>

      {/* 👨‍⚕️ DOCTOR CARDS */}
      {filtered.length === 0 ? (
        <p className="text-center text-gray-500">No doctors match your filters.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((doc) => (
            <div
              key={doc._id}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition flex flex-col"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-3">
                <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-lg">
                  {doc.name[0]}
                </div>

                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium
                    ${
                      doc.isAvailable !== false
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                >
                  {doc.isAvailable !== false ? 'Available' : 'Unavailable'}
                </span>
              </div>

              {/* Info */}
              <h3 className="text-lg font-semibold">{doc.name}</h3>
              <p className="text-sm text-gray-600">{doc.specialization || 'General Physician'}</p>
              <p className="text-sm text-gray-500 mb-2">{doc.experience || 1}+ years experience</p>
              <p className="text-sm text-gray-500">
                📍 {doc.location?.city}, {doc.location?.state}
              </p>

              <StarRating rating={doc.rating || 4} />

              {/* Actions */}
              <div className="mt-auto flex gap-2 pt-4">
                <button
                  onClick={() => navigate(`/doctors/${doc._id}`)}
                  className="flex-1 border border-blue-600 text-blue-600 py-2 rounded hover:bg-blue-50"
                >
                  View Profile
                </button>

                <button
                  disabled={doc.isAvailable === false}
                  onClick={() => navigate('/book', { state: { doctorId: doc._id } })}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded text-white
                    ${
                      doc.isAvailable === false
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                >
                  <FaCalendarCheck /> Book
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Doctors;
