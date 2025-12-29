import { useEffect, useState } from 'react';
import API from '../api/axios';
import DashboardCard from '../components/DashboardCard';

const PatientDashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    confirmed: 0,
    pending: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      const res = await API.get('/appointments/patient');

      const total = res.data.length;
      const confirmed = res.data.filter((a) => a.status === 'CONFIRMED').length;
      const pending = res.data.filter((a) => a.status === 'PENDING').length;

      setStats({ total, confirmed, pending });
    };

    loadStats();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Patient Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard title="Total Appointments" value={stats.total} color="blue" />
        <DashboardCard title="Confirmed" value={stats.confirmed} color="green" />
        <DashboardCard title="Pending" value={stats.pending} color="yellow" />
      </div>
    </div>
  );
};

export default PatientDashboard;
