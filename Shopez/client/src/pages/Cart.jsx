import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, addToCart } from '../features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';
import { FiPlus, FiMinus, FiTrash2, FiShoppingCart } from 'react-icons/fi';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const increaseQty = (item) => {
    dispatch(addToCart({ ...item, quantity: 1 }));
  };

  const decreaseQty = (item) => {
    if (item.quantity === 1) return;
    dispatch(addToCart({ ...item, quantity: -1 }));
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  /* EMPTY CART */
  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-gray-500">
        <FiShoppingCart size={48} />
        <p className="mt-4 text-lg">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* CART ITEMS */}
      <div className="lg:col-span-2 space-y-4">
        <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>

        {cartItems.map((item) => (
          <div
            key={item.product}
            className="bg-white rounded-lg shadow p-4 flex justify-between items-center"
          >
            {/* PRODUCT INFO */}
            <div className="flex items-center gap-4">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-gray-600">₹{item.price}</p>
              </div>
            </div>

            {/* QUANTITY */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => decreaseQty(item)}
                className="p-2 border rounded hover:bg-gray-100"
              >
                <FiMinus />
              </button>
              <span className="font-medium">{item.quantity}</span>
              <button
                onClick={() => increaseQty(item)}
                className="p-2 border rounded hover:bg-gray-100"
              >
                <FiPlus />
              </button>
            </div>

            {/* REMOVE */}
            <button
              onClick={() => dispatch(removeFromCart(item.product))}
              className="text-red-500 hover:text-red-600"
            >
              <FiTrash2 />
            </button>
          </div>
        ))}
      </div>

      {/* ORDER SUMMARY */}
      <div className="bg-white rounded-lg shadow p-6 h-fit sticky top-24">
        <h3 className="text-xl font-bold mb-4">Order Summary</h3>

        <div className="flex justify-between mb-2">
          <span>Items</span>
          <span>{cartItems.reduce((a, i) => a + i.quantity, 0)}</span>
        </div>

        <div className="flex justify-between font-bold text-lg mb-6">
          <span>Total</span>
          <span>₹{totalPrice}</span>
        </div>

        <button
          onClick={() => navigate('/checkout')}
          className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
