import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { createOrder, resetOrder, payDummyOrder } from '../features/order/orderSlice';
import { clearCart } from '../features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';
import { FiMapPin, FiHome, FiCreditCard, FiTruck } from 'react-icons/fi';
import { SiGooglepay, SiPhonepe } from 'react-icons/si';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);
  const { loading, success, paymentSuccess, order, error } = useSelector((state) => state.order);

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('COD');

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cartItems,
        shippingAddress: { address, city, postalCode, country },
        totalPrice,
      })
    );
  };

  const payNowHandler = () => {
    dispatch(
      payDummyOrder({
        orderId: order._id,
        method: paymentMethod,
      })
    );
  };

  useEffect(() => {
    if (paymentSuccess) {
      dispatch(clearCart());
      dispatch(resetOrder());
      navigate('/my-orders');
    }
  }, [paymentSuccess, dispatch, navigate]);

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* SHIPPING */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FiMapPin /> Shipping Address
        </h2>

        {error && <p className="text-red-500 mb-3">{error}</p>}

        <div className="space-y-3">
          <input
            placeholder="Address"
            className="w-full border rounded p-2"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            placeholder="City"
            className="w-full border rounded p-2"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            placeholder="Postal Code"
            className="w-full border rounded p-2"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
          <input
            placeholder="Country"
            className="w-full border rounded p-2"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
      </div>

      {/* SUMMARY */}
      <div className="bg-white shadow rounded-lg p-6 h-fit">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FiHome /> Order Summary
        </h2>

        <div className="space-y-3 mb-6">
          {cartItems.map((item) => (
            <div key={item.product} className="flex justify-between text-sm">
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-between font-bold text-lg border-t pt-4 mb-6">
          <span>Total</span>
          <span>₹{totalPrice}</span>
        </div>

        {!success && (
          <button
            onClick={placeOrderHandler}
            disabled={loading || cartItems.length === 0}
            className="w-full bg-green-600 text-white py-3 rounded"
          >
            {loading ? 'Creating Order...' : 'Place Order'}
          </button>
        )}

        {success && order && (
          <>
            <h3 className="font-semibold mb-3">Select Payment Method</h3>

            <div className="space-y-3 mb-4">
              <button
                onClick={() => setPaymentMethod('COD')}
                className={`w-full border p-3 rounded flex items-center gap-2 ${
                  paymentMethod === 'COD' && 'border-green-500'
                }`}
              >
                <FiTruck /> Cash on Delivery
              </button>

              <button
                onClick={() => setPaymentMethod('PHONEPE')}
                className={`w-full border p-3 rounded flex items-center gap-2 ${
                  paymentMethod === 'PHONEPE' && 'border-purple-500'
                }`}
              >
                <SiPhonepe /> PhonePe (Dummy)
              </button>

              <button
                onClick={() => setPaymentMethod('GPAY')}
                className={`w-full border p-3 rounded flex items-center gap-2 ${
                  paymentMethod === 'GPAY' && 'border-blue-500'
                }`}
              >
                <SiGooglepay /> Google Pay (Dummy)
              </button>
            </div>

            <button
              onClick={payNowHandler}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded flex items-center justify-center gap-2"
            >
              <FiCreditCard />
              {loading ? 'Processing Payment...' : 'Pay Now'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Checkout;
