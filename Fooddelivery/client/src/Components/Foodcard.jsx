import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; // if you're using auth
import API from '../services/api';

function FoodCard({ item }) {
  const { user } = useContext(AuthContext); // Optional: to get user info
  const handleOrder = async () => {
    try {
      const token = localStorage.getItem('token');
      const orderData = {
        foodId: item._id,
        name: item.name,
        price: item.price,
        quantity: 1,
        user: user?._id, // optional if you track user in backend
      };
      await API.post('/orders', orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Order placed successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to place order');
    }
  };
  return (
    <div className="border p-4 rounded shadow-md">
      <h3 className="text-lg font-semibold">{item.name}</h3>
      <p>{item.description}</p>
      <p className="font-bold">₹{item.price}</p>
      <button
        onClick={handleOrder}
        className="bg-blue-500 text-white mt-2 px-4 py-2 rounded"
      >
        Order Now
      </button>
    </div>
  );
}
export default FoodCard;
