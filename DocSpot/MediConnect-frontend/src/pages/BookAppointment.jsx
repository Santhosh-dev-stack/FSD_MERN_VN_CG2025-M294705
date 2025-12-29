import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import API from '../api/axios';

const AVAILABLE_SLOTS = ['09:00', '10:30', '14:00', '16:30', '18:00'];

const BookAppointment = () => {
  const location = useLocation();

  const [doctors, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState('');
  const [date, setDate] = useState('');
  const [slot, setSlot] = useState('');

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  /* ================= LOAD DOCTORS ================= */
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await API.get('/doctors');
        setDoctors(res.data);
      } catch {
        setError('Failed to load doctors');
      }
    };
    fetchDoctors();
  }, []);

  /* ================= AUTO SELECT DOCTOR ================= */
  useEffect(() => {
    if (location.state?.doctorId) {
      setDoctorId(location.state.doctorId);
    }
  }, [location.state]);

  /* ================= SUBMIT ================= */
  const submit = async (e) => {
    e.preventDefault();

    if (!doctorId || !date || !slot) {
      setError('Please select doctor, date, and time slot');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      await API.post('/appointments', {
        doctorId,
        date,
        slot,
      });

      setMessage('Appointment booked successfully');
      setDoctorId('');
      setDate('');
      setSlot('');
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed');
    } finally {
      setLoading(false);
    }
  };

  /* ================= DATE VALIDATION ================= */
  const today = new Date().toISOString().slice(0, 16);

  return (
    <div className="max-w-xl mx-auto mt-10">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-2">Book Appointment</h2>
        <p className="text-gray-600 mb-4">Choose a doctor, date, and available time slot</p>

        {/* Error */}
        {error && <div className="mb-3 bg-red-100 text-red-700 p-2 rounded">{error}</div>}

        {/* Success */}
        {message && <div className="mb-3 bg-green-100 text-green-700 p-2 rounded">{message}</div>}

        <form onSubmit={submit}>
          {/* Doctor */}
          <label className="block mb-1 font-medium">Doctor</label>
          <select
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
            className="w-full mb-4 p-2 border rounded"
          >
            <option value="">Select Doctor</option>
            {doctors.map((d) => (
              <option key={d._id} value={d._id}>
                {d.name}
              </option>
            ))}
          </select>

          {/* Date */}
          <label className="block mb-1 font-medium">Date</label>
          <input
            type="datetime-local"
            value={date}
            min={today}
            onChange={(e) => setDate(e.target.value)}
            className="w-full mb-4 p-2 border rounded"
          />

          {/* Time Slots */}
          <label className="block mb-2 font-medium">Time Slot</label>
          <div className="grid grid-cols-3 gap-2 mb-6">
            {AVAILABLE_SLOTS.map((s) => (
              <button
                type="button"
                key={s}
                onClick={() => setSlot(s)}
                className={`border py-2 rounded text-sm
                  ${slot === s ? 'bg-blue-600 text-white' : 'bg-white hover:bg-gray-100'}`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Submit */}
          <button
            disabled={loading || !doctorId || !date || !slot}
            className={`w-full py-2 rounded text-white 
              ${
                loading || !doctorId || !date || !slot
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700'
              }
            `}
          >
            {loading ? 'Booking...' : 'Book Appointment'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookAppointment;
