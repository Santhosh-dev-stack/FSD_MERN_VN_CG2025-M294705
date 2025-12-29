import { useState } from 'react';
import API from '../api/axios';

const UploadDocument = ({ appointmentId }) => {
  const [file, setFile] = useState(null);

  const upload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    await API.post(`/appointments/${appointmentId}/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    alert('File uploaded successfully');
  };

  return (
    <div className="mt-2">
      <input type="file" className="mb-2" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={upload} className="bg-blue-600 text-white px-3 py-1 rounded">
        Upload
      </button>
    </div>
  );
};

export default UploadDocument;
