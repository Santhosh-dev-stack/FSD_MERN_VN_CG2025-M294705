import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyOrders } from '../features/order/orderSlice';
import { FiPackage, FiClock, FiCheckCircle, FiXCircle } from 'react-icons/fi';

const MyOrders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  /* LOADING */
  if (loading) {
    return <div className="p-6 text-center text-gray-500">Loading your orders...</div>;
  }

  /* ERROR */
  if (error) {
    return <div className="p-6 text-center text-red-500">{error}</div>;
  }

  /* EMPTY */
  if (orders.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-gray-500">
        <FiPackage size={48} />
        <p className="mt-4 text-lg">No orders found</p>
      </div>
    );
  }

  const getStatusBadge = (order) => {
    if (order.isDelivered) {
      return (
        <span className="flex items-center gap-1 text-green-600 font-medium">
          <FiCheckCircle /> Delivered
        </span>
      );
    }
    if (order.isPaid) {
      return (
        <span className="flex items-center gap-1 text-blue-600 font-medium">
          <FiClock /> Paid
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1 text-red-500 font-medium">
        <FiXCircle /> Pending
      </span>
    );
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white shadow rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center"
          >
            {/* LEFT */}
            <div>
              <p className="text-sm text-gray-500">Order #{order._id.slice(-6).toUpperCase()}</p>
              <p className="text-sm text-gray-500">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* CENTER */}
            <div className="mt-2 sm:mt-0 font-bold text-lg">₹{order.totalPrice}</div>

            {/* RIGHT */}
            <div className="mt-2 sm:mt-0">{getStatusBadge(order)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
