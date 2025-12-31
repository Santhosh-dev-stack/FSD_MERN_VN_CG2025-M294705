import { useEffect, useState } from 'react';
import API from '../api/axios';

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  const loadAppointments = async () => {
    const res = await API.get('/appointments/doctor');
    setAppointments(res.data);
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const updateStatus = async (id, status) => {
    await API.put(`/appointments/${id}/status`, { status });
    loadAppointments();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">My Appointments</h2>

      <div className="space-y-4">
        {appointments.map((appt) => (
          <div key={appt._id} className="border p-4 rounded shadow">
            <p>
              <strong>Patient:</strong> {appt.patient.name}
            </p>
            <p>
              <strong>Email:</strong> {appt.patient.email}
            </p>
            <p>
              <strong>Date:</strong> {new Date(appt.date).toLocaleString()}
            </p>
            <p>
              <strong>Status:</strong> {appt.status}
            </p>

            {appt.status === 'PENDING' && (
              <div className="mt-3 space-x-2">
                <button
                  className="bg-green-600 text-white px-3 py-1 rounded"
                  onClick={() => updateStatus(appt._id, 'CONFIRMED')}
                >
                  Confirm
                </button>

                <button
                  className="bg-red-600 text-white px-3 py-1 rounded"
                  onClick={() => updateStatus(appt._id, 'CANCELLED')}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointments;
