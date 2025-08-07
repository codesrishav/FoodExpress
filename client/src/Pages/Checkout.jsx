import { useState } from 'react';
import { useCart } from '../Contexts/CartContext';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Checkout() {
  const { cart, dispatch } = useCart();
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  // Getting user and token safely
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?.id;
  const token = localStorage.getItem('token');

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleOrder = async (e) => {
    e.preventDefault();

    if (!userId || !token) {
      toast.error('Please login to place an order.');
      navigate('/login');  // Redirect to login if not logged in
      return;
    }

    if (cart.length === 0) {
      toast.error('Your cart is empty.');
      return;
    }

    const orderData = {
      userId,
      items: cart.map(item => ({
        foodId: item._id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount,
      address,
    };

    try {
      await API.post('/orders', orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Order placed successfully!');
      dispatch({ type: 'CLEAR_CART' });
      navigate('/');
    } catch (err) {
      console.error('Order error:', err);
      const msg = err.response?.data?.message || 'Order failed';
      toast.error(msg);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <p className="mb-4 font-semibold">Total Amount: ₹{totalAmount}</p>

      <form onSubmit={handleOrder}>
        <label htmlFor="address" className="block mb-1 font-medium">Delivery Address</label>
        <textarea
          id="address"
          placeholder="Enter delivery address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded mb-6 resize-none focus:outline-blue-500"
          rows={4}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-3 rounded transition"
        >
          Place Order
        </button>
      </form>
    </div>
  );
}

export default Checkout;
