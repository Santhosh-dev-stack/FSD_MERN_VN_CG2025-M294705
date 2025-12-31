import { useEffect, useState } from 'react';
import API from '../api/axios';
import DashboardCard from '../components/DashboardCard';

const DoctorDashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    today: 0,
    pending: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      const res = await API.get('/appointments/doctor');
      const todayDate = new Date().toDateString();

      const total = res.data.length;
      const pending = res.data.filter((a) => a.status === 'PENDING').length;
      const today = res.data.filter((a) => new Date(a.date).toDateString() === todayDate).length;

      setStats({ total, pending, today });
    };

    loadStats();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Doctor Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard title="Total Appointments" value={stats.total} color="blue" />
        <DashboardCard title="Today" value={stats.today} color="green" />
        <DashboardCard title="Pending" value={stats.pending} color="yellow" />
      </div>
    </div>
  );
};

export default DoctorDashboard;
