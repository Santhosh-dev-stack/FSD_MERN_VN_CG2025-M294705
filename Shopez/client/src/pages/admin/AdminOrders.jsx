import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOrders, updateOrderStatus } from '../../features/admin/adminOrderSlice';

const AdminOrders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.adminOrders);

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Admin Orders</h2>

      {loading && <p>Loading orders...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Order ID</th>
              <th className="border p-2">User</th>
              <th className="border p-2">Total</th>
              <th className="border p-2">Payment</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="text-center">
                <td className="border p-2 text-xs">{order._id.slice(-6)}</td>
                <td className="border p-2">{order.user?.name || 'N/A'}</td>
                <td className="border p-2">₹{order.totalPrice}</td>
                <td className="border p-2">{order.isPaid ? 'Paid' : 'Pending'}</td>

                {/* STATUS DROPDOWN */}
                <td className="border p-2">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      dispatch(
                        updateOrderStatus({
                          id: order._id,
                          status: e.target.value,
                        })
                      )
                    }
                    className="border rounded px-2 py-1"
                  >
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;
