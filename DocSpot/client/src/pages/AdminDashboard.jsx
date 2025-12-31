import { useEffect, useState } from 'react';
import API from '../api/axios';
import DashboardCard from '../components/DashboardCard';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    doctors: 0,
    pendingDoctors: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      const usersRes = await API.get('/admin/users');
      const pendingRes = await API.get('/admin/doctors/pending');

      const doctors = usersRes.data.filter((u) => u.role === 'DOCTOR').length;

      setStats({
        users: usersRes.data.length,
        doctors,
        pendingDoctors: pendingRes.data.length,
      });
    };

    loadStats();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Admin Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard title="Total Users" value={stats.users} color="blue" />
        <DashboardCard title="Doctors" value={stats.doctors} color="purple" />
        <DashboardCard title="Pending Approvals" value={stats.pendingDoctors} color="red" />
      </div>
    </div>
  );
};

export default AdminDashboard;
