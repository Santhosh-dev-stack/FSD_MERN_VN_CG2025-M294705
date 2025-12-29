import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminStats } from '../../features/admin/adminStatsSlice';

const AdminDashboard = () => {
  const dispatch = useDispatch();

  const { stats, loading, error } = useSelector((state) => state.adminStats);

  useEffect(() => {
    dispatch(fetchAdminStats());
  }, [dispatch]);

  if (loading) {
    return <p className="p-6">Loading dashboard...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* PRODUCTS */}
        <div className="bg-white shadow rounded p-5">
          <h4 className="text-gray-500">Products</h4>
          <p className="text-3xl font-bold">{stats.products}</p>
        </div>

        {/* ORDERS */}
        <div className="bg-white shadow rounded p-5">
          <h4 className="text-gray-500">Orders</h4>
          <p className="text-3xl font-bold">{stats.orders}</p>
        </div>

        {/* USERS */}
        <div className="bg-white shadow rounded p-5">
          <h4 className="text-gray-500">Users</h4>
          <p className="text-3xl font-bold">{stats.users}</p>
        </div>

        {/* REVENUE */}
        <div className="bg-white shadow rounded p-5">
          <h4 className="text-gray-500">Revenue</h4>
          <p className="text-3xl font-bold">₹{stats.revenue}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
