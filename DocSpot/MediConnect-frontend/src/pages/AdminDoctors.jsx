import { useEffect, useState } from 'react';
import API from '../api/axios';

const AdminDoctors = () => {
  const [doctors, setDoctors] = useState([]);

  const loadDoctors = async () => {
    const res = await API.get('/admin/doctors/pending');
    setDoctors(res.data);
  };

  useEffect(() => {
    loadDoctors();
  }, []);

  const updateStatus = async (id, approved) => {
    await API.put(`/admin/doctors/${id}/status?approved=${approved}`);
    loadDoctors();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Pending Doctor Approvals</h2>

      {doctors.length === 0 && <p className="text-gray-500">No pending doctors.</p>}

      <div className="space-y-4">
        {doctors.map((doc) => (
          <div key={doc._id} className="border p-4 rounded shadow">
            <p>
              <strong>Name:</strong> {doc.name}
            </p>
            <p>
              <strong>Email:</strong> {doc.email}
            </p>

            <div className="mt-3 space-x-2">
              <button
                className="bg-green-600 text-white px-3 py-1 rounded"
                onClick={() => updateStatus(doc._id, true)}
              >
                Approve
              </button>

              <button
                className="bg-red-600 text-white px-3 py-1 rounded"
                onClick={() => updateStatus(doc._id, false)}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDoctors;
