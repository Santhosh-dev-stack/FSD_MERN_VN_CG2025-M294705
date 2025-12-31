import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from '../api/axios';
import StarRating from '../components/StarRating';

const DoctorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  /* ================= LOAD PROFILE + REVIEWS ================= */
  useEffect(() => {
    const loadData = async () => {
      try {
        const [doctorRes, reviewRes] = await Promise.all([
          API.get(`/doctors/${id}`),
          API.get(`/reviews/doctor/${id}`),
        ]);

        setDoctor(doctorRes.data);
        setReviews(reviewRes.data);
      } catch (err) {
        setError('Doctor not found');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  /* ================= UI STATES ================= */
  if (loading) {
    return <p className="text-center text-gray-500 mt-10">Loading doctor profile...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600 mt-10">{error}</p>;
  }

  return (
    <div className="bg-white p-6 rounded shadow max-w-3xl mx-auto">
      {/* ================= HEADER ================= */}
      <div className="flex items-start gap-6 mb-6">
        <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold">
          {doctor.name?.[0]}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-semibold">{doctor.name}</h2>

            {/* Availability */}
            <span
              className={`text-xs px-3 py-1 rounded-full font-medium
                ${doctor.isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
            >
              {doctor.isAvailable ? 'Available' : 'Unavailable'}
            </span>
          </div>

          <p className="text-gray-600">{doctor.specialization}</p>
          <StarRating rating={doctor.rating || 4} />
        </div>
      </div>

      {/* ================= DETAILS ================= */}
      <div className="space-y-2 mb-6">
        <p className="text-gray-700">
          <strong>Experience:</strong> {doctor.experience}+ years
        </p>

        <p className="text-gray-700">
          <strong>Email:</strong> {doctor.email}
        </p>

        {doctor.bio && (
          <p className="text-gray-700">
            <strong>Bio:</strong> {doctor.bio}
          </p>
        )}

        {doctor.qualifications?.length > 0 && (
          <p className="text-gray-700">
            <strong>Qualifications:</strong> {doctor.qualifications.join(', ')}
          </p>
        )}
      </div>

      {/* ================= ACTION ================= */}
      <button
        disabled={!doctor.isAvailable}
        onClick={() => navigate('/book', { state: { doctorId: doctor._id } })}
        className={`mb-8 px-6 py-2 rounded text-white
          ${
            doctor.isAvailable ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
          }`}
      >
        Book Appointment
      </button>

      {/* ================= REVIEWS ================= */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Patient Reviews</h3>

        {reviews.length === 0 && <p className="text-gray-500">No reviews yet.</p>}

        {reviews.map((r) => (
          <div key={r._id} className="border-b pb-3 mb-3">
            <p className="font-medium">{r.patient.name}</p>
            <StarRating rating={r.rating} />
            {r.comment && <p className="text-gray-600">{r.comment}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorProfile;
