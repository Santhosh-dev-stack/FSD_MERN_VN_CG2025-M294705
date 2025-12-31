import { useEffect, useState } from 'react';
import API from '../api/axios';
import UploadDocument from '../components/UploadDocument';

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  const loadAppointments = async () => {
    const res = await API.get('/appointments/patient');
    setAppointments(res.data);
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">My Appointments</h2>

      {appointments.length === 0 && <p className="text-gray-500">No appointments found.</p>}

      <div className="space-y-4">
        {appointments.map((appt) => (
          <div key={appt._id} className="border rounded p-4 shadow">
            <p>
              <strong>Doctor:</strong> {appt.doctor.name}
            </p>
            <p>
              <strong>Email:</strong> {appt.doctor.email}
            </p>
            <p>
              <strong>Date:</strong> {new Date(appt.date).toLocaleString()}
            </p>
            <p>
              <strong>Status:</strong> {appt.status}
            </p>

            {/* Uploaded Documents */}
            {appt.documents?.length > 0 && (
              <div className="mt-2">
                <p className="font-medium">Documents:</p>
                {appt.documents.map((doc, i) => (
                  <a
                    key={i}
                    href={`http://localhost:5000/uploads/${doc}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline block"
                  >
                    View Document {i + 1}
                  </a>
                ))}
              </div>
            )}

            {/* Upload Section */}
            <UploadDocument appointmentId={appt._id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
